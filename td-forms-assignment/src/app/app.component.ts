import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('formElement') formElement!: NgForm;
  formSubmitted: boolean = false;
  subscriptionPlans: string[] = [
    'Basic',
    'Advanced',
    'Pro'
  ]
  submittedData = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    this.submittedData = this.formElement.value
    this.formSubmitted = true;
    this.formElement.reset();
  }
}
