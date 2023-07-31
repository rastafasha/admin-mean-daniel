import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  title = 'Panel Administrativo';
  public user: User;
  public userprofile: User;

  error: string;
  uid:string;

  categorias: Category;
  usuarios: User;
  blogs: Post;
  pagos: Payment;
  query:string ='';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));


  }

  getUserProfile(id:string){
    id  = this.user.uid
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
      }
    );
  }

  

}
