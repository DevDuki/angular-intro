import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();
  isDropdownOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  select(selection: string): void {
    this.onSelect.emit(selection)
  }
}
