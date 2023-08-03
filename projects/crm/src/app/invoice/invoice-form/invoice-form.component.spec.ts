import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InvoiceFormComponent } from './invoice-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormDetailsComponent } from './invoice-form-details.component';
import { InvoiceFormGeneralComponent } from './invoice-form-general.component';
import { InvoiceFormTotalsComponent } from './invoice-form-totals.component';

describe('InvoiceFormComponent', () => {
  let spectator: Spectator<InvoiceFormComponent>;

  const createSpectator = createComponentFactory({
    component: InvoiceFormComponent,
    imports: [ReactiveFormsModule],
    declarations: [
      InvoiceFormDetailsComponent,
      InvoiceFormGeneralComponent,
      InvoiceFormTotalsComponent,
    ],
  });

  it('should validate customer_name', () => {
    spectator = createSpectator();

    const field = spectator.component.invoiceForm.controls.customer_name;

    spectator.typeInElement('', '#customer_name');
    expect(field.hasError('required')).toBeTrue();

    spectator.typeInElement('Marc', '#customer_name');
    expect(field.hasError('minlength')).toBeTrue();

    spectator.typeInElement('Marko', '#customer_name');
    expect(field.valid).toBeTrue();
  });

  it('should validate description', () => {
    spectator = createSpectator();

    const field = spectator.component.invoiceForm.controls.description;

    spectator.typeInElement('', '#description');
    expect(field.hasError('required')).toBeTrue();

    spectator.typeInElement('MOCK', '#description');
    expect(field.hasError('minlength')).toBeTrue();

    spectator.typeInElement('MOCK_DESCRIPTION', '#description');
    expect(field.valid).toBeTrue();
  });

  it('should validate that at least one detail item is given', () => {
    spectator = createSpectator();

    expect(spectator.component.invoiceForm.hasError('noDetails')).toBeTrue();

    spectator.component.onAddDetails();

    expect(spectator.component.invoiceForm.hasError('noDetails')).toBeFalse();
  });

  it('should validate details', () => {
    spectator = createSpectator();

    spectator.component.onAddDetails();

    const detailItem = spectator.component.invoiceForm.controls.details.at(0);

    // Description
    spectator.typeInElement('', '#description_0');
    expect(detailItem.controls.description.hasError('required')).toBeTrue();

    spectator.typeInElement('Marc', '#description_0');
    expect(detailItem.controls.description.hasError('minlength')).toBeTrue();

    // Montant
    spectator.typeInElement('', '#amount_0');
    expect(detailItem.controls.amount.hasError('required')).toBeTrue();
    spectator.typeInElement('-2', '#amount_0');
    expect(detailItem.controls.amount.hasError('min')).toBeTrue();
    spectator.typeInElement('300', '#amount_0');
    expect(detailItem.controls.amount.valid).toBeTrue();

    // Quantity
    spectator.typeInElement('', '#quantity_0');
    expect(detailItem.controls.quantity.hasError('required')).toBeTrue();
    spectator.typeInElement('-2', '#quantity_0');
    expect(detailItem.controls.quantity.hasError('min')).toBeTrue();
    spectator.typeInElement('5', '#quantity_0');
    expect(detailItem.controls.quantity.valid).toBeTrue();
  });
});
