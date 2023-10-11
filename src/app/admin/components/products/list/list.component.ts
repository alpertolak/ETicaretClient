import { Dialog } from '@angular/cdk/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/List_product';
import { AdminAlertifyService, AlertifyMessageType, AlertifyPosition } from 'src/app/services/admin/admin-alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from '../../../../services/common/dialog.service';

//jquer tanımlaması
declare var $: any


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Stock', 'Price', 'CreatedDate', 'UpdatedDate',"Picture", "Edit", "Delete"];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AdminAlertifyService,
    private dialogService: DialogService  ) {
    super(spinner)
  }
  async getProducts() {

    this.showSpinner(SpinnerType.BallClipRotateMultiple)
    const allProducts: { totalCount: Number, products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallClipRotateMultiple), erorrMessage => this.alertifyService.message(erorrMessage, {
      dismissOthers: true,
      messageType: AlertifyMessageType.Error,
      Position: AlertifyPosition.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length = allProducts.totalCount.toString()
  }


  addProductImages(id:string){
    this.dialogService.openDialog({
      CompenentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
        }
      })
  }
  async PageChanged() {
    await this.getProducts()
  }

  async ngOnInit() {
    await this.getProducts()
  }

}
