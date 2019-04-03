import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EDocketComponent } from './e-docket/e-docket.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: EDocketComponent, canActivate: [AuthGuard] },

	// otherwise redirect to home
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
  	RouterModule.forRoot(
  		routes,
  		{ 
  			enableTracing: true,
  			preloadingStrategy: SelectivePreloadingStrategyService
  		}
  	),
  	CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
