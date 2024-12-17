import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  products!: Product[];

  //products: Product[] = [];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService) { }
  
  ngOnInit(): void {
      
    this.products = this.productService.findAll();
    
    /*

    this.productService.findAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error(error);
      }
    );
    */


  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
