import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
    constructor(private Spinner:NgxSpinnerService){ }

    showSpinner(SpinnerNameType:SpinnerType){
      this.Spinner.show(SpinnerNameType); //spinner nesnesi açılıyor.

      //setTimeout(() => this.Spinner.hide(SpinnerNameType), 1000) //açık olan spinner nesnesini 3 saniye sonra kapatıyor (geçici olarak kullanılacak )
    }

    hideSpinner(SpinnerNameType:SpinnerType){
      this.Spinner.hide(SpinnerNameType); //açık olan spinner nesnesi kapatılıyor.
    }
}

export enum SpinnerType {
  BallClipRotateMultiple = "s1",
  BallScaleRipple = "s2",
  BallScaleMultiple = "s3"
}
