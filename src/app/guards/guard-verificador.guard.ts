import { inject} from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AutentificadorUsuarios } from '../servicios/autentificador-usuarios.service';
import { AlertService } from '../servicios/alert.service';

export const guardVerificadorGuard: CanActivateFn = (route, state) => {
    const user = inject(AutentificadorUsuarios);
    const alerta = inject(AlertService);

    console.log("GUARD");
    console.log(user.usuarioActual);
    
    let retorno = true;
    if (user.usuarioActual === null)
    {
        retorno = false;
        alerta.Alerta("IMPOSIBLE", "No puedes ingresar a los juegos sin haber iniciado sesión antes", 'warning');
    }
    return retorno;
};
