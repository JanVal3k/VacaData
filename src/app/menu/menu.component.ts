import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() selectBoard = new EventEmitter<string>();
  showItem(item:string){
    this.selectBoard.emit(item);
  }
}
