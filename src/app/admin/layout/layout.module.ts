import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CompenentsModule } from './compenents/compenents.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CompenentsModule,
    RouterModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  exports: [
    LayoutComponent
    
  ]
})
export class LayoutModule { }
