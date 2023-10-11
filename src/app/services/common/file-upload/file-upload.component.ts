import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AdminAlertifyService, AlertifyMessageType, AlertifyPosition, alertifyOptions } from '../../admin/admin-alertify.service';
import { CustomToastrService, ToastrMesseageType, ToastrPositon } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, fileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AdminAlertifyService,
    private toastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogSercvice: DialogService,
    private spinner: NgxSpinnerService,
  ) { }

  public files: NgxFileDropEntry[];
  
  @Input() options: Partial<fileUploadOptions>

  public SelectedFiles(files: NgxFileDropEntry[]) {
  
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }
    this.dialogSercvice.openDialog({
      CompenentType: FileUploadDialogComponent,
      data: fileUploadDialogState.yes,
      afterClosed: () => {

        this.spinner.show(SpinnerType.BallClipRotateMultiple);

        this.httpClientService.Post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const successMessage: string = "yükleme işlemi başarılı"

          this.spinner.hide(SpinnerType.BallClipRotateMultiple);

          if (this.options.isAdminPage) {
            this.alertifyService.message(successMessage, {
              dismissOthers: true,
              messageType: AlertifyMessageType.Success,
              Position: AlertifyPosition.TopRight
            })
          } else {
            this.toastrService.messeage(successMessage, "başarılı", {
              messageType: ToastrMesseageType.Success,
              position: ToastrPositon.TopRight
            })
          }
        }, (errorResponse: HttpErrorResponse) => {

          const failedMessage: string = "dosya yüklenirken bir hata oluştu"

          this.spinner.hide(SpinnerType.BallClipRotateMultiple);

          if (this.options.isAdminPage) {
            this.alertifyService.message(failedMessage, {
              dismissOthers: true,
              messageType: AlertifyMessageType.Error,
              Position: AlertifyPosition.TopRight
            })
          } else {
            this.toastrService.messeage(failedMessage, "Başarısız", {
              messageType: ToastrMesseageType.Error,
              position: ToastrPositon.TopRight
            })
          }
        })
      }
    })
  }
}
export class fileUploadOptions {
  controller?: string
  action?: string
  queryString?: string
  explanation?: string
  accept?: string
  isAdminPage?: boolean = false
}
