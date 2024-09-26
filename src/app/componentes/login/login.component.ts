import { Component, inject } from '@angular/core';
import { RegistroComponent } from '../registro/registro.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AutentificadorUsuarios } from '../../servicios/autentificador-usuarios.service';
import { Usuario } from '../../clases/usuario';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogService } from '../../servicios/log.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'; // Importa SweetAlertIcon
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegistroComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public formGroupMio: FormGroup;

  usuario: Usuario | null = null;
  input_mail:string = "";
  input_pass:string = "";

  private auth = inject(AutentificadorUsuarios);
  private log = inject(LogService);
  private router = inject(Router);
  private alert = inject(AlertService);
  fb = inject(FormBuilder)
  
  constructor(){
    this.formGroupMio = this.fb.group({ 
        // 1er parametro es el valor por defecto que tendrá el input. 2do listado de validaciones q debe cumplir el input
        correo: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.email]], 
        clave: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.miValidadorPropio]]
    });

  }

  loguearse() {
    try
    {
        console.log(this.formGroupMio);
        this.usuario = new Usuario(this.input_mail, this.input_pass);

        this.auth.loguearse(this.usuario.email, this.usuario.password)
        .then((retorno) => {
            console.log(retorno);

            this.auth.logueado = true;
            this.auth.usuarioActual = retorno.user;
            this.alert.Alerta("Exito", "Bienvenido, " + this.usuario?.email, 'success', this.auth.logueado, "/home");
            this.log.RegistrarLogin(this.usuario?.email as string); // casteo pq ladra esta cosa
        })
        .catch((error) => {
            console.log((error as Error).message);
            
            let msj = "";
            if ((error as Error).message == 'Firebase: Error (auth/invalid-credential).') msj = "Correo y/o clave invalido";
            // else if ((error as Error).message == 'auth/invalid-email') msj = "El correo electrónico ingresado no es válido.";
            // else if ((error as Error).message == 'auth/user-not-found') msj = "No se encontró ningún usuario con este correo.";
            // else if ((error as Error).message == 'auth/wrong-password') msj = "No se encontró ningún usuario con esta clave.";
           
            this.alert.Alerta("Fracaso", msj, 'error');
        });
    }
    catch (e)
    {
        this.alert.Alerta("Fracaso", (e as Error).message, 'error');
    }
  }

  LlenarUsers(mail:string, pass:string)
  {
    this.input_mail = mail;
    this.input_pass = pass;
  }

  miValidadorPropio(control: AbstractControl): null | object
  {
      const valor: string = control.value as string;
      const tieneEspacios = valor.includes(" ");
      if (tieneEspacios)
      {
          return { 
              espacios : {
                  posicion: valor.indexOf(" "),
              },
          };
      }
      else {return null;}
  }
}
