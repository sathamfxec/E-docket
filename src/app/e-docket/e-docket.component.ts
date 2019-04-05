import { Component, OnInit, Input } from '@angular/core';
import { WindowRef } from './../shared/windowRef';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from  '@angular/common/http';
import { EDocketService } from './services/e-docket.service';

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
 private empName: string = "SATHAM HUSSAIN";
 private empId: number = 787490;
 private regNo: number;
 private dob: string;
 private processing: boolean = false;
 private verified: boolean = false;
 private not_verified: boolean = false;
 private errorMsg: string;

 constructor(public winRef: WindowRef,
   private router: ActivatedRoute,
   public http: HttpClient,
   private service: EDocketService) {}

 ngOnInit() {}

 /**
  * Method to defect the file change event.
  * @memberof EDocketComponent component
 */
 fileChange(files: File[]) {
   if(files.length > 0) {
     (this.checkFileSize(files[0].size)) ? this.formData.append('file', files[0]) : this.showError();
   }
 }

 /**
  * Method to convert the image to text.
  * @memberof EDocketComponent component
 */
 ocr() {
   this.processing = true;
   const httpOptions = {
      headers: new HttpHeaders({
          'apiKey':environment.ocrApiKey
      })
   };

   this.service.ocr(httpOptions, this.formData).subscribe(
     (data:any) => {
        let parsedText = data.ParsedResults[0].ParsedText;
        let response = parsedText.split("\r\n");
        // console.log(response);
        this.processData(response);
        this.formData = new FormData();
     }, error => {
       let message = '';
       this.showError(error);
     }
   );
 }

 /**
  * Method to process the text.
  * @memberof EDocketComponent component
 */
 processData(response) {
   let hits = 0;
   let i = 0;
   let match_words = 0;
   // console.log(response.length);
   while (i < response.length) {
      // console.log(response[i]);
      if (this.empName === response[i].trim()) {
          hits += 1;
      }
      // if(match_words === 0 && response[i].search("DATE OF BIRTH / REGISTER NO") !== -1) {
      //   console.log('IF 1');
      //   match_words += 1;
      // }
      if(hits === 1 && match_words !== 0) {
        this.dob = response[i].trim();
        this.regNo = response[i+1].trim();
        match_words = 0;
      } else if (hits === 1 && match_words === 0 && response[i].search("DATE OF BIRTH / REGISTER NO") !== -1) {
        match_words += 1;
      }
      i += 1;
   }

   console.log(match_words);
   console.log(hits);
   if (hits !== 0) {
    this.verified = true;
    this.not_verified = false;
    this.processing = false;
   } else {
     this.verified = false;
     this.not_verified = true;
     this.processing = false;
   }
 }

 /**
  * Method to check the file size.
  * @memberof EDocketComponent component
 */
 checkFileSize(size) {
   const convert_to_mb = size / 1000;
   return convert_to_mb < 1000;
 }

 /**
  * Method to show the error.
  * @memberof EDocketComponent component
 */
 showError(error?: string) {
   this.errorMsg = 'File size exceeds allowed limit max 1KB';
 }

}
