import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-lateral-edit',
  templateUrl: './lateral-edit.component.html',
  styleUrls: ['./lateral-edit.component.css']
})
export class LateralEditComponent implements OnInit {

   public sideadviceForm: FormGroup;

   public sideadvice: Sideadvice;

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
     private sideadviceService: SideadviceService,
     private location: Location,
     private activatedRoute: ActivatedRoute,
     private userService: UserService,
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
       this.titlePage = 'Editando Publicidad Lateral';
       this.sideadviceService.getBanner(_id).subscribe(
         res => {
           this.sideadviceForm.patchValue({
             id: res._id,
             titulo: res.titulo,
             target: res.target,
             url: res.url,
             img : res.img,
           });
           this.sideadvice = res;
          //  console.log(this.sideadvice);
         }
       );
     } else {
       this.titlePage = 'Creando Publicidad Lateral';
     }
   }

   validarFormulario(){
     this.sideadviceForm = this.fb.group({
       titulo: ['', Validators.required],
       target: ['', Validators.required],
       url: [''],
     })
   }
   get titulo() {
     return this.sideadviceForm.get('titulo');
   }

   get target() {
    return this.sideadviceForm.get('target');
  }
   get url() {
     return this.sideadviceForm.get('url');
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
    .actualizarFoto(this.imagenSubir, 'sideadvertisings', this.sideadvice._id)
    .then(img => { this.sideadvice.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

   editCurso(){

     const formData = new FormData();
     formData.append('titulo', this.sideadviceForm.get('titulo').value);
     formData.append('target', this.sideadviceForm.get('target').value);
     formData.append('url', this.sideadviceForm.get('url').value);


     if(this.sideadvice){
       //actualizar
       const data = {
         ...this.sideadviceForm.value,
         _id: this.sideadvice._id
       }

       this.sideadviceService.updateBanner(data).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/publicidad-lateral`);
         });

     }else{
       //crear
     const data = {
       ...this.sideadviceForm.value
     }
       this.sideadviceService.createBanner(data).subscribe(
         (resp: any) =>{
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/publicidad-lateral`);
       });
     }
     return false;
   }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
