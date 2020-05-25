import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      console.log('resolving', route, state);
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
