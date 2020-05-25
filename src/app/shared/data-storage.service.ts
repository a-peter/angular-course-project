import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private serverRoot = 'https://ng-course-recipe-book-82868.firebaseio.com/';
  private recipesUrl = this.serverRoot + 'recipes.json'

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(
      this.recipesUrl,
      recipes
    ).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  fetchRecipes() {
    this.http
    .get<Recipe[]>(
      this.recipesUrl,
      {params: new HttpParams().set('print', 'pretty')}
    )
    .pipe(map(
      recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }
    ))
    .subscribe(
      recipes => {
        console.log('Fetched', recipes);
        this.recipeService.setRecipes(recipes);
      },
      error => {
        console.error('Error', error);
      }
    )
  }
}
