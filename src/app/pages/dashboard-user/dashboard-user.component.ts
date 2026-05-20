import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-dashboard-user',
    templateUrl: './dashboard-user.component.html',
    styleUrls: ['./dashboard-user.component.css'],
    standalone: false
})
export class DashboardUserComponent implements OnInit {
  title = 'Admin Usuario';
  public user: any;
    error: string;
    uid:string;
  
    constructor(
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
