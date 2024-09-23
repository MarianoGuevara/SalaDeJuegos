import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AutentificadorUsuarios } from '../../servicios/autentificador-usuarios.service';
import { User } from '@angular/fire/auth';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ChatService } from '../../servicios/chat.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

interface Mensaje {
    email: string; 
    fecha: string; 
    mensaje: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
    @ViewChild('chatContent') chatContent: ElementRef | null = null;
    private isScrollingEnabled: boolean = true;

    usuarioActual: User | null = null;
    mail: string = "";
    fecha: string = "";
    msj: string = "";
    mensajes: Mensaje[] = [];

    auth = inject(AutentificadorUsuarios);
    chatBd = inject(ChatService);
    suscripcion: Subscription | null = null;

    constructor() {
        this.cargarMensajes()
        .then(() => {
            this.ordenarMensajesPorFecha();
            this.scrollToBottom(); // Desplazarse al fondo solo al cargar
        });
    }

    async cargarMensajes() {
        this.mensajes = []; 
        this.suscripcion?.unsubscribe(); 
        this.suscripcion = this.chatBd.ObtenerMensajes().subscribe((rta: any[]) => {
            rta.forEach((element) => {
                this.mensajes.push({
                    fecha: element.fecha,
                    email: element.email,
                    mensaje: element.mensaje,
                });
            });
            this.ordenarMensajesPorFecha(); // Ordenar mensajes después de agregarlos
            if (this.isScrollingEnabled) {
                this.scrollToBottom(); // Solo desplaza si está habilitado
            }
        }, (error: any) => {
            console.error('Error al cargar los mensajes', error);
        });
    }

    scrollToBottom(): void {
        setTimeout(() => {
            if (this.chatContent) {
                this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
            }
        }, 0);
    }

    SubirMensaje() {
        this.mail = this.auth.usuarioActual?.email as string;

        if ((this.msj.length > 42 || this.msj.length == 0) || this.msj[0] == " ") {
            this.Alerta("ERROR", "El mensaje supera el máximo de caracteres (42) o empieza vacío", 'info');
        } else {
            this.fecha = this.FormatearFecha();
            this.suscripcion?.unsubscribe();
            this.chatBd.RegistrarMensaje(this.mail, this.fecha, this.msj);
            this.mensajes.push({
                fecha: this.fecha,
                email: this.mail,
                mensaje: this.msj,
            });
            this.msj = "";
            this.isScrollingEnabled = true; // Habilita el scroll después de enviar un mensaje
            this.scrollToBottom(); // Desplazarse al fondo después de enviar un nuevo mensaje
        }
    }

    FormatearFecha()
    {
        const fecha = new Date();

        const opciones: Intl.DateTimeFormatOptions = {
          day: 'numeric',    // Día sin ceros iniciales
          month: 'numeric',  // Mes sin ceros iniciales
          year: 'numeric',   // Año completo
          hour: '2-digit',   // Hora con ceros iniciales
          minute: '2-digit', // Minutos con ceros iniciales
          hour12: false      // Hora en formato 24 horas
        };
        
        const fechaFormateada = fecha.toLocaleString('es-ES', opciones);
        return (fechaFormateada); // Ejemplo: 19/9/2024, 17:58
    }
    ordenarMensajesPorFecha() {
        this.mensajes.sort((a, b) => {
            const fechaA = this.convertirFecha(a.fecha);
            const fechaB = this.convertirFecha(b.fecha);
            
            return fechaA.getTime() - fechaB.getTime();
        });
    }
    convertirFecha(fechaStr: string): Date {
        const [fecha, hora] = fechaStr.split(', '); // Separa la fecha de la hora
        const [dia, mes, anio] = fecha.split('/').map(Number); // Separa día, mes y año
        const [horas, minutos] = hora.split(':').map(Number); // Separa hora y minutos

        // Crea y devuelve un objeto Date con la fecha y hora correspondiente
        return new Date(anio, mes - 1, dia, horas, minutos); // Mes en Date es 0-indexed
    }


    Alerta(titulo:string, texto:string, icono:SweetAlertIcon, navegar=false, ruta="")
    {
      Swal.fire({
          title: titulo,
          text: texto,
          icon: icono, // 'success', 'error', 'warning', 'info', 'question'
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Lógica si el usuario confirma
            
          }
        });
    }
          
    ngOnDestroy(): void {
        this.suscripcion?.unsubscribe();
        
      }
}