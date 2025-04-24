// create-animals.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { BovinesService } from '../services/bovines.service';
import { FirebaseService } from '../services/firebase.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';

interface Razas {
  name: string;
}

@Component({
  selector: 'app-create-animals',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    ToastModule, 
    ButtonModule, 
    DropdownModule, 
    RippleModule, 
    InputTextModule, 
    FloatLabelModule, 
    CalendarModule
  ],
  providers: [MessageService],
  templateUrl: './create-animals.component.html',
  styleUrl: './create-animals.component.css'
})
export class CreateAnimalsComponent {
  @Output() newAnimal = new EventEmitter<string>();
  animales: FormGroup;
  fechaDelDia: Date;
  razas: Razas[] = [
    {name: 'Raza 1'},
    {name: 'Raza 2'},
    {name: 'Raza 3'}
  ];
  selectedRaza: Razas | undefined;

  constructor(
    private bovineService: BovinesService, 
    private fb: FormBuilder, 
    private firebaseService: FirebaseService, 
    private messageService: MessageService
  ) {
    this.fechaDelDia = new Date();
    
    this.animales = this.fb.group({
      NameBovine: [''],
      Mother: [''],
      Father: [''],
      Born_Date: [this.fechaDelDia],
      Address: [''],
      Race: [''],
      Weight: [''],
      Sex: [''],
      Reproduction: [''],
    });
  }
  saveAnimal() {
    const dataAnimal = this.animales.value;
    const currentUser = this.firebaseService.getCurrentUser();
    const bornDate = dataAnimal.Born_Date instanceof Date 
          ? dataAnimal.Born_Date.toISOString().slice(0,10)
          : dataAnimal.Born_Date;
      
    if(currentUser) {
      const dataAnimalWithUser = {
        ...dataAnimal, 
        user_id: currentUser.uid, 
        Born_Date: bornDate
      };
      
      this.bovineService.saveBovine(dataAnimalWithUser).subscribe({
        next: (response) => {
          this.animales.reset();
          this.menssageExito();
          this.createAnimal('Closed');
        },
        error: (err) => {
          console.error('Error al guardar el Animal en Turso:', err);
        }
      });
    }
  }
  
  menssageExito() {
    this.messageService.add({
      severity: 'success',
      summary: 'Muaaaw!',
      detail: 'Animal Guardado correctamente 🎉'
    });
  }
  
  createAnimal(animal: string) {
    this.newAnimal.emit(animal);
  }
}