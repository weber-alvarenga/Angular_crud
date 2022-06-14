import { Product } from "./../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {

  produto: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.recuperarProdutoPorId(id).subscribe((prod) => {
      this.produto = prod;
      console.log(this.produto.nome);
      console.log(this.produto.valor);
    });
  }

  public updateProduct(): void {
    this.productService.atualizarProduto(this.produto).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso.");
      this.router.navigate(["/products"]);
    });
  }

  public cancel(): void {
    this.router.navigate(["/products"]);
  }
}
