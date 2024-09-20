import { Component, inject } from '@angular/core';
import { RegistroComponent } from '../registro/registro.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AutentificadorUsuarios } from '../../servicios/autentificador-usuarios.service';
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { LogService } from '../../servicios/log.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'; // Importa SweetAlertIcon


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegistroComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: Usuario | null = null;
  input_mail:string = "";
  input_pass:string = "";

  private auth = inject(AutentificadorUsuarios);
  private log = inject(LogService);
  private router = inject(Router);

  loguearse() {
    try
    {
        this.usuario = new Usuario(this.input_mail, this.input_pass);

        this.auth.loguearse(this.usuario.email, this.usuario.password)
        .then((retorno) => {
            console.log(retorno);

            this.auth.logueado = true;
            this.auth.usuarioActual = retorno.user;
            this.Alerta("Exito", "Bienvenido, " + this.usuario?.email, 'success', this.auth.logueado, "/home");
            this.log.RegistrarLogin(this.usuario?.email as string); // casteo pq ladra esta cosa
        })
        .catch((error) => {
            console.log((error as Error).message);
            
            let msj = "";
            if ((error as Error).message == 'Firebase: Error (auth/invalid-credential).') msj = "Correo y/o clave invalido";
            // else if ((error as Error).message == 'auth/invalid-email') msj = "El correo electrónico ingresado no es válido.";
            // else if ((error as Error).message == 'auth/user-not-found') msj = "No se encontró ningún usuario con este correo.";
            // else if ((error as Error).message == 'auth/wrong-password') msj = "No se encontró ningún usuario con esta clave.";
           
            this.Alerta("Fracaso", msj, 'error');
        });
    }
    catch (e)
    {
        this.Alerta("Fracaso", (e as Error).message, 'error');
    }
  }

  Alerta(titulo:string, texto:string, icono:SweetAlertIcon, navegar=false, ruta="")
  {
    Swal.fire({
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
  LlenarUsers(mail:string, pass:string)
  {
    this.input_mail = mail;
    this.input_pass = pass;
  }
}
