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
    new Recipe('Reispfanne', 'Alles mixen und kochen.', 'https://www.typescriptlang.org/icons/icon-96x96.png?v=e0cca9b778c3248c7434bc3c68c0e8b2')
  ];

  @Output() recipeSelectedComponent = new EventEmitter<Recipe>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    console.log("recipe-list received", recipe.name, ". emitting recipeSelectedComponent()");
    this.recipeSelectedComponent.emit(recipe);
  }
}
