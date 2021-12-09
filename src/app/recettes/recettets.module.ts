import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecettesComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { RecipeDetalsComponent } from './components/recipe-detals/recipe-detals.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { RecipeService } from './services/recipe.service';
import { SwearingFilter } from './misc/swearing.pipe';
import { AppRoutingModule } from './app-routing.module';
import { ConnecterComponent } from './components/connecter/connecter.component';

@NgModule({
  declarations: [
    RecettesComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    RecipeDetalsComponent,
    EditNewRecipeComponent,
    SwearingFilter,
    ConnecterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RecipeService],
  bootstrap: [RecettesComponent]
})
export class RecetteModule { }
