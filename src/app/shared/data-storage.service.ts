import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private serverRoot = 'https://ng-course-recipe-book-82868.firebaseio.com/';
  private putUrl = this.serverRoot + 'recipes.json'

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(
      this.putUrl,
      recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
