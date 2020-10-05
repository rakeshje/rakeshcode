import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $:any
@Injectable({
  providedIn: 'root'
})
export class MainService {
  month: any;
  day: any;
  daily: string;
  year: number;
  dtToday: Date;
  maxDate: string;
  countryCode: string[] = ['+1', '+7', '+61', '+64', '+77', '+90', '+380', '+381', '+382', '+385', '+386', '+387', '+389', '+994', '+995'];
  public loginStatus = new Subject();
  public loginData = new Subject()
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: true,
  };
  baseURL = 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1503/api/v1/';

  constructor(private router: Router, public httpClient: HttpClient, private toastrService: ToastrService, private spinnerService: NgxSpinnerService) { }

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


  // check admin login or not
  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }


  // logout
  public logout() {
    localStorage.removeItem('token')
    this.loginData.next('');
    this.loginStatus.next(false)
    this.router.navigate(['login'])
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
  preventSpace(event) {
    if ((event.charCode == 32 || event.charCode == 64) && !event.target.value) {
      event.preventDefault();
    }
  }

  BlockFuture() {
    $(() => {
      this.dtToday = new Date();
      this.month = this.dtToday.getMonth() + 1;
      this.day = this.dtToday.getDate();
      this.year = this.dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();
      this.maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#fromDate').attr('max', this.maxDate);
      $('#toDate').attr('max', this.maxDate);
    });
  }
  
}
