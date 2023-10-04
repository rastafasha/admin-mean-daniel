import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';
//paypal
// import { NgxPayPalModule } from 'ngx-paypal';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxSpinnerModule } from "ngx-spinner";

import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

// angular file uploader
// import { AngularFileUploaderModule } from 'angular-file-uploader';
//Qr
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { EditorEditComponent } from './editor/editor-edit/editor-edit.component';
import { BannerEditComponent } from './banner/banner-edit/banner-edit.component';
import { BannerIndexComponent } from './banner/banner-index/banner-index.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PaypalsubcriptionModule } from './paypalsubcription/paypalsubcription.module';
// import { CursosModule } from './cursos/cursos.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PublicidadModule } from './publicidad/publicidad.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    EditorEditComponent,
    BannerEditComponent,
    BannerIndexComponent,
    BusquedaComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    ProfileComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    UserProfileComponent,
    PostIndexComponent,
    PostEditComponent,
    EditorEditComponent,
    BannerEditComponent,
    BannerIndexComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    PaypalsubcriptionModule,
    PublicidadModule,
    // CursosModule,
    NgxPaginationModule,
    CKEditorModule,
    // AngularFileUploaderModule,

  ],
  providers: [
  ],
})
export class PagesModule { }
