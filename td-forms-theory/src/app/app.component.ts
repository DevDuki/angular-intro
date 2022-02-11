import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('formElement') signupForm!: NgForm;
  defaultQuestion: string = 'pet';
  questionAnswer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }
  submitted: boolean = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // This will override the whole form!
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: '',
    //   questionAnswer: 'some random answer, which just overrided urs, muahaha',
    //   gender: ''
    // })

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })

    console.log(this.signupForm.controls);
  }

  // onSubmit(form: NgForm): void {
  //   console.log(form)
  // }

  onSubmit(): void {
    const { userData, secret, answer, gender } = this.signupForm.value
    this.user = {
      ...userData,
      secret,
      answer,
      gender
    }

    this.submitted = true

    this.signupForm.reset()
  }
}
