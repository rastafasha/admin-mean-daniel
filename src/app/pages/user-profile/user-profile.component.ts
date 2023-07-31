import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  title = "Detalles de la cuenta";
  usuario: User;
  profile: Profile;
  error: string;

  public pagos: Payment[] =[];
  userPagos: Payment;
  uid:string;

  rolesSelected:number;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,

  ) {
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserPagos(id));
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }


  getUserRemoto(uid:string){
    this.userService.getUserById(uid).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
        this.getProfile();
        this.getPagos();
        // this.getUserPagos();
      }
    );

  }

  getProfile(){
    this.profileService.getByUser(this.usuario.uid).subscribe(
      res =>{
        this.profile = res[0];
        error => this.error = error;
        console.log(this.profile);
      }
    );
  }

  getPagos(){
    this.paymentService.getPagosbyUser(this.usuario.uid).subscribe(
      res =>{
        this.pagos = res;
        error => this.error = error;
        console.log(this.pagos);
      }
    );
  }


  // getUserPagos(){

  //   this.paymentService.getPagosbyUser('64c512f064ea4d83f702d13d').subscribe((data: any) => {
  //     this.userPagos = data[0];
  //     console.log('userPagos',this.userPagos)
  //   });
  // }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  updateUser(userprofile: Profile){
    this.profileService.updateProfile(userprofile ).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');

      }
    )
  }





}
