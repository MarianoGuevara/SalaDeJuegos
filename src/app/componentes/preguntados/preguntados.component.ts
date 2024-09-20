import { Component } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { ApiRequestPreguntadosService } from '../../servicios/api-request-preguntados.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
    suscripcion:Subscription | null = null;
    requester = inject(ApiRequestPreguntadosService);

    rtaCorrectaActual:string = "";
    preguntaActual:string = "";
    opcA:string = "";
    opcB:string = "";
    opcC:string = "";
    opcD:string = "";

    intentos:number = 5;
    puntaje:number = 0;
    
    constructor(){}

    ngOnInit(): void {
        this.preguntaNueva();
    }

    preguntaNueva()
    {
        this.requester.categoria_actual = Math.floor(Math.random() * this.requester.categorias.length);
        this.requester.pagina_actual =  String(Math.floor(Math.random() * 10) + 1); // entre 1 y 10

        const peticion = this.requester.traerPregunta();
        this.suscripcion = peticion.subscribe((rta:any) => { // si llamo al suscribe mas de una vez, la rta se duplica
            this.rtaCorrectaActual = rta.questions[0].correctAnswers;
            this.preguntaActual = rta.questions[0].question;

            let arrayOpciones: any[] = [rta.questions[0].correctAnswers, rta.questions[0].incorrectAnswers[0], rta.questions[0].incorrectAnswers[1], rta.questions[0].incorrectAnswers[2]]
            console.log(arrayOpciones);
            this.Shuffle(arrayOpciones);
            console.log(arrayOpciones);
            this.AsignarQuestionCards(arrayOpciones);
    })
    }

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

    ngOnDestroy(): void 
    {
        console.log("SALIENDO DE PREGUNTADOS");
        if (this.suscripcion !== null) { this.suscripcion?.unsubscribe();}
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

        if (booleano)
        {
            this.puntaje += 1;
        }
        else
        {
            this.intentos -= 1;
        }
        this.preguntaNueva();
    }
}
