import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        // @ts-ignore
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsyncValidator),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe((value: string) => {
      console.log(value)
    });

    this.signupForm.statusChanges.subscribe((status: FormControlStatus) => {
      console.log(status)
    });

    // Sets all values in all controls. Same as in TD forms section
    // this.signupForm.setValue(...)
    // Sets value of chosen controls. Same as in TD forms section
    // this.signupForm.patchValue()
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset();
  }

  onAddHobby() {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies'))
      .push(formControl)
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      };
    }
    return null;
  }

  forbiddenEmailsAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'g@g.g') {
          resolve({ 'emailIsForbidden': true })
        } else {
          resolve(null)
        }
      },1500)
    })

    return promise
  }
}
