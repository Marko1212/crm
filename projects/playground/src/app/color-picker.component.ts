import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  template: `
    <label>{{ label }}</label>
    <ul>
      <li
        (click)="setColor('blue')"
        [class.selected]="color === 'blue'"
        [style.backgroundColor]="'blue'"
      ></li>
      <li
        (click)="setColor('red')"
        [style.backgroundColor]="'red'"
        [class.selected]="color === 'red'"
      ></li>
      <li
        (click)="setColor('purple')"
        [style.backgroundColor]="'purple'"
        [class.selected]="color === 'purple'"
      ></li>
    </ul>
  `,
  styles: [
    `
      ul {
        display: flex;
        gap: 1em;
        padding: 0;
        list-style-type: none;
      }

      li.selected {
        border: 5px solid rgba(255, 255, 255, 0.5);
      }

      li {
        border-radius: 5px;
        cursor: pointer;
        padding: 0;
        width: 50px;
        height: 50px;
        background-color: red;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements ControlValueAccessor {
  onChange: (_: any) => void = (_: any) => {};
  onTouch: () => void = () => {};

  setColor(color: 'blue' | 'red' | 'purple') {
    this.color = color;
    this.onChange(this.color);
    this.onTouch();
  }

  writeValue(color: 'blue' | 'red' | 'purple'): void {
    this.color = color;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  @Input()
  label = 'Sélectionnez une couleur';

  @Input()
  color: 'red' | 'blue' | 'purple' = 'blue';
}
