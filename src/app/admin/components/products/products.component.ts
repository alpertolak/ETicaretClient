
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {

  }

  @ViewChild(ListComponent) listComponents: ListComponent

  createdProduct(Create_Product: Create_Product) {
    this.listComponents.getProducts();
  }
}

