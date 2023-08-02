import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import {
  InvoiceFormTotalsComponent,
  TAXE_RATE_TOKEN,
} from './invoice-form-totals.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

describe('InvoiceFormTotalsComponent', () => {
  let spectator: SpectatorHost<InvoiceFormTotalsComponent>;
  const createSpectator = createHostFactory({
    component: InvoiceFormTotalsComponent,
    //  providers: [{ provide: TAXE_RATE_TOKEN, useValue: 0.4 }],
  });

  it('should display total, total TVA and total TTC', () => {
    spectator = createSpectator(
      `<app-invoice-form-totals [total]="100"></app-invoice-form-totals>`
    );

    expect(spectator.query('#total_ht')?.innerHTML).toContain('100,00&nbsp;€');
    expect(spectator.query('#total_tva')?.innerHTML).toContain('20,00&nbsp;€');
    expect(spectator.query('#total_ttc')?.innerHTML).toContain('120,00&nbsp;€');
  });
});
