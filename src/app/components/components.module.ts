import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgxPayPalModule } from 'ngx-paypal';
// import { ChartComponent } from './chart/chart.component';
// import { NgChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

import { PagosRecientesComponent } from './pagos-recientes/pagos-recientes.component';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import { ReciboFacturaComponent } from './recibo-factura/recibo-factura.component';
import { PlanesyproductosComponent } from './planesyproductos/planesyproductos.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {PipesModule} from '../pipes/pipes.module';
import { EditoresComponent } from './editores/editores.component';
import { ModalCondicionesComponent } from './modal-condiciones/modal-condiciones.component';
import { SubscripcionesRecientesComponent } from './subscripciones-recientes/subscripciones-recientes.component';

@NgModule({
  declarations: [
    PagosRecientesComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    ProductItemComponent,
    UsuariosRecientesComponent,
    EditoresComponent,
    ModalCondicionesComponent,
    SubscripcionesRecientesComponent,
  ],
  exports: [
    PagosRecientesComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    ProductItemComponent,
    UsuariosRecientesComponent,
    EditoresComponent,
    ModalCondicionesComponent,
    SubscripcionesRecientesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    // NgxPayPalModule,
    NgxPaginationModule,
  ]
})
export class ComponentsModule { }
