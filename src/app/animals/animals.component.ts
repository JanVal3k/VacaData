import { Component, EventEmitter, Output } from '@angular/core';
import { CreateAnimalsComponent } from "../create-animals/create-animals.component";
import { BovinesService } from '../services/bovines.service';
import { Bovine } from '../../models/Bovines.model';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CreateAnimalsComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent {
    @Output() selectHealth = new EventEmitter<string>();
    countCards:Bovine[] = [];
    newAnimal = false;

    constructor (private bovineService: BovinesService){}   
    ngOnInit(){
      this.bovineService.getBovines().subscribe(
        (datos) => {
          this.countCards = datos.data;  
        },
        (error) =>{
          console.error("Error al obtener datos:", error);
          alert(`${error} Baia baia algo salió malardo`);
        }
      )
    }
    showHealth(item:string){
      this.selectHealth.emit(item);
    }

    plusCard(board: string){
      if(board === 'Closed'){
        this.newAnimal = false;  
      }else{
      this.showHealth(board);
      this.newAnimal = false;
    }
    }

    // deleteCard( $index:number){
    //   this.countCards.splice($index, 1);
    // }
}
