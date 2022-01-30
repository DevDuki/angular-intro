import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @ViewChild('serverContentInput', { static: true }) serverContentInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName: string) {
    this.serverCreated.emit({
      serverName,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverName: string) {
    this.blueprintCreated.emit({
      serverName,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
