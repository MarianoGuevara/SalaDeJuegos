import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ApiRequestPreguntadosService } from '../../servicios/api-request-preguntados.service';
import { Subscription  } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2'; // Importa SweetAlertIcon
import { Router } from '@angular/router';
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
    suscripcion:Subscription | null = null;
    suscripcionImg:Subscription | null = null;
    
    requester = inject(ApiRequestPreguntadosService);
    private router = inject(Router);
    private alert = inject(AlertService);

    rtaCorrectaActual:string = "";
    preguntaActual:string = "";
    opcA:string = "";
    opcB:string = "";
    opcC:string = "";
    opcD:string = "";

    img_actual:string = "";

    intentos:number = 5;
    puntaje:number = 0;


    constructor(){}

    ngOnInit(): void {
        this.preguntaNuevaConSpinner();
    }

    ngOnDestroy(): void {
        if (this.suscripcion) { this.suscripcion?.unsubscribe();}
        if (this.suscripcionImg) { this.suscripcionImg?.unsubscribe();}
        this.ocultarSpinner();
    }

    mostrarSpinner() {
        const spinner = document.createElement('div');
        spinner.id = 'spinner';
        spinner.style.position = 'fixed';
        spinner.style.top = '0';
        spinner.style.left = '0';
        spinner.style.width = '100%';
        spinner.style.height = '100%';
        spinner.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'; // Pantalla gris con opacidad
        spinner.style.display = 'flex';
        spinner.style.alignItems = 'center';
        spinner.style.justifyContent = 'center';
        spinner.style.color = 'white';
        spinner.style.fontSize = '24px';
        spinner.style.zIndex = '1000'; // Asegúrate de que esté por encima de otros elementos
    
        const texto = document.createElement('div');
        texto.textContent = '...'; // El texto que quieres mostrar
        spinner.appendChild(texto);
    
        document.body.appendChild(spinner);
    }
    
    ocultarSpinner() {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    preguntaNuevaConSpinner()
    {
        this.mostrarSpinner();
        this.preguntaNueva();
    }

    imagenNueva() {
        if (this.suscripcionImg) {this.suscripcionImg.unsubscribe();}        
        this.suscripcionImg = this.requester.traerImagenSobrePregunta().subscribe({
            next: (rta: any) => { // next del suscribe es cuando termina la request

                console.log(rta.results);
                
                let indice = Math.floor(Math.random() * 10) 
                this.img_actual = rta.results[indice].urls.small;
                console.log("Su chingada madre");
            }
        })
    }


    preguntaNueva() {
        this.requester.categoria_actual = Math.floor(Math.random() * this.requester.categorias.length);
        this.requester.pagina_actual = String(Math.floor(Math.random() * 10) + 1);

        if (this.suscripcion) {this.suscripcion.unsubscribe();}

        this.suscripcion = this.requester.traerPregunta().subscribe({
            next: (rta: any) => { // next del suscribe es cuando termina la request
                console.log("VALENTI");
                this.rtaCorrectaActual = rta.questions[0].correctAnswers;
                this.preguntaActual = rta.questions[0].question;

                let arrayOpciones: any[] = [
                    rta.questions[0].correctAnswers, 
                    rta.questions[0].incorrectAnswers[0], 
                    rta.questions[0].incorrectAnswers[1], 
                    rta.questions[0].incorrectAnswers[2]
                ];

                this.imagenNueva();

                this.Shuffle(arrayOpciones);
                this.AsignarQuestionCards(arrayOpciones);
            },
            complete: () => {
                this.ocultarSpinner();
            }
        });
    }

    // x()
    // {
    //     'https://api.unsplash.com/search/photos?client_id=CXTqJZq4rTadML5sVLFAr7yQk6Ni6qB19px26pTra68&query='
    // }


    AsignarQuestionCards(array:any[])
    {
        this.opcA = array[0];
        this.opcB = array[1];
        this.opcC = array[2];
        this.opcD = array[3];
    }

     Shuffle(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos
        }
        return array;
    }

    IntentoPregunta(letra:string)
    {
        let booleano;
        switch (letra)
        {
            case "A":
                booleano = this.rtaCorrectaActual == this.opcA;
                break;
            case "B":
                booleano = this.rtaCorrectaActual == this.opcB;
                break;
            case "C":
                booleano = this.rtaCorrectaActual == this.opcC;
                break;
            case "D":
                booleano = this.rtaCorrectaActual == this.opcD;
                break;
        }

        let icono = "success";
        let titulo = "Correcto!";
        let body = "Sumas un punto...";

        if (booleano)
        {
            this.puntaje += 1;
        }
        else
        {
            icono = 'error';
            titulo = "Incorrecto!";
            body = "Restas una vida... La correcta era: " + this.rtaCorrectaActual;

            this.intentos -= 1;
        }
        
        if (this.intentos > 0)
        {
            this.alert.Alerta(titulo, body, icono as SweetAlertIcon).then(() => {
                this.preguntaNuevaConSpinner();
            })
        }
        else
        {
            this.alert.Alerta("PERDISTE", "Te quedaste sin intentos, tu puntaje fue de: " + String(this.puntaje), 'warning', true,"/home");
        }
    }
}
