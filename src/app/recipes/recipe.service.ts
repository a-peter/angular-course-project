import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Eierkuchen', 'Alles mixen und in der Pfanne backen.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png'),
    new Recipe('Reispfanne', 'Alles mixen und kochen.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/900px-JavaScript-logo.png')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
