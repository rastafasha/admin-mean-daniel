import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-historialpagos',
  templateUrl: './user-historialpagos.component.html',
  styleUrls: ['./user-historialpagos.component.css'],
  standalone: false
})
export class UserHistorialpagosComponent implements OnInit {
  title = "Historial Mis Compras";
  userProfile!: User;
  userPagos!: Payment;
  user: any;
  uid: string;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private pagoService: PaymentService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
    this.user = this.authService.getLocalStorage();
    this.uid = this.user.uid;
    this.getUserProfile();
    this.getUserPagos();
  }

  getUserProfile() {
    this.userService.getUserById(this.uid).subscribe((data: any) => {
      this.userProfile = data;
    });
  }


  getUserPagos() {
    this.pagoService.getPagosbyUser(this.uid).subscribe((data: any) => {
      this.userPagos = data;
    });
  }


}
