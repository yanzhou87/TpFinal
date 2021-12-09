import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorielRoutingModule } from './tutoriel-routing.module';
import { T1Component } from './t1/t1.component';
import { T2Component } from './t2/t2.component';
import { T3Component } from './t3/t3.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    T1Component,
    T2Component,
    T3Component
  ],
  imports: [
    CommonModule,
    TutorielRoutingModule,
    MatDividerModule,
    MatListModule,
    MatIconModule
  ]
})
export class TutorielModule { }
