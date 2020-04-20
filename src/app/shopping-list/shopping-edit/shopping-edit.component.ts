import { Component, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
    name = 'ShoppingEditComponent';

    @Output() ingredientAdded = new EventEmitter<Ingredient>(); // oder:
    // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

    @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
    @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

    onAddItem() {
        const nameValue = this.nameInput.nativeElement.value;
        const amountValue = this.amountInput.nativeElement.value;
        console.log('Add item', nameValue, amountValue);
        this.ingredientAdded.emit(new Ingredient(nameValue, amountValue));
    }
}