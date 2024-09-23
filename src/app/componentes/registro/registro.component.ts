import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AutentificadorUsuarios } from '../../servicios/autentificador-usuarios.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'; // Importa SweetAlertIcon
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  usuario: Usuario | null = null;

  private auth = inject(AutentificadorUsuarios);
  private router = inject(Router);
  private alert = inject(AlertService);

  input_mail:string = "";
  input_pass:string = "";


  ngOnInit(): void {
    if (this.auth.estaLogueado()) {
      console.log('Usuario autenticado:', this.auth.usuarioActual?.email);
    }
  }
  //   ngOnDestroy(): void {
  //     if (this.authSubscription !== undefined) {
  //       // hay que desuscribirse
  //       this.authSubscription();
  //     }
  //   }

  registrarUsuario() {
    try
    {
        this.usuario = new Usuario(this.input_mail, this.input_pass);

        this.auth
        .registarUsuario(this.usuario.email, this.usuario.password)
        .then(() => {
          this.auth.logueado = true;
          this.alert.Alerta("Registrado", "Bienvenido a la app, " + this.usuario?.email, 'success', this.auth.logueado, "/home");
        })
        .catch((error) => {
            console.error((error as Error).message);

            let msj = "";
            if ((error as Error).message == 'Firebase: Error (auth/email-already-in-use).') msj = "El correo ingresado ya está en uso, pruebe con otro";
            // else if ((error as Error).message == 'auth/invalid-email') msj = "El correo electrónico ingresado no es válido.";
            // else if ((error as Error).message == 'auth/user-not-found') msj = "No se encontró ningún usuario con este correo.";
            // else if ((error as Error).message == 'auth/wrong-password') msj = "No se encontró ningún usuario con esta clave.";
           
            this.alert.Alerta("Fracaso", msj, 'error');
        });
    }
    catch
    {

    }

  }
}
