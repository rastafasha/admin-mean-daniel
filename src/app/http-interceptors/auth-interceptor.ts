import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {
  }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');
  let headers = req.headers.set('Accept', 'application/json');

  if (token) {
    headers = headers.set('x-token', token); // O 'Authorization', 'Bearer ' + token según tu backend
  }

  return next.handle(req.clone({ headers })).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // 401: Token vencido o inválido
      // 403: No tienes permisos
      if (error.status === 401 || error.status === 403) {
        
        // 1. Borramos el token para evitar bucles
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Si guardas el usuario, bórralo también

        // 2. Opcional: Mostrar un mensaje antes de redirigir
        // Usamos SweetAlert2 o un alert simple para avisar
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Tu sesión ha vencido, por favor inicia sesión nuevamente.',
          icon: 'warning',
          confirmButtonText: 'Ir al Login'
        }).then(() => {
            // 3. Redirigir al login
          this._router.navigate(['/login']);
        });

      
      }

      return throwError(() => error);
    })
  );
}


    errors(error: HttpErrorResponse) {
      if (error.status === 4030 || error.status === 4040 || error.status === 4230) {
        this._router.navigate(['/login']);
      }
      return throwError(error);
    }
}

