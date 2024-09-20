import { Injectable, inject, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
    user:any = "";
    
    private firestore = inject(Firestore);

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log("hola1");
    }

    constructor() {}

    RegistrarMensaje(mail:string, fecha:string, msj: string) {
        let col = collection(this.firestore, 'chat');
        addDoc(col, { 
            email: mail,
            fecha: fecha, 
            mensaje: msj
        });
    }
    
     ObtenerMensajes(){
        let col = collection(this.firestore, 'chat');
        const observable = collectionData(col);
    
        return observable;
    }

}
