import { Component, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
    name = 'ShoppingEditComponent';

    // @Output() ingredientAdded = new EventEmitter<Ingredient>(); // oder:
    // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

    @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
    @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

    constructor(private shoppingList: ShoppingListService) {}

    onAddItem() {
        const nameValue = this.nameInput.nativeElement.value;
        const amountValue = this.amountInput.nativeElement.value;
        console.log('shopping-edit: Add item', nameValue, amountValue);
        this.shoppingList.addIngredient(new Ingredient(nameValue, amountValue));
    }
}