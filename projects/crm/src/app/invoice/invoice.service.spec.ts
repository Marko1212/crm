import {
  HttpMethod,
  SpectatorHttp,
  createHttpFactory,
} from '@ngneat/spectator';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice';
import { environment } from '../../environments/environment.development';

describe('InvoiceService', () => {
  let spectator: SpectatorHttp<InvoiceService>;

  const createSpectator = createHttpFactory({
    service: InvoiceService,
  });

  it('should call /invoice in POST when we call create()', () => {
    spectator = createSpectator();

    const invoice: Invoice = {
      description: 'MOCK_DESCRIPTION',
      customer_name: 'MOCK_CUSTOMER',
      status: 'PAID',
      details: [
        {
          quantity: 3,
          amount: 300,
          description: 'MOCK_DETAIL_DESCRIPTION',
        },
      ],
    };

    spectator.service.create(invoice).subscribe();

    const req = spectator.expectOne(
      environment.apiUrl + '/invoice',
      HttpMethod.POST
    );

    expect(req.request.body).toEqual({
      description: 'MOCK_DESCRIPTION',
      customer_name: 'MOCK_CUSTOMER',
      status: 'PAID',
      details: [
        {
          quantity: 3,
          amount: 30000,
          description: 'MOCK_DETAIL_DESCRIPTION',
        },
      ],
    });
  });
});
