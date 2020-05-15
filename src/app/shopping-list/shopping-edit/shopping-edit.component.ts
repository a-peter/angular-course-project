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
  editItem: Ingredient;

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
        this.editItem = this.shoppingListService.getIngredient(index);
        this.amountForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });

        // This would work too. But should not be done.
        // When the format of Ingredient changes, this code
        // might break!!!
        // this.amountForm.setValue(this.editItem);
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
    this.amountForm.reset();
  }

  onDeleteItem() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
      this.amountForm.reset();
      this.editItemIndex = -1;
      this.editItem = null;
      this.editMode = false;
    }
  }

  onClear() {
    this.amountForm.reset();
    this.editMode = false;
  }

  logForm() {
    console.log(this.amountForm);
  }
}
