import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InvoiceEditionComponent } from './invoice-edition.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { InvoiceFormDetailsComponent } from '../invoice-form/invoice-form-details.component';
import { InvoiceFormGeneralComponent } from '../invoice-form/invoice-form-general.component';
import { InvoiceFormTotalsComponent } from '../invoice-form/invoice-form-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { of, throwError } from 'rxjs';

describe('InvoiceEditionComponent', () => {
  let spectator: Spectator<InvoiceEditionComponent>;

  const createSpectator = createComponentFactory({
    component: InvoiceEditionComponent,
    declarations: [
      InvoiceFormComponent,
      InvoiceFormDetailsComponent,
      InvoiceFormGeneralComponent,
      InvoiceFormTotalsComponent,
    ],
    imports: [ReactiveFormsModule],
    mocks: [ActivatedRoute, Router, InvoiceService],
    detectChanges: false,
  });

  it('should redirect to ../ if update succeeds', () => {
    spectator = createSpectator();

    const route = spectator.inject(ActivatedRoute);
    const service = spectator.inject(InvoiceService);
    const router = spectator.inject(Router);

    service.find.and.returnValue(
      of({
        id: 42,
        description: 'MOCK_DESCRIPTION',
        customer_name: 'MOCK_CUSTOMER',
        status: 'PAID',
        details: [
          { description: 'MOCK-DETAIL_1', amount: 300, quantity: 3 },
          { description: 'MOCK-DETAIL_2', amount: 500, quantity: 3 },
        ],
      })
    );

    service.update.and.returnValue(of(null));

    spyOnProperty(route, 'paramMap').and.returnValue(
      of(convertToParamMap({ id: 42 }))
    );

    spectator.detectChanges();

    spectator.click('#submit');

    expect(router.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: route,
    });
  });

  it('should not redirect to ../ if update fails', () => {
    spectator = createSpectator();

    const route = spectator.inject(ActivatedRoute);
    const service = spectator.inject(InvoiceService);
    const router = spectator.inject(Router);

    service.find.and.returnValue(
      of({
        id: 42,
        description: 'MOCK_DESCRIPTION',
        customer_name: 'MOCK_CUSTOMER',
        status: 'PAID',
        details: [
          { description: 'MOCK-DETAIL_1', amount: 300, quantity: 3 },
          { description: 'MOCK-DETAIL_2', amount: 500, quantity: 3 },
        ],
      })
    );

    service.update.and.returnValue(throwError(() => of(null)));

    spyOnProperty(route, 'paramMap').and.returnValue(
      of(convertToParamMap({ id: 42 }))
    );

    spectator.detectChanges();

    spectator.click('#submit');

    expect(router.navigate).not.toHaveBeenCalled();
    expect(spectator.query('.alert.bg-danger')).toExist();
  });
});
