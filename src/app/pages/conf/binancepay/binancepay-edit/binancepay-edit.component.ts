import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Binancepay } from 'src/app/models/binancepay';
import { BinancepayService } from 'src/app/services/binancepay.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-binancepay-edit',
  templateUrl: './binancepay-edit.component.html',
  styleUrls: ['./binancepay-edit.component.css']
})
export class BinancepayEditComponent implements OnInit {

  public binancepayForm: FormGroup;

   public binancepay: Binancepay;

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
     private binancepayService: BinancepayService,
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
       this.titlePage = 'Editando Binancepay';
       this.binancepayService.getBinancepay(_id).subscribe(
         res => {
           this.binancepayForm.patchValue({
             id: res._id,
             monto: res.monto,
             img : res.img,
           });
           this.binancepay = res;
           console.log(this.binancepay);
         }
       );
     } else {
       this.titlePage = 'Creando Binancepay';
     }
   }

   validarFormulario(){
     this.binancepayForm = this.fb.group({
      monto: ['', Validators.required],
       description: [''],
       target: ['', Validators.required],
       gotBoton: ['', Validators.required],
       status: ['Desactivado'],
       url: [''],
     })
   }
   get monto() {
     return this.binancepayForm.get('monto');
   }

   get status() {
     return this.binancepayForm.get('status');
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
    .actualizarFoto(this.imagenSubir, 'binancepays', this.binancepay._id)
    .then(img => { this.binancepay.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }





  editBinancepay(){

     const formData = new FormData();
     formData.append('monto', this.binancepayForm.get('titulo').value);
     formData.append('status', this.binancepayForm.get('target').value);


     if(this.binancepay){
       //actualizar
       const data = {
         ...this.binancepayForm.value,
         _id: this.binancepay._id
       }

       this.binancepayService.updateBinancepay(data).subscribe(
         resp =>{
           Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
           this.router.navigateByUrl(`/dashboard/binancepay`);
         });

     }else{
       //crear
     const data = {
       ...this.binancepayForm.value
     }
       this.binancepayService.createBinancepay(data).subscribe(
         (resp: any) =>{
         Swal.fire('Creado', ` creado correctamente`, 'success');
         this.router.navigateByUrl(`/dashboard/binancepay`);
       });
     }
     return false;
   }


goBack() {
  this.location.back(); // <-- go back to previous location on cancel
}




   
}
