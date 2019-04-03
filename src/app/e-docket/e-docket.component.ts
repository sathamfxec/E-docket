import { Component, OnInit } from '@angular/core';
import { WindowRef } from './../shared/windowRef';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from  '@angular/common/http';

declare const gapi: any;


@Component({
  selector: 'e-docket',
  templateUrl: './e-docket.component.html',
  styleUrls: ['./e-docket.component.css']
})
export class EDocketComponent implements OnInit {

 public auth2: any;
 connections: any = [];
 private formData = new FormData();

 constructor(public winRef: WindowRef, private router: ActivatedRoute, public http: HttpClient) {}

 ngOnInit() {}

 /**
  * Method to defect the file change event.
  * @memberof EDocketComponent component
 */
 fileChange(files: File[]) {
   if(files.length > 0) {
     this.formData.append('file', files[0]);
   }
 }

 /**
  * Method to convert the image to text.
  * @memberof EDocketComponent component
 */
 ocr() {
   // Need to move this code to e-docket.service.ts file. 
   const httpOptions = {
      headers: new HttpHeaders({
          'apiKey':environment.ocrApiKey
      })
   };
   // const data: any = {};
   this.formData.append('language', environment.language);
   // this.formData.append('isOverlayRequired', environment.isOverlayRequired);
   // data.isOverlayRequired = environment.isOverlayRequired;
   // data.file = '';
   this.http.post('https://api.ocr.space/parse/image', this.formData, httpOptions)
    .subscribe(
        (data:any) => {
                let parsedText = data.ParsedResults[0].ParsedText;
                let response = parsedText.split("\r\n");
                console.log(response);
                // console.log(data.ParsedResults[0].ParsedText);
                // console.log(typeof(data.ParsedResults[0].ParsedText));
                this.formData = new FormData();
            },
            error => {
                console.log(error);
            }
    );
 }
}
