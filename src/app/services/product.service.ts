import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/data.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  url  = 'http://localhost:8080/api/products';

  //Inyectar el servicio HttpClient en el constructor
  constructor(private http: HttpClient) { }

  findAll(): Product[]{
    return products;
  }

  findAllProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.url);
   
  }
}
