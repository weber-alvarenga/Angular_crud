import { Product } from './../product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductReadSchemaDataSource } from './product-read-schema-datasource';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read-schema',
  templateUrl: './product-read-schema.component.html',
  styleUrls: ['./product-read-schema.component.css']
})
export class ProductReadSchemaComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  //dataSource: ProductReadSchemaDataSource;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'valor'];
  //dataSource = new MatTableDataSource<ProductReadSchemaDataSource>(null);
  dataSource: any;

  constructor(private productService: ProductService) {};

  ngOnInit() {
/*
    // Sem usar classe "DataSource"
    this.productService.listarProdutos().subscribe(produtos => {
      this.dataSource = new MatTableDataSource<Product>(produtos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
*/

    // Usando classe "DataSource"
    this.productService.listarProdutos().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<ProductReadSchemaDataSource>(data);
    })

  }


  ngAfterViewInit() {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
}
