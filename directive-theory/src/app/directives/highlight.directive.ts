import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input('appHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor!: string;
  renderer: Renderer2;

  constructor(private elementRef: ElementRef, renderer: Renderer2) {
    this.renderer = renderer;
  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor
  }

  @HostListener('mouseenter', ['$event']) bla(eventData: Event) {
    console.log(eventData)
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave', ['customEventData']) bla2(customEventData: number) {
    console.log(customEventData)
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
