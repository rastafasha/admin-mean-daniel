import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-publicidad',
    templateUrl: './publicidad.component.html',
    styleUrls: ['./publicidad.component.css'],
    standalone: false
})
export class PublicidadComponent implements OnInit {

  title = "Publicidad";
  error: string;

  user: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.closeMenu();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

}
