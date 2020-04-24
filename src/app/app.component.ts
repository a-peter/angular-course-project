import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onNavigation(feature: string) {
    console.log('app.component: navigation event received', feature);
  }
}
