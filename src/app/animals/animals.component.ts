import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent {
    @Output() selectHealth = new EventEmitter<string>();
    showHealth(item:string){
      this.selectHealth.emit(item);
    }
}
