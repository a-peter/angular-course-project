import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeListChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Eierkuchen',
      'Alles mixen und in der Pfanne backen.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png',
      [new Ingredient('Eier', 2), { name: 'Mehl', amount: 250 }]
    ),
    new Recipe(
      'Reispfanne',
      'Alles mixen und kochen.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/900px-JavaScript-logo.png',
      [new Ingredient('Reis', 200), { name: 'Hackfleisch', amount: 300 }]
    ),
  ];

  constructor(private shoppingList: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.notifyChange();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(newRecipe: Recipe) {
    const newIndex = this.recipes.push(newRecipe) - 1;
    this.notifyChange();
    return newIndex;
  }

  updateRecipe(updatedRecipe: Recipe, id: number) {
    this.recipes[id] = updatedRecipe;
    this.notifyChange();
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.notifyChange();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingList.addIngredients(ingredients);
  }

  notifyChange() {
    this.recipeListChanged.next(this.recipes.slice())
  }
}
