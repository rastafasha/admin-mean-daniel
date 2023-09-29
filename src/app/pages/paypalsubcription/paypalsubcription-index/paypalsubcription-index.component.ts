import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypalsubcription-index',
  templateUrl: './paypalsubcription-index.component.html',
  styleUrls: ['./paypalsubcription-index.component.css']
})
export class PaypalsubcriptionIndexComponent implements OnInit {

  title = "Paypal | Planes"
  plans: planPaypalSubcription;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  data:any

  constructor(
    private location: Location,
    private planpaypalService: PlanPaypalSubcriptionService,
    private router: Router,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planpaypalService.getplanPaypalsPage2().subscribe(
      res =>{
        this.plans = res;
        error => this.error = error
        // console.log(this.plans);
        // console.log(this.plans.plans);
      }
    );
  }

  

  desactivar(id){
    this.planpaypalService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getPlanes();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.planpaypalService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getPlanes();
      },
      error=>{
        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  irA(){
    this.router.navigateByUrl('/dashboard/subcription/crear')
  }

}
