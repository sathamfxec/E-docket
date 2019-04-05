import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from  '@angular/common/http';

@Injectable()
export class EDocketService {

    constructor(public http: HttpClient) { }

    ocr(httpOptions, formData) {
    	return this.http.post('https://api.ocr.space/parse/image', formData, httpOptions);
    }
}

