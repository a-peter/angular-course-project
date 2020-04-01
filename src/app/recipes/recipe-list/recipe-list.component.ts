import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  items: RecipeItemComponent[] = [];

  constructor() { 
    this.items.push(new RecipeItemComponent);
    this.items.push(new RecipeItemComponent);
  }

  ngOnInit(): void {
  }

}
