import { Product } from './../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

/*
// TODO: Replace this with your own data model type
export interface ProductReadSchemaItem {
  nome: string;
  id: number;
}
*/

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {id: 1, nome: 'Hydrogen', valor: 1.99},
  {id: 2, nome: 'Helium', valor: 1.99},
  {id: 3, nome: 'Lithium', valor: 1.99},
  {id: 4, nome: 'Beryllium', valor: 1.99},
  {id: 5, nome: 'Boron', valor: 1.99},
  {id: 6, nome: 'Carbon', valor: 1.99},
  {id: 7, nome: 'Nitrogen', valor: 1.99},
  {id: 8, nome: 'Oxygen', valor: 1.99},
  {id: 9, nome: 'Fluorine', valor: 1.99},
  {id: 10, nome: 'Neon', valor: 1.99},
  {id: 11, nome: 'Sodium', valor: 1.99},
  {id: 12, nome: 'Magnesium', valor: 1.99},
  {id: 13, nome: 'Aluminum', valor: 1.99},
  {id: 14, nome: 'Silicon', valor: 1.99},
  {id: 15, nome: 'Phosphorus', valor: 1.99},
  {id: 16, nome: 'Sulfur', valor: 1.99},
  {id: 17, nome: 'Chlorine', valor: 1.99},
  {id: 18, nome: 'Argon', valor: 1.99},
  {id: 19, nome: 'Potassium', valor: 1.99},
  {id: 20, nome: 'Calcium', valor: 1.99},
];

/**
 * Data source for the ProductReadSchema view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductReadSchemaDataSource extends DataSource<Product> {
  data: Product[] = [];//EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }
  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {

    console.log('connect');

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/nome columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
