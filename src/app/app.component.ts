import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { AnimalsComponent } from "./animals/animals.component";
import { HealthComponent } from "./health/health.component";
import { ReproducctionComponent } from "./reproducction/reproducction.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, AnimalsComponent, HealthComponent,ReproducctionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mainVacaData';
}
