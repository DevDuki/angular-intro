import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "./custom-validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formElement!: FormGroup;
  statuses: string[] = ['Stable', 'Critical', 'Finished'];

  constructor() {
  }

  ngOnInit() {
    this.formElement = new FormGroup({
      // @ts-ignore
      'project-name': new FormControl(null, [Validators.required], CustomValidators.projectNamesValidatorAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'project-status': new FormControl('Stable')
    });
  };

  onSubmit() {
    console.log(this.formElement.value)
  }
}
