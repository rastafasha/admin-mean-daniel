import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { planPaypalSubcription, productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { environment } from 'src/environments/environment';
const urlFront = environment.urlFrontPage;
const urlImage = environment.imageURLProductsub;
@Component({
  selector: 'app-paypalsubcription-edit',
  templateUrl: './paypalsubcription-edit.component.html',
  styleUrls: ['./paypalsubcription-edit.component.css'],
  standalone: false
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
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getplan(id));
    this.getProductos();
  }

  getProductos(): void {
    this.planpaypalService.getProductPaypalsPage().subscribe(
      res => {
        this.productPaypal = res.productPaypal.products;
        error => this.error = error;
      }
    );
  }

  getPlanes(): void {
    this.planpaypalService.getPlanPaypals().subscribe(
      res => {
        this.plans = res.plans;
        error => this.error = error
      }
    );
  }

 
  getplan(id) {
    if (id !== null && id !== undefined) {
      this.title = 'Editando plan';
      this.planpaypalService.getPlanPaypal(id).subscribe(
        (res: any) => {
          this.planpaypalSeleccionado = res;
          // Extraemos los valores de la estructura de PayPal
          const ciclyData = res.billing_cycles ? res.billing_cycles[0] : null;

          this.planpaypalForm.patchValue({
            id: res.id,
            name: res.name,
            product_id: res.product_id,
            status: res.status,
            // Accedemos a la profundidad del objeto de PayPal
            frequency: res.frequency,
            percentage: res.percentage,
            total_cycles: ciclyData ? ciclyData.total_cycles : 0,
            fixed_price: ciclyData ? ciclyData.pricing_scheme.fixed_price.value : 0,
            setup_fee: res.payment_preferences?.setup_fee?.value || 0,
            interval_unit: ciclyData ? ciclyData.frequency.interval_unit : 'MONTH'
          });
        }
      );
    } else {
      this.title = 'Creando plan';
    }
    this.validarFormulario();
  }

  validarFormulario() {
    this.planpaypalForm = this.fb.group({
      name: ['', Validators.required],
      product_id: ['', Validators.required],
      status: ['ACTIVE'],
      total_cycles: [0], // 0 = Cobros recurrentes sin fin
      fixed_price: [10.00, [Validators.required, Validators.min(1)]],
      setup_fee: [0],
      interval_unit: ['MONTH'],
    });
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

  updateProduct() {

    if(!this.productopaypalForm.valid){
      //mostramos las alertas de los campos requeridos
      this.productopaypalForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }

    const { name, description, type, image_url,
      category } = this.productopaypalForm.value;

    if (this.productpaypalSeleccionado) {
      //actualizar
      const data = {
        ...this.productopaypalForm.value,
        id: this.productpaypalSeleccionado.id
      }
      this.planpaypalService.updateProduct(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.ngOnInit();
          console.log('actualizado', resp);
        });

    } else {
      //crear
      const productData = {
        name: this.productopaypalForm.value.name,
        description: this.productopaypalForm.value.description,
        type: this.productopaypalForm.value.type, // O SERVICE/PHYSICAL según tu caso
        category: this.productopaypalForm.value.category, // PayPal tiene categorías específicas, SOFTWARE es común
        image_url: urlImage,
        home_url: urlFront // Opcional pero recomendado
      };

      this.planpaypalService.createProducSubcription(productData).subscribe((resp: any) => {
        const newProductId = resp.id; // Este es el ID que usarás en el formulario del PLAN
        Swal.fire('Producto Creado', `ID: ${newProductId}`, 'success');

        // Opcional: setear automáticamente el product_id en el otro formulario
        this.planpaypalForm.patchValue({ product_id: newProductId });
      });


    }

  }

  editPlan() {

    if(!this.planpaypalForm.valid){
      //mostramos las alertas de los campos requeridos
      this.planpaypalForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }


    const { name, product_id, status, interval_unit,
      total_cycles, setup_fee, percentage, fixed_price } = this.planpaypalForm.value;

    if (this.planpaypalSeleccionado) {
      //actualizar
      const data = {
        ...this.planpaypalForm.value,
        id: this.planpaypalSeleccionado.id
      }
      this.planpaypalService.updatePlan(data).subscribe(
        resp => {
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.ngOnInit();
          // console.log('actualizado',resp);
        });

    } else {
      //crear

      // 1. CREAMOS EL CUERPO CON LA ESTRUCTURA QUE PAYPAL EXIGE
      const bodyPayPal = {
        product_id: product_id,
        name: name,
        billing_cycles: [
          {
            frequency: {
              interval_unit: interval_unit,
              interval_count: 1
            },
            tenure_type: "REGULAR",
            sequence: 1,
            // Si el usuario pone 0, PayPal lo entiende como cobros infinitos
            total_cycles: total_cycles,
            pricing_scheme: {
              fixed_price: {
                // .toFixed(2) asegura que 10 se convierta en "10.00"
                value: parseFloat(fixed_price).toFixed(2).toString(),
                currency_code: "USD"
              }
            }
          }
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee: {
            value: parseFloat(setup_fee).toFixed(2).toString(),
            currency_code: "USD"
          },
          payment_failure_threshold: 3
        }
      }

      this.planpaypalService.createPlanSubcription(bodyPayPal)
        .subscribe((resp: any) => {
          // Swal.fire('Creado', `creado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/paypal-subcription`);
          console.log('creadoPaypal', resp);
        })

      this.planpaypalService.createPlan(this.planpaypalForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/paypal-plans`);
          // this.ngOnInit();
          console.log('creadoApp', resp);
          // this.enviarNotificacion();
        })
    }

  }

}

