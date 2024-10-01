import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {
    private router = inject(Router);
    private alert = inject(AlertService);

    listaCartas: string[] = ["assets/1 BASTO.png","assets/1 ESPADA.png","assets/1 COPA.png","assets/1 ORO.png","assets/2 ORO.png","assets/2 BASTO.png","assets/2 COPA.png","assets/2 ESPADA.png","assets/3 ORO.png","assets/3 BASTO.png","assets/3 COPA.png","assets/3 ESPADA.png","assets/4 ORO.png","assets/4 BASTO.png","assets/4 COPA.png","assets/4 ESPADA.png","assets/5 ORO.png","assets/5 BASTO.png","assets/5 COPA.png","assets/5 ESPADA.png","assets/6 ORO.png","assets/6 BASTO.png","assets/6 COPA.png","assets/6 ESPADA.png","assets/7 ORO.png","assets/7 BASTO.png","assets/7 COPA.png","assets/7 ESPADA.png","assets/10 ORO.png","assets/10 BASTO.png","assets/10 COPA.png","assets/10 ESPADA.png","assets/11 ORO.png","assets/11 BASTO.png","assets/11 COPA.png","assets/11 ESPADA.png","assets/12 ORO.png","assets/12 BASTO.png","assets/12 COPA.png","assets/12 ESPADA.png"];
    indexCartaActual: number = -1;
    cartaIzq: string = "assets/REVERSO.png";
    cartaDer: string = "assets/REVERSO.png";
    cartaDerVal: string = "";
    puntaje: number = 0;

    clickeable: boolean = true;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.nuevaCarta();
    }

    nuevaCarta(cartaAnterior:string = "") // asigna valores nuevos a las cartas (real y en apariencia)
    {
        let indice1 = Math.floor(Math.random() * this.listaCartas.length);


        let indice2 = indice1;
        while (indice2 == indice1)
        {
            indice2 = Math.floor(Math.random() * this.listaCartas.length);
        }
    
        this.cartaDer = "assets/REVERSO.png";

        if (cartaAnterior != "") {this.cartaIzq = cartaAnterior;}
        else {this.cartaIzq = this.listaCartas[indice1];}
        
        this.cartaDerVal = this.listaCartas[indice2];

        this.castNumber(this.cartaIzq);

        if(!this.clickeable){this.clickeable = true;}
    }

    clickBtn(accion:string)
    {
        this.clickeable = false;

        let numIzq = this.castNumber(this.cartaIzq)!;
        let numDer = this.castNumber(this.cartaDerVal)!;
        let gano = this.combateCards(numIzq, numDer, accion);

        // console.log("CARTA IZQUIERDA ->", numIzq);
        // console.log("CARTA DERECHA ->", numDer);
        // console.log("VOTO -> ", accion);
        // console.log(gano);

        this.cartaDer = this.cartaDerVal;
        if (gano) {
            this.puntaje ++;

            setTimeout(() => {
                this.alert.Alerta("Ganaste", "Sumaste un punto", 'success').then
                {
                    this.nuevaCarta(this.cartaDerVal);
                }
            }, 2000);
        }
        else{
            setTimeout(() => {
                this.alert.Alerta("Perdiste", "Alcanzaste un total de '"+this.puntaje+"' puntos.", 'error', true, "/home");
            }, 2000);
        }
    }

    castNumber(cadenaCarta:string){
        const regex = /(\d+)/; 
        const match = cadenaCarta.match(regex);
        if (match) {
            // console.log(match);
            const numero = match[0];
            console.log(numero);
            return Number(numero);
          }
        return null 
    }

    combateCards(num1:number, num2:number, accion:string)
    {
        let retorno: boolean = false;

        if (accion == "menor")
        {
            if (num1 >= num2) {retorno = true;}            
        }
        else if (num1 <= num2) {retorno = true;}
        return retorno;
    }
}
