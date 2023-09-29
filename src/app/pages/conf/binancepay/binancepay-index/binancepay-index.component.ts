import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Binancepay } from 'src/app/models/binancepay';
import { BinancepayService } from 'src/app/services/binancepay.service';

@Component({
  selector: 'app-binancepay-index',
  templateUrl: './binancepay-index.component.html',
  styleUrls: ['./binancepay-index.component.css']
})
export class BinancepayIndexComponent implements OnInit {

  title = "Binancepay Home"
  binancepays: Binancepay;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private binancepayService: BinancepayService,
    handler: HttpBackend
  ) {
   }

   ngOnInit(): void {
    this.getBinancepayss();
    window.scrollTo(0,0);
  }

  getBinancepayss(): void {
    // return this.planesService.carga_info();
    this.binancepayService.getBinancepays().subscribe(
      res =>{
        this.binancepays = res;
        error => this.error = error
        // console.log(this.cursos);
      }
    );
  }

  eliminarCurso(binancepay:Binancepay){

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
        this.binancepayService.deleteBinancepay(binancepay).subscribe(
          response =>{
            this.getBinancepayss();
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
    this.binancepayService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getBinancepayss();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.binancepayService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getBinancepayss();
      },
      error=>{
        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }




  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
