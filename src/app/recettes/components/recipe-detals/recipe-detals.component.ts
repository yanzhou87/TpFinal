import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Location } from '@angular/common';

import { Recipe, RecipePayload } from 'src/app/recettes/model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-detals',
  templateUrl: './recipe-detals.component.html',
  styleUrls: ['./recipe-detals.component.css']
})
export class RecipeDetalsComponent implements OnInit {

  recipe_loaded!: boolean;
  load_error!: object;
  recipe!: Recipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private recipe_service: RecipeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const my_recipe_id = params.get('recipe_id');

      if (my_recipe_id !== null) {
        const recipe_id = parseInt(my_recipe_id, 10);

        this.recipe_service.getRecipeById(recipe_id)
          .subscribe(
            {
              next: (recipepayload) => {
                console.log(recipepayload.data);
                this.recipe = recipepayload.data;
                this.recipe_loaded = true;
    
                console.log(recipepayload.error);
              },
              error: (error) => {
                this.load_error = error;
                console.log(JSON.stringify(error, null, 2));
              }
            }
          );
        }
      });
  }

  goBackButtonClicked(): void {
    this.location.back();
  }

  coverPhotoPath(): string {
    if (this.recipe.cover_photo) {
      return environment.serveur + '/images/' + this.recipe.cover_photo;
    } else {
      return '/assets/emptybowl.jpg';
    }
  }

  instructionPhotoPath(i: number): string {
    if (this.recipe.instructions[i].photo) {
      return environment.serveur + '/images/' + this.recipe.instructions[i].photo;
    }

    return '';
  }

  deleteThisRecipe(): void {
    if (confirm('Are you sure you want to delete this recipe? This cannot be undone!')) {
      if (this.recipe_service) {
        this.recipe_service.deleteRecipeById(this.recipe.id)?.subscribe(
          {
            next: (deleterecipepayload) => {
              this.router.navigate(['/recipes']);
            },
            error: (error) => {
              this.load_error = error;
              console.log(JSON.stringify(error, null, 2));
            }
          }
        );
      }
    }
  }

}
