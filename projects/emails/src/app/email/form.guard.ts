import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { EmailCreationComponent } from './email-creation.component';
import { Observable } from 'rxjs';

export class FormGuard implements CanDeactivate<EmailCreationComponent> {
  canDeactivate(
    component: EmailCreationComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean {
    if (component.isFormTouched()) {
      return window.confirm('Etes vous sur de vouloir quitter ce formulaire ?');
    }

    return true;
  }
}
