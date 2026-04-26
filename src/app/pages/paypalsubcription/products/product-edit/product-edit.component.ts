import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { planPaypalSubcription, productPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const urlFront = environment.urlFrontPage;
const urlImage = environment.imageURLProductsub;
@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  public productopaypalForm: FormGroup;

  public productpaypalSeleccionado: planPaypalSubcription;

  title: string;
  error: string;

  titlePage: string;
  tipoSeleccionado:any|null
  productPaypal: productPaypalSubcription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planpaypalService: PlanPaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getProduct(id));
    this.validarFormularioProducto();
  }


   getProduct(id) {
    if (id !== null && id !== undefined) {
      this.title = 'Editando Product';
      this.planpaypalService.getProductPaypal(id).subscribe(
        (res: any) => {
          this.productpaypalSeleccionado = res;
          // Extraemos los valores de la estructura de PayPal
          const ciclyData = res.billing_cycles ? res.billing_cycles[0] : null;

          this.productopaypalForm.patchValue({
            id: res.id,
            name: res.name,
            description: res.description,
            type: res.type,
            category: res.category,
          });
        }
      );
    } else {
      this.title = 'Creando Product';
    }
    this.validarFormularioProducto();
  }




  validarFormularioProducto() {
    this.productopaypalForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      image_url: [''],
    })
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

      });


    }

  }
}

