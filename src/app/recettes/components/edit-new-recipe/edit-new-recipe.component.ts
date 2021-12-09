import { Component, OnInit } from '@angular/core';

import { Recipe } from 'src/app/recettes/model/recipe';
import { Ingredient, RecipePayload, Identification } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { partitionArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_loaded!: boolean;
  load_error!: any;

  recipe_in_progress: Recipe;

  cover_photo_for_viewing: any = '/assets/emptybowl.jpg';
  cover_photo_for_upload!: File;

  instruction_photos_for_viewing: any[];
  instruction_photos_for_upload: File[];

  compte:string ="";
  error!:string; 

  monCompte!:Identification;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipe_service: RecipeService) {
    this.recipe_in_progress = Recipe.createBlank();

    this.instruction_photos_for_viewing = [];
    this.instruction_photos_for_upload = [];
  }

  ngOnInit(): void {

    //Verifie si token exist?
    
    this.recipe_service.getConnecter().subscribe({
     next:(para)=>{
       this.compte = para.data;
       console.log("compte  " , this.compte);
       this.error = para.error;
       
   
  // Si token est undefined va vers /connected

   if(this.compte == ""){
     this.router.navigate(['/connecter']);
   }else{
   
    this.route.paramMap.subscribe((params: ParamMap) => {
      const my_recipe_id = params.get('recipe_id');

      if ( my_recipe_id === null ) {
        this.recipe_loaded = true;
        return;
      }

      const recipe_id = parseInt(my_recipe_id, 10);
      console.log(recipe_id);
      if (isNaN(recipe_id)) {
        this.recipe_loaded = true;
        return;
      }

      this.recipe_service.getRecipeById(recipe_id)
        .subscribe(
          {
            next: (recipepayload) => {
              this.recipe_in_progress = recipepayload.data;
              this.recipe_loaded = true;
  
              console.log(recipepayload.error);
            },
            error: (error) => {
              this.load_error = error;
              console.log(JSON.stringify(error, null, 2));
            }
          }
          
          
        );
    });
  }

},
error:(error)=>{
  
 this.router.navigate(['/connecter']);
 console.log("Erreur  ", error);
 this.error = error;
}
});
  ///////////
  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [{ ingredient: null, measure: null }];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null });
    }
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [{ instruction: null, photo: null }];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
    }
  }

  removeIngredientAtIndex(i: number): void {
    this.recipe_in_progress.ingredients.splice(i, 1);
  }

  removeInstructionAtIndex(i: number): void {
    this.recipe_in_progress.instructions.splice(i, 1);
  }

  readUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.cover_photo_for_viewing = reader.result;
        this.recipe_in_progress.cover_photo = null;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.cover_photo_for_upload = event.target.files[0];
    }
  }

  readInstUrl(i: number, event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.instruction_photos_for_viewing[i] = reader.result;
        this.recipe_in_progress.instructions[i].photo = null;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.instruction_photos_for_upload[i] = event.target.files[0];
    }
  }

  addRecipeClicked(): void {
    console.log(this.recipe_in_progress);
    if (this.recipe_in_progress.id == -1) {
      this.recipe_service.addRecipe(this.recipe_in_progress, {
        cover_photo: this.cover_photo_for_upload,
        instruction_photos: this.instruction_photos_for_upload,
      })
        .subscribe((recipe: Recipe) => {
          this.router.navigate(['/recipes', recipe.id]);
        });
    } else {
      this.recipe_service.updateRecipe(this.recipe_in_progress, {
        cover_photo: this.cover_photo_for_upload,
        instruction_photos: this.instruction_photos_for_upload,
      })
        .subscribe((recipepayload: RecipePayload) => {
          this.router.navigate(['/recipes', recipepayload.data.id]);
        });
    }
  }

  coverPhotoPath(): string {
    if (this.recipe_in_progress.cover_photo) {
      return environment.serveur + '/images/' + this.recipe_in_progress.cover_photo;
    } else if (this.cover_photo_for_viewing) {
      return this.cover_photo_for_viewing;
    } else {
      return '/assets/emptybowl.jpg';
    }
  }

  instructionPhotoPath(i: number): string {
    if (this.recipe_in_progress.instructions[i].photo) {
      return environment.serveur + '/images/' + this.recipe_in_progress.instructions[i].photo;
    } else if (this.instruction_photos_for_viewing[i]) {
      return this.instruction_photos_for_viewing[i];
    }

    return '';
  }
  
}
