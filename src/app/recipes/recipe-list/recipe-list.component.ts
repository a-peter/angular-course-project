import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Eierkuchen', 'Alles mixen und in der Pfanne backen.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png'),
    new Recipe('Reispfanne', 'Alles mixen und kochen.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  selectedRecipe: Recipe = this.recipes[0];

  constructor() { 
  }

  ngOnInit(): void {
  }

  doIt(recipe: Recipe) {
    console.log("recipe clicked", recipe.name);
    this.selectedRecipe = recipe;
    this.recipeSelected.emit(recipe);
  }
}
