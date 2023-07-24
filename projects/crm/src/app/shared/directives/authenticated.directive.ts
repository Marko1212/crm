import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

// <h1 *authenticated="true"></h1>
// <h1 *authenticated="false"></h1>
@Directive({
  selector: '[authenticated]',
})
export class AuthenticatedDirective {
  @Input('authenticated')
  value = true;

  subscription?: Subscription;

  constructor(
    private template: TemplateRef<HTMLElement>,
    private container: ViewContainerRef,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.auth.authStatus$.subscribe((status) => {
      this.container.clear();

      if (status === this.value) {
        this.container.createEmbeddedView(this.template);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
