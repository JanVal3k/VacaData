import { Component, EventEmitter, Output } from '@angular/core';
import { CreateAnimalsComponent } from "../create-animals/create-animals.component";
import { BovinesService } from '../services/bovines.service';
import { FirebaseService } from '../services/firebase.service';
import { Bovine } from '../../models/Bovines.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CreateAnimalsComponent, CardModule, ButtonModule, QRCodeComponent, ToastModule, ConfirmPopupModule],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AnimalsComponent {
  @Output() selectHealth = new EventEmitter<string>();
  @Output() successMessageToAppComponet = new EventEmitter<{severity: string;
    summary: string;
    detail: string;}>();

  QrDataBovine: string = '';  
  countCards: Bovine[] = [];
  newAnimal = false;

  constructor(private bovineService: BovinesService, private firebaseService:FirebaseService,private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    const currentUser = this.firebaseService.getCurrentUser();
  if (currentUser) {
    this.bovineService.getBovines(currentUser.uid).subscribe({
      next: (data) => {
        this.countCards = data;
      },
      error: (err) => {
        console.error('Error al obtener los bovinos:', err);
      }
    });
  }
  }
  deleteBovineWithId(bovineId: string){
    const currentUser = this.firebaseService.getCurrentUser();
    if(currentUser){
      this.bovineService.deleteBovine(bovineId ,currentUser.uid).subscribe(
        {
          next: ()=>{
            this.ngOnInit();
          }, error:(err)=>{
            console.error('Error al Eliminar',err)
          }
        }
      )
    }
  }
handleToastClose(event: any, bovineID: string){
  const source = event.message.data?.source;
  if(source === 'accept'){
    this.deleteBovineWithId(bovineID);
  }
}

  confirmDelete(event: Event, bovineID: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Esta seguro de querer borrar el animal?\n Este no se podra recuperar despues',
        icon: 'fas fa-circle-exclamation',
        rejectButtonProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptButtonProps: {
            label: 'Aceptar',
            severity: 'danger'
        },
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Animal Borrado con EXITO!', life: 2000, data:{ source: 'accept'} });
            setTimeout(() => {
              this.deleteBovineWithId(bovineID);
            }, 2000);
            
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Borrado cancelado!', life: 2000, data:{ source: 'reject'} });
        }
    });
  }
  plusCard(board: string) {
    const currentUser = this.firebaseService.getCurrentUser();
    if (board === 'Closed') {
      this.newAnimal = false;
      
      if (currentUser) {
        this.bovineService.getBovines(currentUser.uid).subscribe(
          (datos) => {
            this.countCards = datos;
          },
          (error) => {
            console.error("error al volver a obtener datos", error);
          }
        );
      } else {
        console.error("No hay usuario autenticado");
      }
    } else {
      this.showHealth(board);
      this.newAnimal = false;
    }
  }
 
  
  toAppComponenteSuccessMessage(event: { severity: string; summary: string; detail: string }) {
    this.successMessageToAppComponet.emit(event);
  }

  showHealth(item: string) {
    this.selectHealth.emit(item);
  }
}
