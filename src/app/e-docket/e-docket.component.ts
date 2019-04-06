import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
 private empName: string = "SATHAM HUSSAIN M";
 private empId: number = 787490;
 private regNo: number;
 private dob: string;
 private processing: boolean = false;
 private verified: boolean = false;
 private not_verified: boolean = false;
 private clientSideerrorMsg: string;
 private docType: string;
 private enableInpElement: boolean = true;
 private successMsg: string;
 private errorMsg: string;


 @ViewChild('myInput')
 myInputVariable: ElementRef;

 constructor(public winRef: WindowRef,
   private router: ActivatedRoute,
   public http: HttpClient,
   private service: EDocketService) {}

 ngOnInit() {
   console.log(this.winRef);
 }

 /**
  * Method to select the document type before upload.
  * @memberof EDocketComponent component
 */
 selectDocType(event) {
   event.target.checked;
   this.docType = event.target.value;
   this.enableInpElement = false;
   this.reset("All"); // To reset the form
 }
 /**
  * Method to defect the file change event.
  * @memberof EDocketComponent component
 */
 fileChange(files: File[]) {
   if(files.length > 0) {
     this.updateProgress();
     this.reset();
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
   // Invoke OCR service to upload the image
   this.service.ocr(httpOptions, this.formData).subscribe(
     (data:any) => {
        let parsedText = data.ParsedResults[0].ParsedText;
        let response = parsedText.split("\r\n");
        // console.log(response);
        this.verifyDocType(response, parsedText);
        this.formData = new FormData();
     }, error => {
       let message = '';
       this.showError(error);
     }
   );
 }
 /**
  * Method to verify the document.
  * @memberof EDocketComponent component
 */
 verifyDocType(response, parsedText?: string) {
   switch(this.docType) {
     case "SSLC":
      if(parsedText.search(environment.sscl_doc_conf) !== -1) { 
        // this.processText(response, environment.sslc_cer_conf);  
        this.updateProgress(1);
        this.successMsg = environment.successMsg;
      } else {
        this.updateProgress(0);
        this.errorMsg = environment.errorMsg.replace("{{docType}}",this.docType);
      }
      break;
     case "HSC":
      if(parsedText.search(environment.hsc_doc_conf) !== -1) {     
        // this.processText(response, environment.hsc_cer_conf); 
        this.updateProgress(1); 
        this.successMsg = environment.successMsg;
      } else {
        this.updateProgress(0);
        this.errorMsg = environment.errorMsg.replace("{{docType}}",this.docType);
      }
      break;
     case "AADHAAR":
      if(parsedText.search(environment.aadhaar_doc_conf) !== -1) {
        // this.processText(response, environment.aadhaar_cer_conf);  
        this.updateProgress(1);        
        this.successMsg = environment.successMsg;     
      } else {
        this.updateProgress(0);        
        this.errorMsg = environment.errorMsg.replace("{{docType}}",this.docType);
      }
      break;
     case "PAN":
      if(parsedText.search(environment.pan_doc_conf) !== -1) {
        // this.processText(response, environment.pan_cer_conf);  
        this.updateProgress(1);
        this.successMsg = environment.successMsg;     
      } else {
        this.updateProgress(0);
        this.errorMsg = environment.errorMsg.replace("{{docType}}",this.docType);
      }
      break;
     default:
      break;
   }
 }
 /**
  * Method to process the text.
  * @memberof EDocketComponent component
 */
 processText(response, cert_conf) {
   console.log(this.docType);
   let hits = 0;
   let i = 0;
   let match_words = 0;
   while (i < response.length) {
    if (this.empName === response[i].trim()) {
        hits += 1;
    }
    if(hits === 1 && match_words !== 0) {
      this.regNo = (this.docType === "SSLC" || this.docType === "HSC") ? response[i+1].trim() : response[i].trim();        
      match_words = 0;
    } else if (hits === 1 && match_words === 0 && response[i].search(cert_conf) !== -1) {
      match_words += 1;
    }
    i += 1;
  }
  this.updateProgress(hits);
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
  * Method to update the progress of the uploaded image.
  * @memberof EDocketComponent component
 */
 updateProgress(hits?: number) {
   switch(hits) {
     case 1:
      this.verified = true;
      this.not_verified = false;
      this.processing = false;
      // this.successMsg = environment.successMsg;
      break;
     case 0:
      this.verified = false;
      this.not_verified = true;
      this.processing = false;
      break;
     default:
      this.verified = false;
      this.not_verified = false;
      this.processing = false;
      break;
   }
 }
 /**
  * Method to show the error.
  * @memberof EDocketComponent component
 */
 showError(error?: string) {
   this.clientSideerrorMsg = 'File size exceeds allowed limit max 1KB';
 }
 /**
  * Method to reset the form.
  * @memberof EDocketComponent component
 */
 reset(all?: string) {
   this.successMsg = '';
   this.errorMsg = '';
   this.formData = new FormData();
   (all === "All") ? this.myInputVariable.nativeElement.value = "" : "";
   this.updateProgress();
 }
}
