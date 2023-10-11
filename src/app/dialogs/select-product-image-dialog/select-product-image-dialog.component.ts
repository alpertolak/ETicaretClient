import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectTrigger } from '@angular/material/select';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { List_Product_Image } from '../../contracts/List_product_image';
import { DialogService } from '../../services/common/dialog.service';
import { fileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';
import { BaseDialog } from '../Base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private dialogService:DialogService)
    {
    super(dialogRef)
  }

  @Output() options: Partial<fileUploadOptions> = {
    controller: "products",
    action: "upload",
    explanation: "ürün görsellerini sürükleyebilir veya seçebilirsiniz",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg, .gif",
    queryString: `id=${this.data}`,
  };

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallScaleMultiple)
    this.images = await this.productService.readImage(this.data as string, () => { this.spinner.hide(SpinnerType.BallScaleMultiple) });
  }

  async deleteImage(imageId: string , event:any) {

      this.dialogService.openDialog({
        CompenentType: DeleteDialogComponent,
        data: DeleteState.yes,
        afterClosed: async () => {

          this.spinner.show(SpinnerType.BallClipRotateMultiple)
          await this.productService.deleteImage(this.data as string, imageId, () => {

          this.spinner.hide(SpinnerType.BallClipRotateMultiple)
          var card = $(event.srcElement).parent().parent()
          debugger
          card.fadeOut(500)})
        }
      })
  }
}

export enum SelectProductImageState {
  Close
}
