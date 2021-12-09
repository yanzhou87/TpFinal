import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recettes/model/recipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent {

  @Input()
  recipe!: Recipe;

  @Output()
  recipeClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  userClickedOnRecipe(): void {
    this.recipeClicked.emit(this.recipe.id);
  }

  imagePath(): string {
    console.log(this.recipe);

    if (this.recipe.cover_photo) {
      console.log(this.recipe.cover_photo);
      return environment.serveur + '/images/' + this.recipe.cover_photo;
    } else {
      return '/assets/emptybowl.jpg';
    }
  }

}
