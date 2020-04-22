import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingList.shoppingListChanged.subscribe(this.onShoppingListChanged);
    this.ingredients = this.shoppingList.getShoppingList();
    // this.onShoppingListChanged();
  }
  
  onShoppingListChanged() {
    // console.log(this.shoppingList);
    // console.log(this.shoppingList.getShoppingList());
    // this.ingredients = this.shoppingList.getShoppingList();
  }

  onIngredientAdded(ingredient: Ingredient) {
    console.log('shopping-list wants to add', ingredient.name, ingredient.amount);
    this.shoppingList.addIngredient(ingredient);
  }
}
