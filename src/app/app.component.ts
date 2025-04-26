import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { AnimalsComponent } from "./animals/animals.component";
import { HealthComponent } from "./health/health.component";
import { ReproducctionComponent } from "./reproducction/reproducction.component";
import { LoginComponent } from "./login/login.component";
import { FirebaseService } from './services/firebase.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, AnimalsComponent, HealthComponent, ReproducctionComponent, LoginComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
    Board='';
    login = false;
    constructor(private firabaseService: FirebaseService, private messageService: MessageService){

      this.firabaseService.auth.onAuthStateChanged((user)=>{
        this.login = !!user;
        console.log(`Estado del login: ${this.login}`);
      });
    }

    messageSuccessAddBovine(event: {severity: string, summary: string, detail: string}){
      this.messageService.add({
        severity: event.severity,
        summary: event.summary,
        detail: event.detail});
    }

    getBoard(boardName: string){
      this.Board = boardName;
    }
}
