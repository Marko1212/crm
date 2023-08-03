import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { AuthService } from '../auth/auth.service';
import { switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

const API_URL = environment.apiUrl;

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}

  create(invoiceData: Invoice) {
    return this.http.post<Invoice>(API_URL + '/invoice', invoiceData);
  }

  update(invoiceData: Invoice) {
    return this.http.put<Invoice>(
      API_URL + '/invoice/' + invoiceData.id,
      invoiceData
    );
  }

  findAll() {
    return this.http.get<Invoice[]>(API_URL + '/invoice');
  }

  find(id: number) {
    return this.http.get<Invoice>(API_URL + '/invoice/' + id);
  }

  delete(id: number) {
    return this.http.delete(API_URL + '/invoice/' + id);
  }
}
