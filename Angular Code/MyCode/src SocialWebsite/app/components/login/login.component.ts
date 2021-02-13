import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import {  GoogleLoginProvider } from "angularx-social-login";
import { NgxSpinnerService } from 'ngx-spinner';

declare var FB: any;

declare var $:any
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    myOptions: INgxMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        disableSince: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1}
    };
    
    loginForm: any;
    message: any='login';
    subscription: Subscription;
    login: Subscription;
    signupForm: FormGroup;
    dialCodeArr: any=[];
    upload: Subscription;
    profileImage: any;
    base64Image: any;
    disableCheck: boolean = false;
    signup: any;
    dialVal: any='';
    disableCheck2: boolean = false;
    OtpForm: FormGroup;
    otp: any = {};
    count: number=59;
    const: any;
    hiddenTimer: boolean;
    resendButton: boolean= false;
    verifyotp: any;
    resend: Subscription;
    sendOTP: Subscription;
    forgotForm: FormGroup;
    forgot: any;
    forgotEmailForm: FormGroup;
    resetPassForm: FormGroup;
    reset: Subscription;
    config: {
    displayKey: string; //if objects array passed which key to be displayed defaults to description
        search: boolean; //true/false for the search functionlity defaults to false,
        height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: string; // text to be displayed when no item is selected defaults to Select,
        customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: any; // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: string; // text to be displayed when no items are found while searching
        searchPlaceholder: string; // label thats displayed in search input,
        searchOnKey: string;
    };

    constructor(private spinner: NgxSpinnerService,private authService: AuthService,private header: HeaderComponent,private server:ServerService, private router:Router, public fb: FormBuilder) { 
        this.subscription = this.server.getMessage().subscribe(message => { this.message = message.text
        console.log(this.message)
        });
        this.header.checkToken()
        
    }

    ngOnInit() {
        //this.message = 'login'
        // this.message = 'signup'
        // this.message = 'otp'
        //  this.message = 'forgotEmail'
        //this.message = 'resetOtp'
        //this.message = 'resetpass'
        // this.message = 'forgotEmail'

            // this.message = 'otp'
            // this.timer()
        this.validateLoginForm();
        this.validateSignupForm();
        this.validateForgotForm();
        this.validateResetForm()
        this.validateEmailForgotForm()
        this.getDialCodes()
        // this.socialLogin()

        this.config = {
            displayKey:"name", //if objects array passed which key to be displayed defaults to description
            search:true ,//true/false for the search functionlity defaults to false,
            height: '292px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
            placeholder:'-Select Country-', // text to be displayed when no item is selected defaults to Select,
            customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
            limitTo: this.dialCodeArr.length ,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
            moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
            noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
            searchPlaceholder:'Search' ,// label thats displayed in search input,
            searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
          }
    }

    // on date change
    onDateChanged(event: IMyDateModel) {
       console.log(event)
    }

    // for social login
    // socialLogin() {
    //     (window as any).fbAsyncInit = function() {
    //         FB.init({
    //           appId      : '438458310050745',
    //           cookie     : true,
    //           xfbml      : true,
    //           version    : 'v3.1'
    //         });
    //         FB.AppEvents.logPageView();
    //       };
      
    //       (function(d, s, id){
    //          var js, fjs = d.getElementsByTagName(s)[0];
    //          if (d.getElementById(id)) {return;}
    //          js = d.createElement(s); js.id = id;
    //          js.src = "https://connect.facebook.net/en_US/sdk.js";
    //          fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    // }


    // loginWithFB() {
    //     var self = this;
    //     console.log("submit login to facebook");
    //     // FB.login();
    //     FB.login((response)=>
    //         {
    //           console.log('submitLogin',response);
    //           if (response.authResponse)
    //           {
    //             /* make the API call */
    //             FB.api(
    //                 "/me?fields=picture,first_name,birthday,email,last_name,gender,location", ["public_profile"],
    //                 function (response) {
    //                     if (response && !response.error) {
    //                         console.log('>>>>>',response)
    //                         /* handle the result */
    //                         self.callApiSocialLogin(response,"FACEBOOK")                 
    //                     }
    //                 }
    //             );
    //            }
    //            else
    //            {
    //            console.log('User login failed');
    //          }
    //       });
    // }

    // to call fb api
    callApiSocialLogin(response,type) {
        let data;
        if(type== "FACEBOOK") {
            data = {
                "socialId" : response.id,
                "loginType" : "GMAIL",
                "firstName" : name[0], 
                "lastName" : name[1],
                "email": response.email,
                "profilePic": response.photoUrl
            }   
        }else if(type== "GMAIL") {
            let name = response.name.split(' ')
            console.log(name)
            data = {
                "socialId" : response.id,
                "loginType" : "GMAIL",
                "firstName" : name[0], 
                "lastName" : name[1],
                "email": response.email,
                "profilePic": response.photoUrl
            }              
        }  
        if(navigator.onLine) {
            let api = this.server.postApi('user/socialLogin', data).subscribe((res)=> {
                api.unsubscribe()
                if(res.responseCode == 200) {
                    this.header.loginStatus = true;
                    this.header.getProfileDetails();
                    localStorage.setItem('user_id',res.result.userDetail)
                    localStorage.setItem('token',res.result.token)
                    if(type== "FACEBOOK") {
                        localStorage.setItem('type', 'FB')
                    }else if(type== "GMAIL") {
                        localStorage.setItem('type', 'GMAIL')
                    }
                    this.router.navigateByUrl('home')
                }
            }) 
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    signInWithGoogle(): void {
        if(navigator.onLine) {
            this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
            this.authService.authState.subscribe((user) => {
                if(user) {
                    console.log(user)
                    this.callApiSocialLogin(user,"GMAIL")
                }
            });
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    signInWithFb():void {
        if(navigator.onLine) {
            this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
            this.authService.authState.subscribe((user) => {
                if(user) {
                    console.log(user)
                    this.callApiSocialLogin(user,"FACEBOOK")
                }
            });
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
        
    }

    //  to validate resetForm 
    validateResetForm() {
        this.resetPassForm = new FormGroup ({
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]),
            confirmPassword: new FormControl('', [Validators.required]),
        }, passwordMatchValidator);

        /** Function for password match and mismatch */
        function passwordMatchValidator(g: FormGroup) {
            let pass = g.get('newPassword').value;
            let confPass = g.get('confirmPassword').value;
            if (pass != confPass) {
                g.get('confirmPassword').setErrors({ mismatch: true });
            } else {
                g.get('confirmPassword').setErrors(null)
                return null
            }
        }
    }

    /** to get the value of field  */
    get newPassword(): any {
        return this.resetPassForm.get('newPassword');
    }
    get confirmPassword(): any {
        return this.resetPassForm.get('confirmPassword');
    }

    /**Validations for signup modal */
    validateEmailForgotForm() {
        this.forgotEmailForm = new FormGroup({
            forgot_email: new FormControl('', [Validators.required]),
           
        })
    }

    /** to get the value of field  */
    get forgot_email(): any {
        return this.forgotEmailForm.get('forgot_email');
    }
    

    /**Validations for signup modal */
    validateForgotForm() {
        this.forgotForm = new FormGroup({
            forgot_password: new FormControl('', [Validators.required]),
        })
    }

    /** to get the value of field  */
    get forgot_password(): any {
        return this.forgotForm.get('forgot_password');
    }
    
    // to validate login form
    validateLoginForm() {
        this.loginForm = new FormGroup({
            email_ph: new FormControl('', [Validators.required,Validators.maxLength(64)]),
            pass: new FormControl('', [Validators.required]),
            remember_me: new FormControl(false, [Validators.required])
        })

        if(this.message == 'login' && localStorage.getItem('email') && localStorage.getItem('pass')) {
            this.loginForm.patchValue( {
                'email_ph': localStorage.getItem('email'),
                'pass': localStorage.getItem('pass'),
                'remember_me' : true
            })
        }
    }

    get email_ph(): any {
        return this.loginForm.get('email_ph');
    }
    get pass(): any {
        return this.loginForm.get('pass');
    }
    get remember_me(): any {
        return this.loginForm.get('remember_me');
    }

    // to validate sign up form
    validateSignupForm() {
        this.signupForm = new FormGroup({
            first_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
            last_name: new FormControl('', [Validators.pattern(/^[a-z ,.'-]+$/i)]),
            email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
            recovery_email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
            dateOfBirth: new FormControl('',[Validators.required]),
            terms: new FormControl(false, [Validators.required]),
            dialCode: new FormControl(''),
            selectcountry: new FormControl('',[Validators.required]),
            contact: new FormControl('',[Validators.required, Validators.minLength(8)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]),
            confirm_pass : new FormControl('',[Validators.required])
        },passwordMatchValidator)
        /** Function for password match and mismatch */
        function passwordMatchValidator(g: FormGroup) {
            let pass = g.get('password').value;
            let confPass = g.get('confirm_pass').value;
            if (pass != confPass) {
                g.get('confirm_pass').setErrors({ mismatch: true });
            } else {
                g.get('confirm_pass').setErrors(null)
                return null
            }
        }
    }

    /** to get the value of field  */
    get first_name(): any {
        return this.signupForm.get('first_name');
    }
    get last_name(): any {
        return this.signupForm.get('last_name');
    }
    get email(): any {
        return this.signupForm.get('email');
    }
    get recovery_email(): any {
        return this.signupForm.get('recovery_email');
    }
    get dateOfBirth(): any {
        return this.signupForm.get('dateOfBirth');
    }
    get password(): any {
        return this.signupForm.get('password');
    }
    get confirm_pass(): any {
        return this.signupForm.get('confirm_pass');
    }
    get terms(): any {
        return this.signupForm.get('terms');
    }
    // get dialCode(): any {
    //     return this.signupForm.get('dialCode');
    // }
    get contact(): any {
        return this.signupForm.get('contact');
    }
    get selectcountry(): any {
        return this.signupForm.get('selectcountry');
    }

    /** to get state country list  */
    getDialCodes() {
        this.server.getDialCodesJson().subscribe((res)=>{
          this.dialCodeArr = res
        })
    }

    // on login Submit 
    loginSubmit() {
        if(this.loginForm.valid) {
            let data = {
                "loginId":this.loginForm.value.email_ph,
                "password":this.loginForm.value.pass
            }
            if(navigator.onLine) {
                this.login = this.server.postApi('user/login',data).subscribe((res)=> {
                    this.login.unsubscribe()
                    // localStorage.setItem('user_id', res['result']['_id'])
                    if(res.responseCode == 200) {
                        this.loginForm.reset()
                        localStorage.setItem('token',res.result.token)
                        localStorage.setItem('user_id', res['result']['_id'])
                    
                    // remember me 
                    if(this.loginForm.value.remember_me) {
                        localStorage.setItem('email',this.loginForm.value.email_ph)
                        localStorage.setItem('pass',this.loginForm.value.pass)
                    }else {
                        localStorage.removeItem('email')
                        localStorage.removeItem('pass')
                    }
                    this.header.checkToken()
                    this.header.getProfileDetails()
                    this.router.navigateByUrl('select-lang')
                    }else if(res.responseCode == 205)  {
                        this.loginForm.reset()
                        // to send otp
                        localStorage.setItem('user_id', res['result']['_id'])
                        this.sendOTP = this.server.postApi('user/resendOtp', {}).subscribe((res) => {})
                        this.message = 'otp'
                        this.count = 59
                        this.timer()
        
                        // remember me 
                        if(this.loginForm.value.remember_me) {
                            localStorage.setItem('email',this.loginForm.value.email_ph)
                            localStorage.setItem('pass',this.loginForm.value.pass)
                        }else {
                            localStorage.removeItem('email')
                            localStorage.removeItem('pass')
                        }
                    }
                })
            }else {
                this.server.showWarnToast('Check internet connection!')
            }
            
        }  
    }

    /** to check space */
    toCheckSpace(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode == 32) {
            evt.preventDefault()
        }else {
            return true;
        }
    }   

    /** to check characters */
    toCheckSpaceChar(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if((charCode == 32) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
            evt.preventDefault()
        }else {
            return true;
        }
    }
    
    /** for checkbox value */
    checkboxValue() {
        console.log(this.signupForm.value.terms)
        this.disableCheck = this.signupForm.value.terms
        console.log(this.disableCheck)
    }
    checkboxValue2() {
        this.disableCheck2 = this.loginForm.value.remember_me
        console.log(this.disableCheck2)
    }

    /** on signup */
    register() {
        console.log(this.signupForm.value)
        if(this.signupForm.valid && this.disableCheck == false) {
        let data ={
            "firstName": this.signupForm.value.first_name,
            "lastName": this.signupForm.value.last_name,
            "email": this.signupForm.value.email,
            "secondaryEmail": this.signupForm.value.recovery_email,
            //"countryCode": this.dial,
            "phoneNumber": this.signupForm.value.contact,
            "country": this.signupForm.value.selectcountry,
            "dateOfBirth": this.signupForm.value.dateOfBirth.formatted,
            "password": this.signupForm.value.password,
            "profilePic": ''
        }      
        if(navigator.onLine) {
            this.signup = this.server.postApi('user/signup', data).subscribe((res)=> {
                this.signup.unsubscribe()
                if(res.responseCode == 200) {
                   this.signupForm.reset()
                   this.message = 'otp'
                   this.timer()
                   localStorage.setItem('user_id',res['result']['_id'])
                }
            }) 
        }else {
            this.server.showWarnToast('Check internet connection!')
        }   
       }
    }

    // to change country
    selectCountry() {
        let country = this.signupForm.value.selectcountry
        let index = this.dialCodeArr.findIndex(x=> x.name == country)
        this.signupForm.value.dialCode = this.dialCodeArr[index].dial_code
        this.dialVal = this.dialCodeArr[index].dial_code
        console.log(this.signupForm.value)
    }

     // Auto focus functionality /
    onKey(value, type) {
        if (type == 1) {
            if (value != "") {
                $('#otp2').focus();
            }
        } else if (type == 2) {
            if (value != "") {
                $('#otp3').focus();
            }
        } else if (type == 3) {
            if (value != "") {
                $('#otp4').focus();
            }
        } else if (type == 4) {
            if (value != "") {
                $('#otp5').focus();
            }
        } else if (type == 5) {
            if (value != "") {
                $('#otp6').focus();
            }
        }
    }
    
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    // to verify otp
    verifyOTP() {
        let otp = this.otp.one + this.otp.two + this.otp.three + this.otp.four
        console.log(otp)
        let data = {
            "otp": otp
        }
        if(navigator.onLine) {
            this.verifyotp = this.server.postApi('user/otpVerify', data).subscribe((res) => {
                this.verifyotp.unsubscribe()
                console.log(res)
                if (res.responseCode == 200) {
                    if(this.message == 'otp') {
                        localStorage.setItem('token', res.result)
                        this.header.checkToken()
                        this.header.getProfileDetails()
                        this.router.navigateByUrl('select-lang')
                    }else if(this.message == 'resetOtp') {
                        this.message = 'resetpass'
                    }
                    this.otp ={}
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to resend otp
    resendOtp() {
        if(navigator.onLine) {
            this.resend = this.server.postApi('user/resendOtp', {}).subscribe((res) => {
                this.resend.unsubscribe()
                if(res.responseCode == 200) {
                    this.count = 59
                    this.timer();
                    this.resendButton = false;
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    //to start timer
    timer() {
        this.const =  setTimeout(() => {
            if(this.count > 1) {
                this.hiddenTimer = false;
                this.count = this.count - 1;
                if(this.count < 10) {
                    this.hiddenTimer = true;
                } 
                this.timer();
            }else {
                this.count = 59;
                this.resendButton = true;
            }       
        },1000);
    }

    //to clear time interval and resend
    tester() {  
        this.resendButton = false;
        this.hiddenTimer = false;
        this.resendOtp();
    }

    // to show section on same page
    showSection(msg) {
        this.message = msg
    }

    // to send otp on forgot password submit
    forgotPass() {
        if(navigator.onLine) {
            this.forgot = this.server.postApi('user/forgotPassword',{'userId': this.forgotForm.value.forgot_password}).subscribe((res)=> {
                this.forgot.unsubscribe()
                if(res.responseCode == 200){
                    localStorage.setItem('user_id', res.result['_id'])
                    this.otp.one = ''
                    this.otp.two = ''
                    this.otp.three = ''
                    this.otp.four = ''
                    this.message = 'resetOtp'
                    this.timer()
                }
            })     
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to send forgot email
    forgot_Email() {
        if(navigator.onLine) {
            if(this.forgotEmailForm.valid) {
                let data = {
                    "secondaryEmail": this.forgotEmailForm.value.forgot_email,
                    
                }
                let api = this.server.postApi('user/forgotEmail', data).subscribe((res)=>{
                    api.unsubscribe()
                    if(res.responseCode == 200) {
                        this.server.showSuccToast('Primary email address send to your recovery email address')
                        this.message = 'login'
                        // this.router.navigateByUrl('dashboard')
                    }else {
                        // 205 code here
                    }
                })
    
            }else {
                this.server.showErrToast('Form not valid!')
            }
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
        
    }

    // To reset password
    resetPassApi() {
        this.reset = this.server.postApi('user/resetPassword',this.resetPassForm.value).subscribe((res)=>{
            this.reset.unsubscribe()
            if(res.responseCode == 200) {
                this.server.showSuccToast('Password reset successful!')
                //this.router.navigateByUrl('dashboard')
                //this.router.navigateByUrl('select-lang')
                this.message = 'login'
            }
        })
    }

    



}
