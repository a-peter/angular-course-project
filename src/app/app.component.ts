import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipes: boolean = true;

  onNavigation(feature: string) {
    console.log('app.component: navigation event received', feature);
    this.showRecipes = feature === 'recipe';
  }
}
