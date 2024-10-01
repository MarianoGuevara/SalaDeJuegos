import { Injectable, inject } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'; // Importa SweetAlertIcon
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private router = inject(Router);
    
  constructor() { }

  async Alerta(titulo:string, texto:string, icono:SweetAlertIcon, navegar=false, ruta="")
  {
    return Swal.fire({
        title: titulo,
        text: texto,
        icon: icono, // 'success', 'error', 'warning', 'info', 'question'
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica si el usuario confirma
           if (navegar && ruta != "")
           {
               this.router.navigate([ruta]);
           }
          
        }
      });
  }
}
