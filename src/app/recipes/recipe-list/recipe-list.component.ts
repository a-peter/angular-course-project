import { Component, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeItemComponent[] = [];

  constructor() { 
    this.recipes.push(new RecipeItemComponent);
    this.recipes.push(new RecipeItemComponent);
  }

  ngOnInit(): void {
  }

}
