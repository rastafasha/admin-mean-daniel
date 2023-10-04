import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalsubcriptionEditComponent } from './paypalsubcription-edit/paypalsubcription-edit.component';
import { PaypalsubcriptionIndexComponent } from './paypalsubcription-index/paypalsubcription-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SubcriptionsComponent } from './subcriptions/subcriptions.component';
import { SubcriptionComponent } from './subcription/subcription.component';
import { PaypalhomeComponent } from './paypalhome/paypalhome.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    PaypalsubcriptionEditComponent,
    PaypalsubcriptionIndexComponent,
    SubcriptionsComponent,
    SubcriptionComponent,
    PaypalhomeComponent
  ],
  exports: [
    PaypalsubcriptionEditComponent,
    PaypalsubcriptionIndexComponent,
    SubcriptionsComponent,
    SubcriptionComponent,
    PaypalhomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    NgxPaginationModule,
  ]
})
export class PaypalsubcriptionModule { }
