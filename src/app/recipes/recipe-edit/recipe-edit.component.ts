import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  controlName = 'name';
  controlImageUrl = 'imageUrl';
  controlDescription = 'description';
  controlIngredients = 'ingredients';

  // This block for table of ingredients
  ingredientHeaders = ['Name', 'Amount'];
  ingredients: Ingredient[] = [];
  columnNames = ['name', 'amount'];
  // block end

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value[this.controlName],
      this.recipeForm.value[this.controlDescription],
      this.recipeForm.value[this.controlImageUrl],
      this.recipeForm.value[this.controlIngredients]
    );
    // If the name of the controls and the name of the
    // model does NOT FIT, a method like
    // ingredientsFromForm would create a copy.

    if (this.editMode) {
      this.recipeService.updateRecipe(recipe, this.id);
      this.navigateUp();
    } else {
      this.id = this.recipeService.addRecipe(recipe);
      this.router.navigate(['..', +this.id], { relativeTo: this.route });
      this.editMode = false;
    }
  }

  onCancel() {
    if (this.recipeForm.dirty) {
      if (!confirm('You have changed the recipe. Discard changes?')) {
        return;
      }
    }
    this.navigateUp();
  }

  navigateUp() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // ingredientsFromForm(): Ingredient[] {
  //   let ingredients: Ingredient[] = [];
  //   const ing = <FormArray>this.recipeForm.get(this.controlIngredients);
  //   for (let i = 0; i < ing.length; i++) {
  //     ingredients.push(new Ingredient(
  //       ing.get([i]).value.name,
  //       ing.get([i]).value.amount
  //     ))
  //   }
  //   return ingredients;
  // }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      this.ingredients = recipe.ingredients;
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.createIngredientControl(ingredient.name, ingredient.amount)
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      [this.controlName]: new FormControl(
        recipeName,
        Validators.required,
        null
      ),
      [this.controlImageUrl]: new FormControl(
        recipeImagePath,
        Validators.required,
        null
      ),
      [this.controlDescription]: new FormControl(
        recipeDescription,
        Validators.required,
        null
      ),
      [this.controlIngredients]: recipeIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get(this.controlIngredients)).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get(this.controlIngredients)).push(
      this.createIngredientControl('', null)
    );
  }

  onRemoveIngredient(id: number) {
    (<FormArray>this.recipeForm.get(this.controlIngredients)).removeAt(id);
  }

  /**
   * Returns a FormGroup containing elements for
   * name and amount.
   * @param iName - Optional name of the new ingredient
   * @param iAmount - Optional amount of the new ingredient
   */
  createIngredientControl(iName: String, iAmount: number): FormGroup {
    return new FormGroup({
      name: new FormControl(iName, Validators.required),
      amount: new FormControl(iAmount, [
        Validators.required,
        Validators.pattern(/^[1-9]+\d*$/),
      ]),
    });
  }
}
