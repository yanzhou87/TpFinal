import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { T1Component } from './t1/t1.component';
import { T2Component } from './t2/t2.component';
import { T3Component } from './t3/t3.component';
import { TutorielComponent } from './tutoriel.component';

const routes: Routes = [
  {path:'tutoriel', component:TutorielComponent,children:[
    {path:'t1', component:T1Component},
    {path:'t2', component:T2Component},
    {path:'t3', component:T3Component}
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorielRoutingModule { }
