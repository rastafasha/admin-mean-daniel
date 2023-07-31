import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import { CartItemModel } from 'src/app/models/cart-item-model';
import { Payment } from 'src/app/models/payment'
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';

import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';

import { environment } from 'src/environments/environment';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit {

  public PaymentRegisterForm: FormGroup;

  title= 'Realizar un Pago';


  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  Item: any[] = [];
  total= 0;

  public usuario;
  visible :boolean = false;

  error: string;
  pagoSeleccionado: Payment;
  pago: Payment;
  plan: Plan;

  public imgSelect : String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  imagePath: string;




  paymentSeleccionado:Payment;

  user:User;
  planes: Plan;

  public storage = environment.apiUrlMedia;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private planesService: PlanesService,
    private fileUploadService: FileUploadService
  ) {
    this.user = this.usuarioService.usuario;
  }


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.visible= false;
    this.getPlanes();
    this.getUser();
    this.closeCart();
    this.validarFormulario();
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.total = this.getTotal();

  }

  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }


  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }



  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  validarFormulario(){
    this.PaymentRegisterForm = this.fb.group({

      metodo: ['',Validators.required],
      monto: ['',Validators.required],
      referencia: [''],
      plan: ['64a86d39a899ad7ada87670d'],
      usuario: [this.usuario.ui],
    })
  }

  get metodo() {
    return this.PaymentRegisterForm.get('metodo');
  }
  get monto() {
    return this.PaymentRegisterForm.get('monto');
  }
  get referencia() {
    return this.PaymentRegisterForm.get('referencia');
  }


  updateForm(){

    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('plan', this.PaymentRegisterForm.get('plan').value);


    //crear
    const data = {
      ...this.PaymentRegisterForm.value,
      usuario: this.usuario.uid
    }
    this.paymentService.create(data)
    .subscribe( (resp: any) =>{
      Swal.fire('Gracias', 'Hemos recibido su pago, espere la verificación', 'success');
      this.router.navigateByUrl(`/dashboard/historial-pagos`);
      this.pagoSeleccionado = resp;
      this.emptyCart();
    })

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
    .actualizarFoto(this.imagenSubir, 'pagos', this.pago._id)
    .then(img => { this.pago.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }


  closeCart(){
    var cartNotification = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<cartNotification.length; i++) {
        cartNotification[i].classList.remove("cart-modal--active");

      }
  }



  verpaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.toggle("vibiblepaypblok");

      }
  }
  hidepaypal(){
    var verPaypalpay = document.getElementsByClassName("vibiblepayp");
      for (var i = 0; i<verPaypalpay.length; i++) {
        verPaypalpay[i].classList.remove("vibiblepaypblok");

      }
  }



  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }


}
