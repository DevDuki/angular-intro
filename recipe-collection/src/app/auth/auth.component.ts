import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error?: string = undefined;
  private alertSub!: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    const { email, password } = form.value;
    this.isLoading = true

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs
      .subscribe({
        next: (authData: AuthResponseData) => {
          console.log(authData)
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      })

    form.reset();
  }

  private showErrorAlert(message: string) {
    // const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertHostViewContainerRef = this.alertHost.viewContainerRef;
    alertHostViewContainerRef.clear();

    const alertComponentRef = alertHostViewContainerRef.createComponent(AlertComponent);

    alertComponentRef.instance.message = message
    this.alertSub = alertComponentRef.instance.close
      .subscribe(() => {
        alertHostViewContainerRef.clear();
        this.alertSub.unsubscribe();
      })
  }

  onHandleCloseError() {
    this.error = undefined;
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }
}
