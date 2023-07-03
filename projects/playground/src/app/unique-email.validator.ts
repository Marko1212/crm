import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector:
    '[ngModel][uniqueEmail], [formControl][uniqueEmail], [formControlName][uniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueEmailValidator,
      multi: true,
    },
  ],
})
export class UniqueEmailValidator implements AsyncValidator {
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> {
    return fetch(
      'https://jsonplaceholder.typicode.com/users?email=' + control.value
    )
      .then((response) => response.json())
      .then((usersArray: any[]) => {
        if (usersArray.length > 0) {
          return {
            uniqueEmail: true,
          };
        }
        return null;
      });
  }
}
