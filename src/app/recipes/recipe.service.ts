import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Eierkuchen',
      'Alles mixen und in der Pfanne backen.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png',
      [
        new Ingredient('Eier',2 ),
        { name: 'Mehl', amount: 250 },
      ]
    ),
    new Recipe(
      'Reispfanne',
      'Alles mixen und kochen.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/900px-JavaScript-logo.png',
      [
        new Ingredient( 'Reis', 200 ),
        { name: 'Hackfleisch', amount: 300 },
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() {}
}
