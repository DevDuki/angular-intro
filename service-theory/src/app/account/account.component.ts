import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggingService } from '../shared/services/logging.service';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  accounts: {
    name: string,
    status: string
  }[] = []

  constructor(private loggingService: LoggingService, private accountService: AccountService) {
  }

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }

  onSetTo(status: string, id: number) {
    this.accountService.updateAccount(id, status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}
