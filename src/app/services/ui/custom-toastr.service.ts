import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  messeage(message: string, title: string,ToastrOptions:Partial<ToastrOptions>) {
    this.toastr[ToastrOptions.messageType](message, title,{
      positionClass:ToastrOptions.position //gelen position değeri json objesi olarka parametre veriliyor.
    });
  }
}

export class ToastrOptions{
  messageType: ToastrMesseageType;
  position:ToastrPositon
   
}

export enum ToastrMesseageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
export enum ToastrPositon {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center",
}
