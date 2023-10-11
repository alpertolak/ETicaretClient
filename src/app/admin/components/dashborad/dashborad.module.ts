import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboradComponent } from './dashborad.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboradComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:DashboradModule}
    ])
  ]
})
export class DashboradModule { }
