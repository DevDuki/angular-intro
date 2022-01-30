import { Component } from '@angular/core';

interface serverElement {
  type: string;
  name: string;
  content: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverElements: serverElement[] = [
    {
      type: 'server',
      name: 'textServer',
      content: 'test!!!'
    }
  ];

  onServerAdded({ serverName, serverContent }: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverName,
      content: serverContent
    });
  }

  onBlueprintAdded({ serverName, serverContent }: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: serverName,
      content: serverContent
    });
  }

}
