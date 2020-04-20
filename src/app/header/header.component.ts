import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() navigation = new EventEmitter<number>();

  onRecipesClicked() {
    console.log('Recipes clicked');
    this.navigation.emit(0);
  }

  onShoppingListClicked() {
    console.log('Shopping List clicked');
    this.navigation.emit(1);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
