import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { AnimalsComponent } from "./animals/animals.component";
import { HealthComponent } from "./health/health.component";
import { ReproducctionComponent } from "./reproducction/reproducction.component";
import { LoginComponent } from "./login/login.component";
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, AnimalsComponent, HealthComponent, ReproducctionComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    Board='';
    login = false;
    constructor(private firabaseService: FirebaseService){

      this.firabaseService.auth.onAuthStateChanged((user)=>{
        this.login = !!user;
        console.log(`Estado del login: ${this.login}`);
      });
    }

    getBoard(boardName: string){
      this.Board = boardName;
    }
}
