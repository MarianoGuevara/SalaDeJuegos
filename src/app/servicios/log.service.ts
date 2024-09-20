import { Injectable, inject } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    private firestore = inject(Firestore);
    constructor() { }

    RegistrarLogin(email: string) {
        let col = collection(this.firestore, 'logs');
        addDoc(col, { 
            fecha: new Date(), 
            usuario : email
        });
    }
    
    ObtenerLogins(){
        let col = collection(this.firestore, 'logs');
        const observable = collectionData(col);
    
        return observable;
    }
}
