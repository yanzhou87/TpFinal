import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecettesComponent } from './app.component';
import { ConnecterComponent } from './components/connecter/connecter.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { RecipeDetalsComponent } from './components/recipe-detals/recipe-detals.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: 'editnewrecipe',
    component: EditNewRecipeComponent
  },
  {
    path: 'editnewrecipe/:recipe_id',
    component: EditNewRecipeComponent
  },
  {
    path: 'recipes',
    component: RecipeListComponent
  },
  {
    path: 'recipes/:recipe_id',
    component: RecipeDetalsComponent
  },
  {
    path: 'connecter',
    component: ConnecterComponent
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
