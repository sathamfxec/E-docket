import { Component, OnInit, NgZone } from '@angular/core';
import { WindowRef } from '../shared/windowRef';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { environment } from '../../environments/environment';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2: any;

  constructor(public winRef: WindowRef,
  	private router: Router,
    private authenticationService: AuthenticationService,
    private zone:NgZone) { 
  }

  /**
   * Method to load the client ID to gapi variable
   * @memberof LoginComponent component
   */
  ngOnInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: environment.clientId,
        cookiepolicy: 'single_host_origin',
        scope: environment.scope
      });
    });
    this.authenticationService.logout();
  }
  /**
   * Method to login and redirect the page to contacts page
   * @memberof LoginComponent component
   */
  authorize(): Promise<any> {
    return new Promise((resolve, reject) => {
      let promise = this.auth2.signIn();
      promise.then(() => {
        let self = this;
        let profile = this.auth2.currentUser.get().getBasicProfile();
        this.authenticationService.login(profile);
        this.zone.run(() => this.router.navigate(['/dashboard']));
      });
    });
  }

}
