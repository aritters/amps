import { Directive, ElementRef, HostListener } from '@angular/core';
import * as StringMask from 'string-mask';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dateMask]',
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '(input)': '$event'
  }
})
export class DateMaskDirective {
  lastValue: string;

  private datePattern = new StringMask('00/00/0000');

  constructor(public elementRef: ElementRef) { }

  @HostListener('input', ['$event']) onInput(e: KeyboardEvent) {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    this.applyValueChanges(el.value, e);
  }

  private applyValueChanges(value: string, e: KeyboardEvent): void {
    const cleanValue = this.cleanValue(value);

    const maskedValue = this.datePattern.apply(cleanValue);

    this.elementRef.nativeElement.value = maskedValue;

    e.preventDefault();

    if (!this.lastValue || (this.lastValue && !!value.length && this.lastValue !== value)) {
      this.lastValue = this.elementRef.nativeElement.value = value;

      // Propagation
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      e.target.dispatchEvent(evt);
    }
  }

  private cleanValue(value?: string): string {
    return (value || '').replace(/[^\d]/g, '').trim().slice(0, 8);
  }

}
