import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AdminAlertifyService {

  constructor() { }
  message(message: string, options:Partial<alertifyOptions>) {

    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.Position);
    const msj = alertify[options.messageType](message)
    //if(options.dismissOthers)
    //  msj.DissmissAll()
  }
}

export class alertifyOptions{
  messageType:AlertifyMessageType=AlertifyMessageType.Message;
  Position:AlertifyPosition=AlertifyPosition.bottomLeft;
  delay:number=3;
  dismissOthers:boolean=false;
}
export enum AlertifyMessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
export enum AlertifyPosition {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  bottomLeft = "bottom-left",
  bottomCenter = "bottom-center",
  BottomRight = "bottom-right",
}
