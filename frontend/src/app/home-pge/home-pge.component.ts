import { Component } from '@angular/core';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-home-pge',
  imports: [ ],
  templateUrl: './home-pge.component.html',
  styleUrl: './home-pge.component.css'
})
export class HomePgeComponent {
  constructor(private router:Router){

  }
  homepage(){
    this.router.navigate(["/"])
  }

}
