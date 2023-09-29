import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-paypalhome',
  templateUrl: './paypalhome.component.html',
  styleUrls: ['./paypalhome.component.css']
})
export class PaypalhomeComponent implements OnInit {

  title = "Paypal :: Planes - Subcripciones";
  error: string;

  user: User;

  constructor(
    private location: Location,
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


  ngDoCheck(): void {
    this.user = this.userService.usuario;
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
