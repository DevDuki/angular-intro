import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy {
  @Input('srvElement') element!: {
    type: string,
    name: string,
    content: string
  };
  @Input() name!: string;
  @ViewChild('heading', { static: true }) header!: ElementRef;
  @ContentChild('contentParagraph') paragraph!: ElementRef;

  constructor() {
    console.log('constructor called!')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!')
    console.log('changes in OnChanges', changes)
  }

  ngOnInit(): void {
    console.log('ngOnInit called!')
    console.log('Is this DOM element available in this lifecycle yet?', this.header.nativeElement.textContent);
    console.log('Text Content of contentParagraph', this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log('ngDoCheck called!')
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!')
    console.log('Is this DOM element available in this lifecycle yet?', this.header.nativeElement.textContent);
    console.log('Text Content of contentParagraph', this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!')
    console.log('Is this DOM element available in this lifecycle yet?', this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!')
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called!')
  }
}
