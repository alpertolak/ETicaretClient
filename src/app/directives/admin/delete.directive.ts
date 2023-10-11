import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AdminAlertifyService, AlertifyMessageType, AlertifyPosition } from 'src/app/services/admin/admin-alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DialogService } from '../../services/common/dialog.service';


declare var $: any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private httpclientService: HttpClientService,
    public dialog: MatDialog,
    private alertify: AdminAlertifyService,
    private dialogService: DialogService,
  ) {
    const img = _renderer.createElement("img")
    img.setAttribute("src", "../../../../../assets/Delete_icon.png")
    img.setAttribute("style", "cursor: pointer;")
    img.width = 30
    img.height = 30
    _renderer.appendChild(element.nativeElement, img)
  }

  //table'dan gelen id değeri
  @Input() id: string;
  @Input() controlller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onclick() {

    this.dialogService.openDialog({
      CompenentType: DeleteDialogComponent,
      data: DeleteState.yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallClipRotateMultiple)

        const td: HTMLTableCellElement = this.element.nativeElement

        await this.httpclientService.Delete({
          controller: this.controlller
        }, this.id)
          .subscribe(data => {
            $(td.parentElement)
              .animate({
                opacity: 0,
                left: "+=50",
                height: "toogle",
              }, 300, () => {
                this.callback.emit()
                this.alertify.message("Silme işlemi başarlı", {
                  dismissOthers: true,
                  messageType: AlertifyMessageType.Success,
                  Position: AlertifyPosition.TopRight,
                })
              })
          }, (errorResponse: HttpErrorResponse) => {

            this.spinner.hide(SpinnerType.BallClipRotateMultiple)

            this.alertify.message("Silm işlemi sırasında bir hata oluştu", {
              dismissOthers: true,
              messageType: AlertifyMessageType.Error,
              Position: AlertifyPosition.TopRight,
            })
          })
      }      
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.yes) {
        afterClosed();
      }
    });
  }

}




