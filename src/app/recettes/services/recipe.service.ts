import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Recipe, RecipesPayload, RecipePayload, DeleteRecipePayload, Identification } from '../model/recipe';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  httpOptions: object;
  token!: string;
  
  monCompte !:Identification;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllRecipes(): Observable<RecipesPayload> {
    return this.http.get<RecipesPayload>(environment.serveur + '/v1/recipes.json')
      .pipe(catchError(this.handleError));

  }

  getRecipeById(recipe_id: number): Observable<RecipePayload> {
    if (recipe_id === undefined) {
      console.log('ACK! That\'s an error!');
      return new Observable<RecipePayload>();
    }

    return this.http.get<RecipePayload>(environment.serveur + '/v1/recipes/' + recipe_id + '.json')
      .pipe(catchError(this.handleError));
  }

  // PUT ... add the new recipe
  // POST ... we update the media for the recipe.
  addRecipe(recipe: Recipe, files: any): Observable<Recipe> {
    console.log(JSON.stringify(files, null, 2));
    return new Observable<Recipe>((outer_observable) => {
      this.http.put<RecipePayload>(environment.serveur + '/v1/recipes.json', recipe, this.httpOptions)
        .subscribe((recipepayload) => {
          console.log(JSON.stringify(recipepayload, null, 2));

          const final_recipe: Recipe = recipepayload.data;
          const formData: FormData = new FormData();
          let have_image = false;

          if (files['cover_photo']) {
            const file: File = files['cover_photo'];
            formData.append('cover_photo', file, file.name);
            have_image = true;
          }
          if (files['instruction_photos']) {
            for (let i = 0; i < files['instruction_photos'].length; i++) {
              if (files['instruction_photos'][i]) {
                const file: File = files['instruction_photos'][i];
                formData.append('preparation_photos_' + i, file, file.name);
                have_image = true;
              }
            }
          }

          if (!have_image) {
            outer_observable.next(final_recipe);
            outer_observable.complete();
            return;
          }

          this.http.post<Recipe>(environment.serveur + `/v1/recipes/${final_recipe.id}/images`, formData)
            .subscribe((sth) => {
              console.log(JSON.stringify(sth, null, 2));
              console.log(JSON.stringify(final_recipe, null, 2));
              outer_observable.next(final_recipe);
              outer_observable.complete();
            });
        });

    });
  }

  // PUT ... add the new recipe
  // POST ... we update the media for the recipe.
  updateRecipe(recipe: Recipe, files: any): Observable<RecipePayload> {
    if (recipe.id === -1) { console.log("THIS IS REALLY BAD"); }

    console.log(JSON.stringify(files, null, 2));

    const formData: FormData = new FormData();
    let have_image = false;

    if (files['cover_photo']) {
      const file: File = files['cover_photo'];
      formData.append('cover_photo', file, file.name);
      have_image = true;
    }
    if (files['instruction_photos']) {
      for (let i = 0; i < files['instruction_photos'].length; i++) {
        if (files['instruction_photos'][i]) {
          const file: File = files['instruction_photos'][i];
          formData.append('preparation_photos_' + i, file, file.name);
          have_image = true;
        }
      }
    }

    formData.append('recipe', JSON.stringify(recipe));
    return this.http.post<RecipePayload>(environment.serveur + `/v1/recipes/${recipe.id}/images`, formData)
               .pipe(catchError(this.handleError));
  }

  deleteRecipeById(recipe_id: number) {
    if (recipe_id === undefined) {
      console.log('ACK! That\'s an error!');
      return;
    }

    return this.http.delete<DeleteRecipePayload>(environment.serveur + '/v1/recipes/' + recipe_id + '.json')
      .pipe(catchError(this.handleError));

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(JSON.stringify(error, null, 2) +
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }

  connecter(name:string, password:string):Observable<Identification>{
    return this.http.post<Identification>(environment.serveur + '/v1/token', {username:name,password:password},this.httpOptions);
  }
  
  setToken(token:string):void{
    this.token = token;
  }
  getConnecter():Observable<Identification>{
  
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      }),
    };
  
    return this.http.get<Identification>(environment.serveur + '/v1/secret',this.httpOptions);
  }
}
