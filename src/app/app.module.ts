import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsteComponent } from './aste/aste.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyComponent } from './registration/verify/verify.component';
import { NotificheComponent } from './notifiche/notifiche.component';
import { AdminComponent } from './admin/admin.component';
import { GuestuserComponent } from './admin/guestuser/guestuser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableDirective } from './services/data/user/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotificheComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AsteComponent,
    RegistrationComponent,
    VerifyComponent,
    NotificheComponent,
    AdminComponent,
    GuestuserComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
