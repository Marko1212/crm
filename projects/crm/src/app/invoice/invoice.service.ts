import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { map } from 'rxjs';
import { environment } from '../../environments/environment.development';

const API_URL = environment.apiUrl;

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}

  create(invoiceData: Invoice) {
    const finalInvoice: Invoice = this.mapAppInvoiceToApiInvoice(invoiceData);
    return this.http.post<Invoice>(API_URL + '/invoice', finalInvoice);
  }

  update(invoiceData: Invoice) {
    const finalInvoice: Invoice = this.mapAppInvoiceToApiInvoice(invoiceData);
    return this.http.put<Invoice>(
      API_URL + '/invoice/' + invoiceData.id,
      finalInvoice
    );
  }

  findAll() {
    return this.http.get<Invoice[]>(API_URL + '/invoice').pipe(
      map((invoices) => {
        return invoices.map((invoice) => {
          return { ...invoice, total: invoice.total! / 100 };
        });
      })
    );
  }

  find(id: number) {
    return this.http
      .get<Invoice>(API_URL + '/invoice/' + id)
      .pipe(map((invoice) => this.mapApiInvoiceToAppInvoice(invoice)));
  }

  delete(id: number) {
    return this.http.delete(API_URL + '/invoice/' + id);
  }

  mapApiInvoiceToAppInvoice(invoice: Invoice) {
    return {
      ...invoice,
      details: invoice.details.map((item) => {
        return { ...item, amount: item.amount / 100 };
      }),
    };
  }

  mapAppInvoiceToApiInvoice(invoice: Invoice) {
    return {
      ...invoice,
      details: invoice.details.map((item) => {
        return {
          ...item,
          amount: item.amount * 100,
        };
      }),
    };
  }
}
