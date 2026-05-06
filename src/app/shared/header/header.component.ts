import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [],
    standalone: false
})
export class HeaderComponent implements OnInit {

  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado


  userprofile!: any;


  user: User;
  error: string;
  id:any;
  profile: Profile;

  constructor(
    private usuarioService: UserService,
    private router: Router,
    private profileService: ProfileService,
    ) {
      this.user = usuarioService.usuario;
    }



  ngOnInit() {
    this.getUser();
     if (localStorage.getItem('dark')) {
      this.darkmode('dark');
    }
  }



  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
    if(!this.user || !this.user.uid || this.user.uid == null || this.user.uid == undefined){
      this.router.navigateByUrl('/login');
    }
      this.id = this.user.uid;
    //verifica que se hallan logueado
    if(!this.user || !this.user.uid){
      this.router.navigateByUrl('/login');
    }

    this.listar()
  }

  getUserServer(){
    this.usuarioService.getUserById(this.user.uid).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
      }
    );

  }

  listar(){
    this.profileService.listarUsuario(this.user.uid).subscribe(
      response =>{
        this.profile = response;
        // console.log('profileServer',this.profile);
      }
    );
    
  }

  openModal(){
    var modalcart = document.getElementsByClassName("dropdown-menu");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");
      }
  }


  openMenu(){
    var menuLateral = document.getElementsByClassName("mini-sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("show-sidebar");
      }
  }

  logout(){
    this.usuarioService.logout();
  }

  darkmode(dark:string){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
      for (var i = 0; i<dayNight.length; i++) {
        dayNight[i].classList.toggle("active");
        body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('dark');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }





}
