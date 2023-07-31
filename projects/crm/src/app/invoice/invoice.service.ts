import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}

  create(invoiceData: Invoice) {
    return this.http.post<Invoice>(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/invoice',
      invoiceData
    );
  }

  update(invoiceData: Invoice) {
    return this.http.put<Invoice>(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/invoice/' +
        invoiceData.id,
      invoiceData
    );
  }

  findAll() {
    return this.http.get<Invoice[]>(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/invoice/
    );
  }

  find(id: number) {
    return this.http.get<Invoice>(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/invoice/' + id
    );
  }

  delete(id: number) {
    return this.http.delete(
      'https://x8ki-letl-twmt.n7.xano.io/api:cLAOENeS/invoice/' + id
    );
  }
}
