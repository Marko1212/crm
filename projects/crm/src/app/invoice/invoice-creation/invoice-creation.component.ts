import { Component } from '@angular/core';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-creation',
  template: `
    <div class="bg-light p-5 rounded">
      <h1>Créer une nouvelle facture</h1>
      <p class="alert bg-info text-white">
        Remplissez les informations de la facture afin de la retrouver dans
        votre liste plus tard !
      </p>

      <p class="alert bg-warning text-white" *ngIf="errorMessage">
        {{ errorMessage }}
      </p>

      <app-invoice-form (invoice-submit)="onSubmit($event)"></app-invoice-form>
    </div>
  `,
  styles: [],
})
export class InvoiceCreationComponent {
  errorMessage = '';

  constructor(
    private service: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  onSubmit(invoiceData: Invoice) {
    this.service.create(invoiceData).subscribe({
      next: () => this.router.navigate(['../'], { relativeTo: this.route }),
      error: () =>
        (this.errorMessage =
          'Une erreur est survenue, merci de réessayer plus tard'),
    });
  }
}
