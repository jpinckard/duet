import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[disableDoubleTapZoom]'
})
export class DisableDoubleTapZoomDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: Event): void {
    event.preventDefault();
  }
}