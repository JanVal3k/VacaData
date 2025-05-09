import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalsComponent } from "./animals/animals.component";
import { HealthComponent } from "./health/health.component";
import { ReproducctionComponent } from "./reproducction/reproducction.component";
import { LoginComponent } from "./login/login.component";
import { FirebaseService } from './services/firebase.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  AnimalsComponent, HealthComponent, ReproducctionComponent, LoginComponent, Toast, Menu, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
    Board='';
    login = false;
    itemsMenu: MenuItem[] | undefined;
    user: any = null;
    constructor(private firebaseService: FirebaseService, private messageService: MessageService){
      this.firebaseService.auth.onAuthStateChanged((user)=>{
        this.login = !!user;
      });
    }

    messageSuccessAddBovine(event: {severity: string, summary: string, detail: string}){
      this.messageService.add({
        severity: event.severity,
        summary: event.summary,
        detail: event.detail});
    }

    ngOnInit(){
      this.firebaseService.auth.onAuthStateChanged((user) => {
        this.user = user;
      });
      this.itemsMenu = [{
        label: this.user,
        items:[
          {
            label: 'Configracion',
            icon: 'fas fa-gear  '
          },
          {
            label: 'Cerrar Sesion',
            icon: 'fas fa-arrow-right-from-bracket',
            command: ()=>{this.firebaseService.signOut()},
          },
        ]
      }]
    }
    
    signOut(){
      this.firebaseService.signOut();
    }
    getBoard(boardName: string){
      this.Board = boardName;
    }
}
