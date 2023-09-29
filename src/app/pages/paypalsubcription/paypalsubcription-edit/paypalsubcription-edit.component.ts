import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { planPaypalSubcription, productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';



@Component({
  selector: 'app-paypalsubcription-edit',
  templateUrl: './paypalsubcription-edit.component.html',
  styleUrls: ['./paypalsubcription-edit.component.css']
})
export class PaypalsubcriptionEditComponent implements OnInit {
  
  public planpaypalForm: FormGroup;
  public productopaypalForm: FormGroup;

  public planpaypalSeleccionado: planPaypalSubcription;
  public productpaypalSeleccionado: planPaypalSubcription;
  
  title: string;
  error: string;
  
  titlePage: string;
  
  plans: planPaypalSubcription;
  productPaypal: productPaypalSubcription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planpaypalService: PlanPaypalSubcriptionService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.validarFormulario();
    this.validarFormularioProducto();
    this.getProductos();
    this.getPlanes();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }

  getProductos(): void {
    this.planpaypalService.getProductPaypalsPage4().subscribe(
      res =>{
        this.productPaypal = res.products;
        error => this.error = error
        console.log(this.productPaypal);
        // console.log(this.productPaypal.products);
      }
    );
  }

  getPlanes(): void {
    this.planpaypalService.getPlanPaypals().subscribe(
      res =>{
        this.plans = res.plans;
        error => this.error = error
        console.log(this.plans);
      }
    );
  }

  get nameproduct() {
    return this.productopaypalForm.get('name');
  }

  updateProduct(){

    const {name, description, type, image_url,
    category } = this.productopaypalForm.value;

    if(this.productpaypalSeleccionado){
      //actualizar
      const data = {
        ...this.productopaypalForm.value,
        id: this.productpaypalSeleccionado.id
      }
      this.planpaypalService.updateProduct(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.ngOnInit();
          console.log('actualizado',resp);
        });

    }else{
      //crear
      this.planpaypalService.createProducSubcription(this.productopaypalForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        this.ngOnInit();
        console.log('creado',resp);
        // this.enviarNotificacion();
      })

      
    }

  }

  validarFormularioProducto(){
    this.productopaypalForm = this.fb.group({
      // id: [''],
      name: ['',Validators.required],
      description: ['',Validators.required],
      type: [''],
      image_url: [''],
      category: [''],
    })
  }



  getplan(id){
    if (id !== null && id !== undefined) {
      this.title = 'Editando plan';
      this.planpaypalService.getPlanPaypal(id).subscribe(
        res => {
          this.planpaypalForm.patchValue({
            id: res.id,
            name: res.name,
            product_id: res.product_id,
            status: res.status,
            frequency: res.frequency,
            total_cycles: res.total_cycles,
            setup_fee: res.setup_fee,
            percentage: res.percentage,
            fixed_price: res.percentage,
          });
          this.planpaypalSeleccionado = res;
          console.log('planpaypalSeleccionado', this.planpaypalSeleccionado);
          console.log('frequency', this.planpaypalSeleccionado.billing_cycles[0].frequency.interval_unit);
        }
      );
    } else {
      this.title = 'Creando plan';
    }
  }

  validarFormulario(){
    this.planpaypalForm = this.fb.group({
      // id: [''],
      name: ['',Validators.required],
      product_id: ['',Validators.required],
      // product_id: ['PROD-7SR251647K824974D',Validators.required],
      status: [''],
      total_cycles: [12],
      fixed_price: [3],
      setup_fee: [10],
      percentage: [10],
      interval_unit: ['MONTH'],
    })
  }

  get name() {
    return this.planpaypalForm.get('name');
  }
  get product_id() {
    return this.planpaypalForm.get('product_id');
  }
  get status() {
    return this.planpaypalForm.get('status');
  }
  get interval_unit() {
    return this.planpaypalForm.get('interval_unit');
  }
  get total_cycles() {
    return this.planpaypalForm.get('total_cycles');
  }
  get setup_fee() {
    return this.planpaypalForm.get('setup_fee');
  }
  get percentage() {
    return this.planpaypalForm.get('percentage');
  }
  get fixed_price() {
    return this.planpaypalForm.get('fixed_price');
  }

  editPlan(){debugger

    
    const {name, product_id, status, interval_unit,
      total_cycles, setup_fee, percentage, fixed_price  } = this.planpaypalForm.value;
  
      if(this.planpaypalSeleccionado){
        //actualizar
        const data = {
          ...this.planpaypalForm.value,
          id: this.planpaypalSeleccionado.id
        }
        this.planpaypalService.updatePlan(data).subscribe(
          resp =>{
            Swal.fire('Actualizado', `actualizado correctamente`, 'success');
            this.ngOnInit();
            // console.log('actualizado',resp);
          });
  
      }else{
        //crear
        const data = {
          ...this.planpaypalForm.value,
        }
        this.planpaypalService.createPlanSubcription(data)
        .subscribe( (resp: any) =>{
          // Swal.fire('Creado', `creado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/paypal-subcription`);
          console.log('creadoPaypal',resp);
        })

        this.planpaypalService.createPlan(data)
        .subscribe( (resp: any) =>{
          Swal.fire('Creado', `creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/paypal-subcription`);
          // this.ngOnInit();
          console.log('creadoApp',resp);
          // this.enviarNotificacion();
        })
      }

    return false;
  }




  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


// how edit an object into an array?  
}

