import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner-index',
  templateUrl: './banner-index.component.html',
  styleUrls: ['./banner-index.component.css']
})
export class BannerIndexComponent implements OnInit {

  title = "Banner Home"
  banners: Banner;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private bannerService: BannerService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getCursos();
    window.scrollTo(0,0);
  }

  getCursos(): void {
    // return this.planesService.carga_info();
    this.bannerService.getBanners().subscribe(
      res =>{
        this.banners = res;
        error => this.error = error
        // console.log(this.cursos);
      }
    );
  }

  eliminarCurso(banner:Banner){

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
        this.bannerService.deleteBanner(banner).subscribe(
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
    this.bannerService.desactivar(id).subscribe(
      response=>{
        Swal.fire('Actualizado', `desactivado correctamente`, 'success');
        this.getCursos();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.bannerService.activar(id).subscribe(
      response=>{

        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getCursos();
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
