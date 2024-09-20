import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SobreMiComponent } from '../sobre-mi/sobreMi';
import { LoginComponent } from '../login/login.component';
import { AutentificadorUsuarios } from '../../servicios/autentificador-usuarios.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HomeComponent,
    RouterOutlet,
    RouterLink,
    SobreMiComponent,
    LoginComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  //   logueado: boolean = false;
  auth = inject(AutentificadorUsuarios);

  ngOnInit(): void {
    console.log("Header init");
    // this.auth.verificarSesion();
    // this.auth
    // console.log(this.auth.estaLogueado());
    // this.logueado = this.auth.estaLogueado();
  }

  constructor() { console.log("ey");}

  cerrarSesion() {
    this.auth.cerrarSesion();
    // this.logueado = false;
  }

  chis()
  {
    console.log(this.auth.estaLogueado());
  }
}