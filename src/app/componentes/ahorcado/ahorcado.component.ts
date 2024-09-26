import { Component, inject } from '@angular/core';
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
    letras: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];
    palabras: string[] = [    
        "elefante", "computadora", "jirafa", "bicicleta", "telefono",     
        "hipopotamo", "estudiante", "automovil", "lampara", "refrigerador",     
        "mariposa", "almohada", "diccionario", "pintura", "saxofon",     
        "helicoptero", "paraguas", "martillo", "tornillo", "universidad",     
        "television", "calculadora", "murcielago", "avion", "alcalde"
    ];
    imagenes: string[] = ["assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/6.png", "assets/7.png"]
    palabra_actual:string = "";
    img_actual:string = this.imagenes[0];
    imagenes_flag:number = 0;
    private alert = inject(AlertService);

    constructor()
    {
        let randomIndex = Math.floor(Math.random() * (this.palabras.length));
        this.palabra_actual = this.palabras[randomIndex];
        console.log(this.palabra_actual)
    }
    clickLetra(event: MouseEvent) {
        const elemento = event.target as HTMLElement; 
        let letraSeleccionada = elemento.classList[1] as string; // Obtener la letra del elemento clicado
    
        let acerto = this.reconocerIgualdades(letraSeleccionada); // Verificar si la letra es correcta
    
        if (acerto) {
            let indices = this.indicesIgualdad(letraSeleccionada); // Obtener los índices de la letra en la palabra actual
            for (let i = 0; i < indices.length; i++) {
                let etiqueta = document.getElementsByClassName(indices[i].toString());
                const elementoDiv = etiqueta[0] as HTMLElement;
                let txt = document.createElement("p");
                txt.textContent = letraSeleccionada; // Usar la letra seleccionada
                txt.style.margin = "0";
                txt.classList.add("intento");
                elementoDiv.appendChild(txt);
            }
    
            // Verificar si el jugador ha ganado
            if (this.verificarGano()) {
                this.alert.Alerta("GANASTE", "Adivinaste la palabra '"+this.palabra_actual+"'!! Felicitaciones", 'success', true, "/home");
            }
    
        } else {
            // Manejar el error (incrementar el contador de imágenes)
            this.imagenes_flag++;
            this.img_actual = this.imagenes[this.imagenes_flag];
            if (this.imagenes_flag === this.imagenes.length - 1) {
                setTimeout(() => {
                    this.alert.Alerta("PERDISTE", "La palabra era: '"+this.palabra_actual+"' suerte la próxima", 'error', true, "/home");
                }, 2000); 
            }
        }
        
        elemento.classList.add('disabled'); // Deshabilitar la letra seleccionada
    }
    
    
    reconocerIgualdades(letra:string)
    {
        let acierto:boolean = false;
        for (let i=0; i<this.palabra_actual.length; i++)
        {
            if (letra == this.palabra_actual[i].toUpperCase())
            {
                acierto = true;
                break;
            }
        }
        return acierto;
    }

    indicesIgualdad(letra:string)
    {
        let indicesIgualdad: number[] = [];
        for (let i=0; i<this.palabra_actual.length; i++)
        {
            if (letra == this.palabra_actual[i].toUpperCase())
            {
                indicesIgualdad.push(i);
            }
        }
        return indicesIgualdad;
    }

    verificarGano(): boolean {
        let palabraConstruida = "";
        
        // Construir la palabra basada en los elementos que se han revelado
        for (let i = 0; i < this.palabra_actual.length; i++) {
            // Para cada letra en la palabra actual, busca si está revelada
            let elemento = document.getElementsByClassName(i.toString())[0]; // Obtener el div correspondiente por índice
            if (elemento) {
                let pElement = elemento.getElementsByTagName('p')[0]; // Obtener el <p> dentro del div
                palabraConstruida += pElement ? pElement.textContent : '_'; // Agregar letra revelada o '_' si no hay
            }
        }
        
        console.log("Palabra construida: ", palabraConstruida);
        console.log("Palabra actual: ", this.palabra_actual);
    
        return palabraConstruida.toLowerCase() === this.palabra_actual; // Comparar la palabra construida con la actual
    }
}
