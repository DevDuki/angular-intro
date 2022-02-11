import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
  private static invalidProjectNames: string[] = ['Test'];

  constructor() {
  }

  static projectNamesValidator(control: FormControl): { [errorMessage: string]: boolean } | null {
    const isInvalid = CustomValidators.invalidProjectNames.find((name: string) => name === control.value);
    return isInvalid
      ? { 'invalidProjectName': true }
      : null;
  }

  static projectNamesValidatorAsync(control: FormControl): Promise<any> | Observable<any> | null {
    const isInvalid = CustomValidators.invalidProjectNames.find((name: string) => name === control.value);

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        return isInvalid
          ? resolve({ 'invalidProjectName': true })
          : resolve(null)
      }, 1500)
    });

    return promise;
  }
}
