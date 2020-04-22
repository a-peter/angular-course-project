import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  shoppingListChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  getShoppingList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    console.log('shopping-list.service is adding', ingredient.name, ingredient.amount);
    this.ingredients.push(ingredient);
    this.shoppingListChanged.emit(this.ingredients.slice());
  }
}
