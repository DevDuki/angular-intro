import { NgModule } from '@angular/core';
import { RecipeService } from './shared/services/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';



@NgModule({
  providers: [
    RecipeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
