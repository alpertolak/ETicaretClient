import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './components/baskets/baskets.module';
import { CompenentsModule } from '../admin/layout/compenents/compenents.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompenentsModule
  ]
})
export class UiModule { }
