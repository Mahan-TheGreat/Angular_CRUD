import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';
import { postProduct } from '../interface/postProduct';
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

  addProduct(product: postProduct){
    return this.http.post(`${this.baseUrl}Products/AddProduct`,product);
  }

  updateProduct(id: number, product:postProduct){
    return this.http.put(`${this.baseUrl}Products/EditProduct/${id}`,product)
  }

  disableProduct(id: number){
    return this.http.put(`${this.baseUrl}Products/DisableProduct/${id}`,null)
  }

  enableProduct(id: number){
    return this.http.put(`${this.baseUrl}Products/EnableProduct/${id}`,null)
  }
}
