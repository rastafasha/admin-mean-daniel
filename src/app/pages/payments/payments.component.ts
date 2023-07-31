import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { BusquedasService } from 'src/app/services/busqueda.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {


  title = "Pagos"

  pagos: Payment;
  error:string;
  p: number = 1;
  count: number = 8;

  public user;

  query:string ='';


  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient,
    private busquedasService: BusquedasService,
  ) {
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.closeMenu();
    this.getPagos();
    window.scrollTo(0,0);
    // this.getPagos_list();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }



  getPagos(): void {
    this.paymentService.getAll().subscribe(
      res =>{
        this.pagos = res;
        error => this.error = error;
        console.log(this.pagos);
      }
    );
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search() {
    if(!this.query){
      this.ngOnInit();
    }else{
      return this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.pagos = resp.pagos;
          
        }
      )
    }
  }




}
