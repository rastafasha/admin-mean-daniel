import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Sideadvice } from 'src/app/models/sideadvice';
import { SideadviceService } from 'src/app/services/sideadvice.service';

@Component({
  selector: 'app-lateral-index',
  templateUrl: './lateral-index.component.html',
  styleUrls: ['./lateral-index.component.css']
})
export class LateralIndexComponent implements OnInit {

  title = "Publicidad lateral"
  sideadvices: Sideadvice;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private sideadviceService: SideadviceService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.sideadviceService.getBanners().subscribe(
      res =>{
        this.sideadvices = res;
        error => this.error = error
        // console.log(this.cursos);
      }
    );
  }

  eliminarCurso(sideadvice:Sideadvice){

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sideadviceService.deleteBanner(sideadvice).subscribe(
          response =>{
            this.getCursos();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }

  desactivar(id){
    this.sideadviceService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getCursos();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el archivo, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.sideadviceService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getCursos();
      },
      error=>{
        this.msm_error = 'No se pudo activar el archivo, vuelva a intenter.'
      }
    )
  }




  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
