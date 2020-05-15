import { Component } from "@angular/core";
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
    name = 'ShoppingEditComponent';

    // @Output() ingredientAdded = new EventEmitter<Ingredient>(); // oder:
    // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

    constructor(private shoppingList: ShoppingListService) {}

    onAddItem(form: NgForm) {
        const formValues = form.value ;
        const newIngredient = new Ingredient(formValues.name, formValues.amount);
        console.log('shopping-edit: Add item', newIngredient);
        this.shoppingList.addIngredient(newIngredient);
    }
}