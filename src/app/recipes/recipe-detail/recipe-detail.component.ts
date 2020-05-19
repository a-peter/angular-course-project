import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingListClicked() {
    console.log('Adding ingredients to shopping list');
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    // Diese Variante würde reichen. Dann kann auf 
    // das Speichern der ID in der Komponente 
    // verzichtet werden.
    this.router.navigate(['edit'], {relativeTo: this.route});

    // Beispiel, um eine komplexere Navigation zu demonstrieren.
    // In diesem Beispiel, mit diesen Routen, ist
    // das so nicht notwendig.
    // this.router.navigate(['..', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    if (confirm('Do you really want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
}
