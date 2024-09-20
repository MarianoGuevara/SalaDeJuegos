import { Injectable, inject, OnInit } from '@angular/core';
import {
  Auth,
  User,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Unsubscribe } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutentificadorUsuarios implements OnInit {
  logueado: boolean = false;
  usuarioActual: User | null = null;

  auth = inject(Auth);
  router = inject (Router)
  authSubscription?: Unsubscribe;

  ngOnInit(): void {
      console.log("Init auth");
  }

  constructor() 
  {
    console.log("si service")
    // this.authSubscription = this.auth.onAuthStateChanged((user) => { // constantemente verifica
    //     console.log("LLAMANDO");
    //     if (user?.email) {

    //         console.log(user);
    //       this.logueado = true;
    //       this.usuarioActual = user;
    //     } else {
    //       this.logueado = false;
    //       this.usuarioActual = null;
    //     }
    //     console.log('Usuario autenticado:', user);
    //   });
  }

//   ngOnInit(): void {
//     console.log(" init al menos");
//     // this.authSubscription = this.auth.onAuthStateChanged((user) => { // constantemente verifica
//     //     console.log("LLAMANDO");
//     //     if (user?.email) {
//     //       this.logueado = true;
//     //       this.usuarioActual = user;
//     //     } else {
//     //       this.logueado = false;
//     //       this.usuarioActual = null;
//     //     }
//     //     console.log('Usuario autenticado:', user);
//     //   });
//   }

verificarSesion(): Promise<User | null> {
    return new Promise((resolve) => {
      this.authSubscription = this.auth.onAuthStateChanged((user) => {
        if (user?.email) {
          this.logueado = true;
          this.usuarioActual = user;
          console.log('Usuario autenticado', user);
        } else {
          this.logueado = false;
          this.usuarioActual = null;
        }
        // Resuelve la promesa cuando termina el cambio de estado
        resolve(this.usuarioActual);
      });
    });
  }
  // Si necesitas desuscribirte al cambiar de componente
  //   ngOnDestroy(): void {
  //     if (this.authSubscription !== undefined) {
  //       this.authSubscription();
  //     }
  //   }

  estaLogueado(): boolean {
    return this.logueado;
  }
  
  getUser(): User | null {
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    signOut(this.auth).then(() => {
      this.usuarioActual = null;
      this.logueado = false;
      this.router.navigate(['/login']);
    });
  }

  async registarUsuario(email: string, pass: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, pass);
    return user;
  }

  async loguearse(email: string, pass: string) {
    const user = await signInWithEmailAndPassword(this.auth, email, pass);
    return user;
  }

  ngOnDestroy(): void {
    if (this.authSubscription !== undefined) {
      this.authSubscription();
    }
  }
}
    