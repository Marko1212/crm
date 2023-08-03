import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InvoiceCreationComponent } from './invoice-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { InvoiceFormGeneralComponent } from '../invoice-form/invoice-form-general.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceFormDetailsComponent } from '../invoice-form/invoice-form-details.component';
import { InvoiceFormTotalsComponent } from '../invoice-form/invoice-form-totals.component';
import { of, throwError } from 'rxjs';

describe('InvoiceCreationComponent', () => {
  let spectator: Spectator<InvoiceCreationComponent>;
  const createSpectator = createComponentFactory({
    component: InvoiceCreationComponent,
    imports: [ReactiveFormsModule],
    mocks: [InvoiceService, Router, ActivatedRoute],
    declarations: [
      InvoiceFormComponent,
      InvoiceFormDetailsComponent,
      InvoiceFormGeneralComponent,
      InvoiceFormTotalsComponent,
    ],
  });

  it('should redirect to ../ if invoice creation succeeds', () => {
    spectator = createSpectator();
    spectator.inject(InvoiceService).create.and.returnValue(of(null));

    spectator.typeInElement('MOCK_DESCRIPTION', '#description');
    spectator.typeInElement('MOCK_CUSTOMER_NAME', '#customer_name');
    spectator.click('#initial-add-button');

    spectator.typeInElement('MOCK_DESCRIPTION', '#description_0');
    spectator.typeInElement('3', '#quantity_0');
    spectator.typeInElement('100', '#amount_0');

    spectator.click('#submit');

    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: spectator.inject(ActivatedRoute),
    });
    expect(spectator.query('.alert.bg-warning')).not.toExist();
  });

  it('should not redirect and display a message if invoice creation failed', () => {
    spectator = createSpectator();
    spectator
      .inject(InvoiceService)
      .create.and.returnValue(throwError(() => of(null)));

    spectator.typeInElement('MOCK_DESCRIPTION', '#description');
    spectator.typeInElement('MOCK_CUSTOMER', '#customer_name');
    spectator.click('#initial-add-button');

    spectator.typeInElement('MOCK_DESCRIPTION', '#description_0');
    spectator.typeInElement('3', '#quantity_0');
    spectator.typeInElement('100', '#amount_0');

    spectator.click('#submit');

    expect(spectator.inject(Router).navigate).not.toHaveBeenCalledWith();
    expect(spectator.query('.alert.bg-warning')).toExist();
  });
});
