import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planes-page',
  templateUrl: './planes-page.component.html',
  styleUrls: ['./planes-page.component.css']
})
export class PlanesPageComponent implements OnInit {

  plan: Plan;
  planes: Plan;
  error:string;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private planesService: PlanesService,
    private location: Location,

    ) { }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
  }


  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
