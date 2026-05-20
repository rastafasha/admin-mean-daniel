import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


// import * as $ from 'jquery';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styles: [],
    standalone: false
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  public user: any;

  error: string;
  id: any;
  roleid:number;

  constructor(
    private authService: AuthService,
  ) {
    
   }

  ngOnInit(): void {
    this.user = this.authService.getLocalStorage();
  }


  toggleNav(){
    this.sidenav.toggle();
  }

  

  logout(): void {
    this.authService.logout();
  }

}
