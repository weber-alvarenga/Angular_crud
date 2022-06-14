import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlBase = "http://localhost:3001/produtos";

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  public showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  public inserirProduto(produto: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.urlBase, produto);
  }

  public listarProdutos(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.urlBase);
  }

  public recuperarProdutoPorId(id : string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.urlBase}/${id}`);
  }

  public atualizarProduto(produto : Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.urlBase}/${produto.id}`, produto);
  }

  public excluirProduto(id : string): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.urlBase}/${id}`);
  }

}
