import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    constructor() { }

    login(currentUser: any) {
    	localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
