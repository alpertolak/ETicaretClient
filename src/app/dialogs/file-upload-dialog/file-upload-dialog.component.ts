import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../Base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent>{

  constructor(
   dialogRef: MatDialogRef<FileUploadDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogComponent) {
    super(dialogRef)
  }
}

export enum fileUploadDialogState{
  yes, no
}
