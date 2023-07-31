import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FileUploadService } from 'src/app/services/file-upload.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
   public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


  public postForm: FormGroup;

  public post: Post;

  public imgSelect : String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  imagePath: string;

  public categorias: Category;

  public categorySeleccionado: Category;
  categories: Category;
  categoriaslista: Category;
  public msm_error = '';
  public categoryForm: FormGroup;

  titlePage: string;

  public postSeleccionado: Post;
  public user: User;
  uid:string;


  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia;

  
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    
    ) {
      this.user = userService.usuario;
     }

  ngOnInit(): void {
    this.getCategories();
    this.getCategoriesList();
    this.validarFormulario();
    this.validarFormularioCategoria();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getPost(id));
    window.scrollTo(0,0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
      this.uid = this.user.uid;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categorias = res;
        console.log(this.categorias)
      }
    );
  }

  getCategoriesList(): void {
    this.categoryService.getCategoriesLista().subscribe(
      res =>{
        this.categoriaslista = res;
        console.log(this.categoriaslista)
      }
    );
  }

  updateCategory(){

    const {nombre } = this.categoryForm.value;

    if(this.categorySeleccionado){
      //actualizar
      const data = {
        ...this.categoryForm.value,
        _id: this.categorySeleccionado._id
      }
      this.categoryService.updateCategory(data).subscribe(
        resp =>{
          this.getCategories();
        });

    }else{
      //crear
      this.categoryService.createCategory(this.categoryForm.value)
      .subscribe( (resp: any) =>{
        this.getCategories();
        // this.enviarNotificacion();
      })
    }

  }

  cargarCategory(_id: string){
    if (_id !== null && _id !== undefined) {
      this.categoryService.getCategory(_id).subscribe(
        res => {
          this.categoryForm.patchValue({
            id: res._id,
            nombre: res.nombre,
          });
          this.categorySeleccionado = res;
          console.log(this.categorySeleccionado);
        }
      );
    } 

  }


  validarFormularioCategoria(){
    this.categoryForm = this.fb.group({
      nombre: ['',Validators.required],
    })
  }

  getPost(_id: string){
    if (_id !== null && _id !== undefined) {
      this.titlePage = 'Editando Post';
      this.postService.getPost(_id).subscribe(
        res => {
          this.postForm.patchValue({
            id: res._id,
            name: res.name,
            price: res.price,
            description: res.description,
            adicional: res.adicional,
            slug: res.slug,
            categoria: res.categoria,
            status: res.status,
            isFeatured: res.isFeatured,
            img : res.img,
            usuario: this.user.uid,
          });
          this.post = res;
          console.log(this.post);
        }
      );
    } else {
      this.titlePage = 'Creando Post';
    }
  }

  validarFormulario(){
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      price: [''],
      description: [''],
      adicional: [''],
      slug: [''],
      isFeatured: [''],
      categoria: [''],
      // usuario: [this.usuario.uid],
    })
  }
  get name() {
    return this.postForm.get('name');
  }

  get description() {
    return this.postForm.get('description');
  }
  get slug() {
    return this.postForm.get('slug');
  }

  get categoria() {
    return this.postForm.get('categoria');
  }
  get price() {
    return this.postForm.get('price');
  }
  get isFeatured() {
    return this.postForm.get('isFeatured');
  }
  get adicional() {
    return this.postForm.get('adicional');
  }
  get usuario() {
    return this.postForm.get('usuario');
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'blogs', this.post._id)
    .then(img => { this.post.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }




  editPost(){

    const formData = new FormData();
    formData.append('name', this.postForm.get('name').value);
    formData.append('price', this.postForm.get('price').value);
    formData.append('description', this.postForm.get('description').value);
    formData.append('slug', this.postForm.get('slug').value);
    formData.append('categoria', this.postForm.get('categoria').value);
    formData.append('isFeatured', this.postForm.get('isFeatured').value);
    formData.append('adicional', this.postForm.get('adicional').value);
    // formData.append('usuario', this.postForm.get('usuario').value);


    if(this.post){
      //actualizar
      const data = {
        ...this.postForm.value,
        _id: this.post._id,
        // usuario: this.user.uid
      }

      this.postService.updatePost(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/posts`);
        });

    }else{
      //crear
    const data = {
      ...this.postForm.value,
      // user_id: this.user.uid
    }
      this.postService.createPost(data).subscribe(
        (resp: any) =>{
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/posts`);
      })
    }
    return false;
  }

  public mostrarEditorCategorias(){
    var listacategoria = document.getElementsByClassName("crearcategoria");
    for (var i = 0; i<listacategoria.length; i++) {
      listacategoria[i].classList.toggle("mostrar");
      //console.log('pulsado', menuLateral);

    }
}



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



  //ckeditor

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }



  




}
