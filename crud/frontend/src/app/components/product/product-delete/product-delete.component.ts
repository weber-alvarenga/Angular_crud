import { Product } from './../product.model';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})

export class ProductDeleteComponent implements OnInit {

  //produto: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.excluirProduto(id).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso.');
      this.router.navigate(['/products']);
    })
  }
}
