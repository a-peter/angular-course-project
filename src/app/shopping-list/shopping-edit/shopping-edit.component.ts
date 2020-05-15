import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  name = 'ShoppingEditComponent';
  private shoppingListEditingSubscription: Subscription;
  editMode = false;
  editItemIndex: number;

  @ViewChild('f', { static: false }) amountForm: NgForm;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>(); // oder:
  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingListEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        console.log('Editing', index);
        this.editMode = true;
        this.editItemIndex = index;
        const item = this.shoppingListService.getShoppingList()[index];
        this.amountForm.setValue({
          name: item.name,
          amount: item.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.shoppingListEditingSubscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const formValues = form.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    console.log('shopping-edit: Add item', newIngredient);
    this.shoppingListService.addIngredient(newIngredient);
  }

  logForm() {
    console.log(this.amountForm);
  }
}
