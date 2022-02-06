import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from '../../can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server!: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const { id }  = this.route.snapshot.params
    //@ts-ignore
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.queryParams.subscribe((updatedParams: Params) =>
      this.allowEdit = updatedParams['allowEdit'] === '1'
    )
    // this.route.params.subscribe((updatedParams: Params) => {
    //   const { id } = updatedParams
    //   // @ts-ignore
    //   this.server = this.serversService.getServer(+id);
    //   this.serverName = this.server.name;
    //   this.serverStatus = this.server.status;
    // })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { allowEdit: 1 } });
  }

  canComponentDeactivate() {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Changes have not been saved yet. Would you really like to leave and discard changes?')
    } else {
      return true;
    }
  }
}
