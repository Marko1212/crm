import { Component } from '@angular/core';
import { Invoice } from '../invoice';

@Component({
  selector: 'app-invoice-creation',
  template: `
    <div class="bg-light p-5 rounded">
      <h1>Créer une nouvelle facture</h1>
      <p class="alert bg-info text-white">
        Remplissez les informations de la facture afin de la retrouver dans
        votre liste plus tard !
      </p>

      <app-invoice-form (invoice-submit)="onSubmit($event)"></app-invoice-form>
    </div>
  `,
  styles: [],
})
export class InvoiceCreationComponent {
  onSubmit(invoiceData: Invoice) {
    console.log(invoiceData);
  }
}
