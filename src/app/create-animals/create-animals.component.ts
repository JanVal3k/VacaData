import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-animals',
  imports: [],
  templateUrl: './create-animals.component.html',
  styleUrl: './create-animals.component.css'
})
export class CreateAnimalsComponent {
  @Output() newAnimal = new EventEmitter<string>();
  createAnimal(animal:string){
    this.newAnimal.emit(animal);
  }
}
