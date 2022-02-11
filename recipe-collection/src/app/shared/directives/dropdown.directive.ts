import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnChanges {
  @Input('appDropdown') isShowing!: boolean;
  @HostBinding('class.show') isOpen!: boolean;

  constructor() { }

  // Thx to bootstrap now passing the class to the child component, it actually would be a better solution
  // to just use [ngClass]="{ show: isDropdownOpen }" on this element instead of making a whole directive.
  // But this is just for demo purposes anyways
  ngOnChanges(): void {
    this.isOpen = this.isShowing;
  }
}
