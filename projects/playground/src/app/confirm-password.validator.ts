import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector:
    '[ngForm][confirmPassword], [ngModelGroup][confirmPassword], [formGroup][confirmPassword], [formGroupName][confirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordValidator,
      multi: true,
    },
  ],
})
export class ConfirmPasswordValidator implements Validator {
  validate(
    control: AbstractControl<{
      password: FormControl<string>;
      confirm: FormControl<string>;
    }>
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirm');

    if (password?.value !== confirm?.value) {
      confirm?.setErrors({ confirmPassword: true });

      return { confirmPassword: true };
    }

    return null;
  }
}
