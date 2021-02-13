import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest,
     HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';    
import { Observable, Subject } from 'rxjs';
import { tap} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Socket } from 'ngx-socket-io';
@Injectable({
    providedIn: 'root'
})
export class ServerService implements HttpInterceptor {
    private subject = new Subject<any>();
    // baseUrl = 'http://172.16.16.218:2020/';
    // baseUrl = 'https://mean.mobiloitte.com:1478/api/v1/'
    // baseUrl = 'http://172.16.1.35:1504/api/v1/'
     // baseUrl = 'http://172.16.1.89:2020/api/v1/'
    //   baseUrl = 'http://172.16.1.89:2020/api/v1/'  //
       baseUrl = 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1501/api/v1/'
    // siteUrl = 'http://172.16.6.90:8100/';
    // siteUrl = 'http:ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1511'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
    myEmojiArr:any =[]
    modified: any;
    dialCodeArr: any=[];
    first_name:any=''
    profileImage:any= 'assets/images/userImg.png'
    addDetail:any
    
    constructor(private toasterService: ToastrService, private http:HttpClient, private spinner: NgxSpinnerService, private socket: Socket) {
        
     }
    /** search filter */
    search(terms: Observable<string>) {
        return terms.debounceTime(1000)
        .distinctUntilChanged()
    }
    /** Post Method */
    postApi(url, data): Observable<any> {
        if(localStorage.getItem('token')) {
            // this.httpOptions = {
            //     headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
            // };
        }
       return this.http.post(this.baseUrl + url, data,this.httpOptions)
    }
    /** Get Method */
    getApi(url): Observable<any> {
        if(localStorage.getItem('token')) {
            // this.httpOptions = {
            //     headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
            // };
        }
        return this.http.get(this.baseUrl + url,this.httpOptions);
    }
    get(url, data): Observable<any> {
        if(localStorage.getItem('token')) {
            // this.httpOptions = {
            //     headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
            // };
        }
       return this.http.get(this.baseUrl + url, data)
    }
    getFriend(url):Observable<any>{
        this.httpOptions = {
            headers : new HttpHeaders({ 
                '_id': localStorage.getItem('user_id'),
                'token': `Bearer ${localStorage.getItem('token')}` ,
            })
        }
        return this.http.get(this.baseUrl + url,this.httpOptions) 
    }

 
    /** phone dial json */
    getDialCodesJson(): Observable<any> {
		return this.http.get(`assets/dial.json`)
    }
    /**country json */
    getCountryJson(): Observable<any>{
        return this.http.get('assets/country.json')
    }
    // to get states json
    getStateJson(): Observable<any>{
        return this.http.get('assets/state.json')
    }
    // to get  city json
    getCityJson(): Observable<any> {
        return this.http.get('assets/city.json')
    }

    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('user_id')) {
            this.modified = req.clone({setHeaders: {'Content-Type': 'application/json','_id':localStorage.getItem('user_id')}});
        }else {
            this.modified = req.clone({setHeaders: {'Content-Type': 'application/json'}});
        }
        if(localStorage.getItem('token') && localStorage.getItem('user_id')) {
            this.modified = req.clone({setHeaders: {'Content-Type': 'application/json','_id':localStorage.getItem('user_id'), 'Token':localStorage.getItem('token')}});
        }
        // return next.handle(modified).pipe(tap(res => {}))
        return next.handle(this.modified).pipe(tap(res => {
            this.spinner.show()
            if (res instanceof HttpResponse) {
                setTimeout(() => {
                    this.spinner.hide()
                }, 2000);
                // console.log('response==>>>', JSON.stringify(res));
                if(res.body.responseCode == 200) {
                    // this.showSuccToast(res.body.responseMessage)
                }else if(res.body.responseCode == 201 || res.body.responseCode == 205) {
                    this.showInfoToast(res.body.responseMessage)
                }else if(res.body.responseCode == 404) {
                    // this.showWarnToast(res.body.responseMessage)
                }else if(res.body.responseCode == 501 || res.body.responseCode == 500){
                    this.showErrToast(res.body.responseMessage)
                }
                // if ((res['body']['statusCode'] != 200)||(res['body']['statusCode'] != 201)) {
                // if (res['body']['statusCode'] == 401 || res['body']['statusCode'] == 403) {
                // this.serverRepo.showErrToast(res['message']);
                // this.route.navigate(['/landing/login']);
                }
                // else if (res['body']['statusCode'] == 500)
                // this.serverRepo.showErrToast(res['body']['message']);
                // else
                // this.serverRepo.showWarnToast(res['body']['message']);
                },
                // this.serverRepo.showSuccToast(res['body']['message']);
                // if (res['body']['token']) {
                // localStorage.setItem('token', res['body']['token'])
                // // localStorage.setItem('user_id', res['body']['result']['_id'])
                // //localStorage.setItem('user', JSON.stringify(res['body']['result']));
                // }
                // }
                //},
                (err) => {
                    this.spinner.hide()
                    console.log(err)
                if (err instanceof HttpErrorResponse) {
                console.log('---> err', err.error['message'])
                // this.serverRepo.showErrToast(err.error['message']);
                }
            }
        ));            
    }
    /** Function to show success toast */
    showSuccToast(msg) {
        this.toasterService.success(msg, "SOCIAL MEDIA");
    }
  
    /** Function to show error toast */
       showErrToast(msg) {
        this.toasterService.error(msg, "SOCIAL MEDIA");
    }
  
    /** Function to show warning toast */
       showWarnToast(msg) {
        this.toasterService.warning(msg, "SOCIAL MEDIA");
    }
  
    /** Function to show info toast */
       showInfoToast(msg) {
        this.toasterService.info(msg, "SOCIAL MEDIA");
    }
    /** to subscribe using observable */
    sendMessage(msg:string) {
        this.subject.next({ text: msg });
    }
    /** to get message */
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    /** chat */
    sendNewMessage(msg,val) {
        // this.socket.emit("markettingChatHistory", msg);
        // console.log("from service ", val);
        // console.log("message to send ",msg);
        this.socket.emit(val, msg);
    }

    getNewMessage(val) {
        return this.socket
            .fromEvent(val);
    }

    
  getOnline(){
      this.socket.on('OnlineUser', (message) => {
        console.log('message',message);
        });
  }

//   OnlineUser(OnlineUser){
//     //   this.socket.connect().OnlineUser
//     return this.socket.fromEvent(OnlineUser)
//   }
    
    
    //show spinner
    showSpinner(){
        this.spinner.show();
    }
    //hide spinner
    hideSpinner(){
        this.spinner.hide();
    }
}
