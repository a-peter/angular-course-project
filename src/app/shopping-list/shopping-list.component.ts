import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shoppingListChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

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
    this.shoppingListChangedSubscription = this.shoppingListService.shoppingListChanged.subscribe(
      this.onShoppingListChanged.bind(this)
    );
    this.onShoppingListChanged(this.shoppingListService.getShoppingList());
  }

  ngOnDestroy() {
    this.shoppingListChangedSubscription.unsubscribe();
  }

  onShoppingListChanged(newIngredients: Ingredient[]) {
    console.log('onShoppingListChanged');
    this.ingredients = newIngredients;
  }

  onEditItem(i: number) {
    // console.log('Clicked item', i, this.ingredients[i]);
    this.shoppingListService.startedEditing.next(i);
  }
}
