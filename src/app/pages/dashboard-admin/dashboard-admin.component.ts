import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.css'],
    standalone: false
})
export class DashboardAdminComponent implements OnInit {
  title = 'Panel Administrativo';
  public user: any;
  error: string;
  uid:string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.user = this.authService.getLocalStorage();
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.authService.closeMenu();
    this.uid = this.user.uid;
  }

  

}
