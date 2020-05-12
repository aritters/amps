import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[uppercase]',
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '(input)': '$event'
  }
})
export class UppercaseInputDirective {

  lastValue: string;

  constructor(public elementRef: ElementRef) { }

  @HostListener('input', ['$event']) onInput(e: KeyboardEvent) {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    this.elementRef.nativeElement.value = (el.value || '').toUpperCase();

    e.preventDefault();

    if (el.value.length > 0 && this.lastValue !== el.value) {

      this.lastValue = this.elementRef.nativeElement.value = el.value;
      // Propagation
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      e.target.dispatchEvent(evt);
    }
  }
}
