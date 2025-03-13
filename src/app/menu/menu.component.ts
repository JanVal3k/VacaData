import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  openMenu = false;
  @Output() selectBoard = new EventEmitter<string>();
  showItem(item:string){
    this.selectBoard.emit(item);
  }
  showMenu(){
    if(this.openMenu === false){
      this.openMenu = true
    }else{
      this.openMenu = false
    }
  }
}
