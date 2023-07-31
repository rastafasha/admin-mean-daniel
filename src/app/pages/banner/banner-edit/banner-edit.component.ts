import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const baseUrl = environment.apiUrl;

//ckeditor
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {


   /**
   * Editor type area wyswyg
   */
   public Editor = DecoupledEditor;
   public editorData = `<p>This is a CKEditor 5 WYSIWYG editor instance created with Angular.</p>`;


   public bannerForm: FormGroup;

   public banner: Banner;

   public imgSelect : String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  imagePath: string;

   titlePage: string;

   public user: User;
   uid:string;

   error: string;
   uploadError: string;
   public storage = environment.apiUrlMedia


   constructor(
     private fb: FormBuilder,
     private router: Router,
     private bannerService: BannerService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private userService: UserService,
     private sanitizer: DomSanitizer,
     private fileUploadService: FileUploadService,
     ) {
       this.user = this.userService.usuario;
      }

   ngOnInit(): void {
     this.validarFormulario();
     this.getUser();
     this.activatedRoute.params.subscribe( ({id}) => this.getBanner(id));
     window.scrollTo(0,0);
   }

   getUser(): void {

     this.user = JSON.parse(localStorage.getItem('user'));
       this.uid = this.user.uid;
   }

   getBanner(_id: string){
     if (_id !== null && _id !== undefined) {
       this.titlePage = 'Editando Banner';
       this.bannerService.getBanner(_id).subscribe(
         res => {
           this.bannerForm.patchValue({
             id: res._id,
             titulo: res.titulo,
             target: res.target,
             gotBoton: res.gotBoton,
             botonName: res.botonName,
             url: res.url,
             img : res.img,
             description: res.description,
           });
           this.banner = res;
           console.log(this.banner);
         }
       );
     } else {
       this.titlePage = 'Creando Banner';
     }
   }

   validarFormulario(){
     this.bannerForm = this.fb.group({
       titulo: ['', Validators.required],
       description: [''],
       target: ['', Validators.required],
       gotBoton: ['', Validators.required],
       botonName: [''],
       url: [''],
     })
   }
   get titulo() {
     return this.bannerForm.get('titulo');
   }

   get description() {
     return this.bannerForm.get('description');
   }
   get target() {
    return this.bannerForm.get('target');
  }
   get gotBoton() {
     return this.bannerForm.get('gotBoton');
   }

   get botonName() {
     return this.bannerForm.get('botonName');
   }
   get url() {
     return this.bannerForm.get('url');
   }

  //  get img() {
  //    return this.bannerForm.get('img');
  //  }


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
    .actualizarFoto(this.imagenSubir, 'banners', this.banner._id)
    .then(img => { this.banner.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }





   editCurso(){

     const formData = new FormData();
     formData.append('titulo', this.bannerForm.get('titulo').value);
     formData.append('target', this.bannerForm.get('target').value);
     formData.append('gotBoton', this.bannerForm.get('gotBoton').value);
     formData.append('botonName', this.bannerForm.get('botonName').value);
     formData.append('description', this.bannerForm.get('description').value);
     formData.append('url', this.bannerForm.get('url').value);


     if(this.banner){
       //actualizar
       const data = {
         ...this.bannerForm.value,
         _id: this.banner._id
       }

       this.bannerService.updateBanner(data).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/banners`);
         });

     }else{
       //crear
     const data = {
       ...this.bannerForm.value
     }
       this.bannerService.createBanner(data).subscribe(
         (resp: any) =>{
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/banners`);
       });
     }
     return false;
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
