import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
    // Possible. But in my opinion a duplication
    // of code.
    // this.ingredients = this.shoppingList.getShoppingList();
    // this.shoppingList.shoppingListChanged.subscribe(
    //   (newIngredients: Ingredient[]) => {
    //     this.ingredients = newIngredients;
    //   }
    // );

    // If you subscribe, don't forget to unsubscribe!
    this.subscription = this.shoppingList.shoppingListChanged.subscribe(this.onShoppingListChanged.bind(this));
    this.onShoppingListChanged(this.shoppingList.getShoppingList());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  onShoppingListChanged(newIngredients: Ingredient[]) {
    console.log('onShoppingListChanged');
    this.ingredients = newIngredients;
  }

}
