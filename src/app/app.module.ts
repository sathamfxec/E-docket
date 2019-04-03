import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { HttpHeaders } from  '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EDocketComponent } from './e-docket/e-docket.component';
import { WindowRef } from './shared/windowRef';
import { AuthenticationService } from './_services';
// import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: EDocketComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    EDocketComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // HttpHeaders,
    RouterModule.forRoot(routes)
  ],
  providers: [
     WindowRef, AuthGuard, AuthenticationService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
