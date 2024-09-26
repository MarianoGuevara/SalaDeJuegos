export class Usuario {
    email = '';
    password = '';
  
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    //   try
    //   {
    //     this.email = this.verificarMail(email);
    //     this.password = this.verificarClave(password);
    //   }
    //   catch (e) {throw e;}
    }

    // verificarMail(correo_ing:string)
    // { 
    //     let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if ( emailRegex.test(correo_ing) == false) {throw new Error("Correo en formato inválido");}
    //     return correo_ing;
    // }

    // verificarClave(clave:string)
    // {
    //     if (clave.length < 6) {throw new Error("Clave en formato inválido");}
    //     return clave;
    // }
}