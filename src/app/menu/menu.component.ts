import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  openMenu = false;
  user: any = null;

  @Output() selectBoard = new EventEmitter<string>();
  constructor(private firebaseService: FirebaseService, private eRef: ElementRef){}
  
  ngOnInit(){
    this.firebaseService.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
  signOuth(){
    this.firebaseService.signOut();
  }
  showItem(item:string){
    this.selectBoard.emit(item);
  }
  showMenu(){
    this.openMenu = !this.openMenu;
  }
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.openMenu && !this.eRef.nativeElement.contains(event.target)) {
      this.openMenu = false;
    }
  }
}
