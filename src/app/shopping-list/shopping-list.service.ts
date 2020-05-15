import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  shoppingListChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  getShoppingList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    console.log('shopping-list.service is adding', ingredient.name, ingredient.amount);
    this.ingredients.push(ingredient);
    this.notifyChange();
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log('adding list of ', ingredients.length, 'items to shopping list');
    this.ingredients.push(...ingredients);
    this.notifyChange();
  }
  
  notifyChange() {
    this.shoppingListChanged.next(this.ingredients.slice());
  }
}
