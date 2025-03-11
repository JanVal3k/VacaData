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
    countCards:number[] = [];
    

    showHealth(item:string){
      this.selectHealth.emit(item);
    }
    plusCard(){
      const lastCard = this.countCards.length > 0 ? this.countCards.at(-1)! : 0;
      this.countCards.push(lastCard+1);
      console.log(`este es el ulltimo item: ${lastCard}`);
    }

    deleteCard($item:number, $index:number){
      this.countCards.splice($index, $item);
    }
}
