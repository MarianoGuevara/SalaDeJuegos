import { Component, inject } from '@angular/core';
import { AlertService } from '../../servicios/alert.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-clickrush',
  standalone: true,
  imports: [],
  templateUrl: './clickrush.component.html',
  styleUrl: './clickrush.component.css'
})
export class ClickrushComponent {
    txt_btn:string = "INICIAR CLICK RUSH";
    jugando:boolean = false;
    tiempo_setted:boolean = false;

    tiempo:number = 0;
    tiempoScreen:number = 0;
    intervalo:any; // gestiona el intervalo segundo a segundo

    clicks:number = 0;

    mensajePostPartido:string[] = ["Comprate una mano", "Sos MUY malo", "mediocre...", "bien ahi pa", "se ve que eras bueno jugando minecraft pvp", "Proeza", "Leyenda", "Salí de tu casa, por favor... pasto..."];

    private alert = inject(AlertService);

    constructor(){}

    iniciarContador() {
        this.intervalo = setInterval(() => {
          this.tiempo--;
          if (this.tiempo == 0) {this.detenerJuego();}
        }, 1000); // Actualiza cada segundo
    }

    detenerJuego() {
        clearInterval(this.intervalo);

        let index = this.mostrarMensajeFinal();
        let icono = 'error';
        if (index > 4) {icono = "info";}
        else if (index > 7) {icono = "success";}
        this.alert.Alerta("TERMINÓ EL JUEGO", this.mensajePostPartido[index], icono as SweetAlertIcon);

        this.tiempo = 0;
        this.jugando = false;
        this.tiempo_setted = false;
        this.clicks = 0;

        const button =  document.querySelectorAll('.start-btn')[0] as HTMLButtonElement;
        button.style.backgroundColor = "rgb(47,53,58)";
        button.style.color = "white";

        const items = document.querySelectorAll('.challenge-item');
        items.forEach((item) => {
          item.classList.remove('active');
        });

        // this.alert.Alerta("TERMINÓ EL JUEGO")
    }

    setActive(event: any): void { // event representa el botón tocado
        if (!this.jugando)
        {
            const items = document.querySelectorAll('.challenge-item');
    
            items.forEach((item) => {
              item.classList.remove('active');
            });
        
            event.target.classList.add('active');
            this.tiempo = event.target.classList[1] as number;
            this.tiempo_setted = true;
        }

    }

    startGameBtnTxt()
    {
        if (!this.jugando)
        {
            if (this.tiempo_setted)
            {
                this.txt_btn = "CLICK AQUI ¡RÁPIDO!";
                const button =  document.querySelectorAll('.start-btn')[0] as HTMLButtonElement;
                button.style.backgroundColor = "rgb(255,193,7)";
                button.style.color = "#333";
    
                this.jugando = true;
                this.iniciarContador();
            }
            else
            {
                this.alert.Alerta("Error", "Debes seleccionar un tiempo antes de iniciar el juego", "error");
            }
        }
        else
        {
            this.clicks ++;
            
        }
    }

    mostrarMensajeFinal() {
        // Cálculo de clics por segundo
        const divisor =  document.querySelectorAll('.active')[0] ;
        const clicsPorSegundo = this.clicks / Number(divisor.classList[1]); // Evitar división por cero
        console.log(clicsPorSegundo);

        let indiceMensaje: number;

        // Determinar el índice del mensaje en función de clics por segundo
        if (clicsPorSegundo < 3) {
            indiceMensaje = 0; // Peor
        } else if (clicsPorSegundo < 4) {
            indiceMensaje = 1;
        } else if (clicsPorSegundo < 6) {
            indiceMensaje = 2;
        } else if (clicsPorSegundo < 8) {
            indiceMensaje = 3;
        } else if (clicsPorSegundo < 10) {
            indiceMensaje = 4;
        } else if (clicsPorSegundo < 13) {
            indiceMensaje = 5;
        } else if (clicsPorSegundo < 17) {
            indiceMensaje = 6;
        } else {
            indiceMensaje = 7;
        }
        
    
        // Muestra el mensaje correspondiente en la consola
        return indiceMensaje;
    }
}
