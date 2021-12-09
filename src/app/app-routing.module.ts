import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { JeuxComponent } from './jeux/jeux.component';
import { RecettesComponent } from './recettes/app.component';
import { T1Component } from './tutoriel/t1/t1.component';
import { T2Component } from './tutoriel/t2/t2.component';
import { T3Component } from './tutoriel/t3/t3.component';
import { TutorielComponent } from './tutoriel/tutoriel.component';

const routes: Routes = [
  {path:'tutoriel', component:TutorielComponent, children:[
    {path:'t1',component: T1Component},
    {path:'t2',component: T2Component},
    {path:'t3',component: T3Component}
  ]},
  {path:'recettes', component:RecettesComponent},
  {path:'jeux', component:JeuxComponent},
  {path:'contact', component:ContactComponent},
  {path:'', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
