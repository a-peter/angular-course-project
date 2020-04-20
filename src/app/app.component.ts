import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipes: boolean = true;
  onNavigation(target: number) {
    console.log('app.component: navigation event received', target);
    this.showRecipes = target == 0;
  }
}
