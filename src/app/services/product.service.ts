import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';
import { product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private baseUrl = enviroment.baseApiUrl;
  constructor(private http: HttpClient) { 

  }

  getAllProducts(): Observable<product[]>{
    return this.http.get<product[]>(`${this.baseUrl}Products/GetProduct`);
  }

  addProduct(product: product){
    return this.http.post(`${this.baseUrl}Products/AddProduct`,product);
  }

  updateProduct(id: number, product:product){
    return this.http.put(`${this.baseUrl}Products/EditProduct/${id}`,product)
  }
}
