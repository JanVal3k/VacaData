import { Component, EventEmitter, Output } from '@angular/core';
import { CreateAnimalsComponent } from "../create-animals/create-animals.component";
import { BovinesService } from '../services/bovines.service';

import { FirebaseService } from '../services/firebase.service';
import { Bovine } from '../../models/Bovines.model';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CreateAnimalsComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
  providers: []
})
export class AnimalsComponent {
  @Output() selectHealth = new EventEmitter<string>();
  @Output() successMessageToAppComponet = new EventEmitter<{severity: string;
    summary: string;
    detail: string;}>();
  countCards: Bovine[] = [];
  newAnimal = false;

  constructor(private bovineService: BovinesService, private firebaseService:FirebaseService) {}

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
