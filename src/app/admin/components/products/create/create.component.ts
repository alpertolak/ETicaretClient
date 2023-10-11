import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AdminAlertifyService, AlertifyMessageType, AlertifyPosition } from 'src/app/services/admin/admin-alertify.service';
import { fileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AdminAlertifyService) {
    super(spinner);
  }

  //dışarı çıkış yapılan değişkenler.
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter()
  

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {

    this.showSpinner(SpinnerType.BallScaleRipple);

    const create_product: Create_Product = new Create_Product()
    create_product.Name = name.value;
    create_product.Stock = parseInt(stock.value);
    create_product.Price = parseFloat(price.value);

    this.productService.create(create_product, () => {

      this.hideSpinner(SpinnerType.BallScaleRipple);
      this.alertify.message("kayıt işlemi başarılı.", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        Position: AlertifyPosition.TopRight
      });

      this.createdProduct.emit(create_product)

    }, errorMessage => {
      this.alertify.message(errorMessage, {
        messageType: AlertifyMessageType.Error,
        Position: AlertifyPosition.TopRight
      })
    });
  }
}
