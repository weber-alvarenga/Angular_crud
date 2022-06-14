import { Product } from './../product.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  produto: Product = {
    nome: '',
    valor: null
  }

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }
  
  public createProduct(): void {
    this.productService.inserirProduto(this.produto).subscribe(() => {
      this.productService.showMessage('Operação executada com sucesso.');
      this.router.navigate(['/products']);
    })
  }

  public cancel(): void {
    this.router.navigate(['/products']);
  }

}
