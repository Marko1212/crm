import {
  Spectator,
  SpectatorHost,
  createComponentFactory,
  createHostFactory,
} from '@ngneat/spectator';
import { InvoiceFormComponent } from './invoice-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormDetailsComponent } from './invoice-form-details.component';
import { InvoiceFormGeneralComponent } from './invoice-form-general.component';
import { InvoiceFormTotalsComponent } from './invoice-form-totals.component';
import { Invoice } from '../invoice';
import { Component } from '@angular/core';
import { InvoiceFormType } from './invoice-form-type';

describe('InvoiceFormComponent', () => {
  let spectator: Spectator<InvoiceFormComponent>;
  let component: InvoiceFormComponent;
  let form: InvoiceFormType;

  const createSpectator = createComponentFactory({
    component: InvoiceFormComponent,
    imports: [ReactiveFormsModule],
    declarations: [
      InvoiceFormDetailsComponent,
      InvoiceFormGeneralComponent,
      InvoiceFormTotalsComponent,
    ],
  });

  beforeEach(() => {
    spectator = createSpectator();
    component = spectator.component;
    form = component.invoiceForm;
  });

  it('should validate customer_name', () => {
    const field = form.controls.customer_name;

    spectator.typeInElement('', '#customer_name');
    expect(field.hasError('required')).toBeTrue();

    spectator.typeInElement('Marc', '#customer_name');
    expect(field.hasError('minlength')).toBeTrue();

    spectator.typeInElement('Marko', '#customer_name');
    expect(field.valid).toBeTrue();
  });

  it('should validate description', () => {
    const field = form.controls.description;

    spectator.typeInElement('', '#description');
    expect(field.hasError('required')).toBeTrue();

    spectator.typeInElement('MOCK', '#description');
    expect(field.hasError('minlength')).toBeTrue();

    spectator.typeInElement('MOCK_DESCRIPTION', '#description');
    expect(field.valid).toBeTrue();
  });

  it('should validate that at least one detail item is given', () => {
    expect(form.hasError('noDetails')).toBeTrue();

    component.onAddDetails();

    expect(form.hasError('noDetails')).toBeFalse();
  });

  it('should validate details', () => {
    component.onAddDetails();

    const detailItem = form.controls.details.at(0);

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

  it('should add a detail item when we call addDetails()', () => {
    component.onAddDetails();
    spectator.detectChanges();
    expect(spectator.queryAll('.detail-row')).toHaveLength(1);

    component.onAddDetails();
    spectator.detectChanges();
    expect(spectator.queryAll('.detail-row')).toHaveLength(2);
  });

  it('should remove a detail item when we call removeDetail()', () => {
    component.onAddDetails(); // item 0
    component.onAddDetails(); // item 1
    spectator.detectChanges();
    expect(spectator.queryAll('.detail-row')).toHaveLength(2);

    component.onRemoveDetails(0);
    spectator.detectChanges();
    expect(spectator.queryAll('.detail-row')).toHaveLength(1);

    component.onRemoveDetails(0);
    spectator.detectChanges();
    expect(spectator.queryAll('.detail-row')).toHaveLength(0);
  });

  it('should listen to details events', () => {
    spectator.click('#initial-add-button');

    expect(spectator.queryAll('.detail-row')).toHaveLength(1);

    spectator.click('#remove-button-0');
    expect(spectator.queryAll('.detail-row')).toHaveLength(0);
  });

  it('should calculate total', () => {
    component.details.push(
      new FormGroup({
        amount: new FormControl(200),
        quantity: new FormControl(3),
        description: new FormControl(),
      })
    );
    component.details.push(
      new FormGroup({
        amount: new FormControl(300),
        quantity: new FormControl(3),
        description: new FormControl(),
      })
    );

    expect(component.total).toBe(1500);
  });
});

@Component({
  template: ``,
})
class TestHostComponent {
  onSubmit(invoice: Invoice) {}
}
describe('InvoiceFormComponent with Host', () => {
  let spectator: SpectatorHost<InvoiceFormComponent, TestHostComponent>;
  let component: InvoiceFormComponent;
  let form: InvoiceFormType;
  let host: TestHostComponent;
  let submitSpy: jasmine.Spy;

  const createHost = createHostFactory({
    component: InvoiceFormComponent,
    host: TestHostComponent,
    template: `<app-invoice-form (invoice-submit)="onSubmit($event)"></app-invoice-form>`,
    declarations: [
      InvoiceFormDetailsComponent,
      InvoiceFormTotalsComponent,
      InvoiceFormGeneralComponent,
    ],
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createHost();
    component = spectator.component;
    host = spectator.hostComponent;
    form = component.invoiceForm;
    submitSpy = spyOn(spectator.hostComponent, 'onSubmit');
  });

  it('should emit an event on (invoice-submit) if form is valid and user clicks submit button', () => {
    spectator.click('#initial-add-button');

    form.setValue({
      description: 'MOCK_DESCRIPTION',
      customer_name: 'MOCK_CUSTOMER',
      status: 'PAID',
      details: [
        {
          amount: 300,
          quantity: 2,
          description: 'MOCK_DESCRIPTION',
        },
      ],
    });

    spectator.detectChanges();
    spectator.click('#submit');

    expect(submitSpy).toHaveBeenCalledWith(form.value as Invoice);
  });

  it('should not emit an event on (invoice-submit) if form is invalid and user clicks submit button', () => {
    spectator.click('#submit');

    expect(submitSpy).not.toHaveBeenCalled();
  });
});
