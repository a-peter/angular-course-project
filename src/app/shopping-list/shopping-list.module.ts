import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

// ------------------------------------
// Routing section

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];

// ------------------------------------
// Module section
@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  exports: [ShoppingEditComponent, ShoppingListComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AppShoppingListModule {}
