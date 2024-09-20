import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestPreguntadosService {
    http = inject(HttpClient);
    categorias: string[] = ['geography', 'arts%26literature', 'entertainment', 'science%26nature', 'sports%26leisure', 'history'];
    
    categoria_actual:number = -1;
    pagina_actual:string | null = null;

    // apiUrl = "https://api.quiz-contest.xyz/questions?limit=1&page="+ this.pagina_actual +"&category=" + this.categoria_actual;
  
  constructor() { }

  traerPregunta()
  {
    console.log(this.categorias[this.categoria_actual]);
    const apiUrl = `https://api.quiz-contest.xyz/questions?limit=1&page=${this.pagina_actual}&category=${this.categorias[this.categoria_actual]}&format=multiple`;

    const peticion = this.http.get(apiUrl, {
        responseType : "json",
        headers: {
            Authorization: "$2b$12$r1FaImEYBRYgkrfuEu3uuu8KE2XWeul8gQyMflOVd7Xjuo4wQWYpq",
        }
        
    })
    return peticion; // la devuelvo y cada componente llamará individualmente a la api
    
    // SI HICIERA EL SUSCRIBE ACA, LA PETICION ESTARIA CARGADA SIEMPRE EN EL SERVICIO Y SOLO LA QUIERO 
    // EN ALGUNOS COMPONENTES POR ESO A VECES NECESITAMOS Q LA PETICION SEA LOCAL DEL COMPONENTE LA MAYORIA DE VECES
  }
}
