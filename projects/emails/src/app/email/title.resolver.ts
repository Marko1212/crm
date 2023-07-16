import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Email } from './types';
import { Observable } from 'rxjs';
import { FAKE_EMAILS_DATA } from '../data';

export class TitleResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    const type = route.paramMap.get('type');

    if (!type) {
      return 'Boîte de réception';
    }

    return type === 'sent' ? 'Emails envoyés' : 'Corbeille';
  }
}
