import { Component, EventEmitter, Output } from '@angular/core';
import { CreateAnimalsComponent } from "../create-animals/create-animals.component";

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CreateAnimalsComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent {
    @Output() selectHealth = new EventEmitter<string>();
    countCards:number[] = [];
    newAnimal = false;

    showHealth(item:string){
      this.selectHealth.emit(item);
    }
    plusCard(board: string){

      const lastCard = this.countCards.length > 0 ? this.countCards.at(-1)! : 0;
      this.countCards.push(lastCard+1);
      this.showHealth(board);
      this.newAnimal = false;
    }

    deleteCard($item:number, $index:number){
      this.countCards.splice($index, $item);
    }
}
