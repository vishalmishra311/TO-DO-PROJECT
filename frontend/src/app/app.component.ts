import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomePgeComponent } from "./home-pge/home-pge.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
