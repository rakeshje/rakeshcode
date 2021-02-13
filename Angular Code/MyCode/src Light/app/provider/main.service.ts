import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public loginStatus = new Subject();
  // baseURL = 'ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1507/';
  // baseURL = 'http://192.168.31.253:2020/api/v1/';
  // baseURL = 'http://182.71.75.106:2020/api/v1/';
  // baseURL = 'http://192.168.31.253:2020/api-docs/';
  
  baseURL = 'https://cors-anywhere.herokuapp.com/ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1507/api/v1/';
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: true,
  };
  constructor(public httpClient: HttpClient, private spinnerService: NgxSpinnerService, private toastrService: ToastrService) { }


  // ---------------- get Api function -------------------- //
  getApi(endPointURL, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.get(this.baseURL + endPointURL, httpHeaders)
  }

  

  // ---------------- post Api Function ------------------- //
  postApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.post(this.baseURL + endPointURL, data, httpHeaders)
  }


  // ------------------ put Api Function ----------------- //
  putApi(endPointURL, data, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      }
    }
    return this.httpClient.put(this.baseURL + endPointURL, data, httpHeaders)
  }


  // ------------------ delete Api Function -------------- //
  deleteApi(endPointURL, bodyData, isHeader): Observable<any> {
    var httpHeaders;
    if (isHeader == 0) {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    } else {
      httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        }),
        body: bodyData
      }
    }
    return this.httpClient.delete(this.baseURL + endPointURL, httpHeaders)
  }

  //-------country json------//
  public countryJson():Observable<any>{
    return this.httpClient.get('assets/country.json')
  }


  // check admin login or not
  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }


  // logout
  public logout() {
    localStorage.removeItem('token')
  }

  // spinner service
  showSpinner() {
    this.spinnerService.show();
  }
  hideSpinner() {
    this.spinnerService.hide();
  }


  // toastr service
  successToast(msg) {
    this.toastrService.success(msg);
  }
  errorToast(msg) {
    this.toastrService.error(msg);
  }
  warningToast(msg) {
    this.toastrService.warning(msg);
  }
  infoToast(msg) {
    this.toastrService.info(msg);
  }

  /** to prevent first space */
  preventSpace(event){
    if((event.charCode == 32 || event.charCode == 64) && !event.target.value){
      event.preventDefault();
    }
  }


}
