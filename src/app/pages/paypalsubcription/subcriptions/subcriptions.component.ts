import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { BusquedasService } from 'src/app/services/busqueda.service';

@Component({
    selector: 'app-subcriptions',
    templateUrl: './subcriptions.component.html',
    styleUrls: ['./subcriptions.component.css'],
    standalone: false
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
    private planPaypalSubcriptionService: PlanPaypalSubcriptionService,
    private busquedasService: BusquedasService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getSubcriptions();
    window.scrollTo(0,0);
  }

  getSubcriptions(): void {
    this.loading = true;
    this.planPaypalSubcriptionService.getSubcriptions().subscribe(
      res =>{
        this.subcriptions = res;
        error => this.error = error;
        this.loading = false;
      }
    );
  }
  PageSize() {
    this.getSubcriptions();
  }

  search(): void {
    if(!this.query){
      this.ngOnInit();
    }else{
      this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.subcriptions = resp.subcriptions;
          
        }
      )
    }    
  }

}
