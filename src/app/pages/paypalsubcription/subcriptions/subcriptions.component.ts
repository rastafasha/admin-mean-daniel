import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpBackend } from '@angular/common/http';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { BusquedasService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-subcriptions',
  templateUrl: './subcriptions.component.html',
  styleUrls: ['./subcriptions.component.css']
})
export class SubcriptionsComponent implements OnInit {

  title = "Paypal | Subcripciones"

  subcriptionPaypals: planPaypalSubcription;
  subcriptions: any ;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;
  query:string ='';

  constructor(
    private location: Location,
    private planPaypalSubcriptionService: PlanPaypalSubcriptionService,
    private busquedasService: BusquedasService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planPaypalSubcriptionService.getSubcriptions().subscribe(
      res =>{
        this.subcriptions = res;
        error => this.error = error
        // console.log(this.subcriptionPaypals);
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search() {// funciona, devuelve la busqueda

    if(!this.query){
      this.ngOnInit();
    }else{
      return this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.subcriptions = resp.subcriptions;
          
        }
      )
    }
    
        
  }

}
