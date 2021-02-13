import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
import { HeaderComponent } from '../header/header.component';
declare var $:any

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    myOptions: INgxMyDpOptions = {
        dateFormat: 'd/m/yyyy',
        todayBtnTxt: 'Today',
        sunHighlight: true,
        disableSince: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1}
    };
    getDetails: any;
    profileForm: any;
    mobile_code: any;
    editprofile: any;
    dialCodeArr: any=[];
    disableCheck: boolean=false;
    base64Image: any;
    upload: any;
    dialVal: any;
    type: any;
    otp: any = {};
    showSecondForm: boolean=true;
    changeEmailForm: FormGroup;
    changeNumberForm: FormGroup;
    hiddenTimer: boolean;
    resendButton: boolean= false;
    count: number=59;
    const: any;


    constructor(public server:ServerService, private router:Router,private header:HeaderComponent) { 
        if(localStorage.getItem('type')) {
            this.showSecondForm = false
        }
    }

    ngOnInit() {
        // $('#otpModal').modal({ backdrop: 'static', keyboard: false });

        window.scrollTo(0,0)
        this.checkValid();
        // this.dateValidation();
        this.getDialCodesJson()  
        this.getProfileDetails();
        this.changeEmailValidate()
        this.changeNumberValidate()
    }

    // check for validity
    changeNumberValidate() {
        this.changeNumberForm = new FormGroup({
            change_dialCode2: new FormControl('', [Validators.required]),
            change_forgot_ph: new FormControl('',[Validators.required, Validators.minLength(8)]),
        })
    }

    /** to get the value of field  */
    get change_dialCode2(): any {
        return this.changeNumberForm.get('change_dialCode2');
    }
    get change_forgot_ph(): any {
        return this.changeNumberForm.get('change_forgot_ph');
    }


    // to check validity
    changeEmailValidate() {
        this.changeEmailForm = new FormGroup({
            change_email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
        })
    }

    /** to get the value of field  */
    get change_email(): any {
        return this.changeEmailForm.get('change_email');
    }

    /** to check validity */
    checkValid() {
        this.profileForm = new FormGroup({
            first_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
            last_name: new FormControl('', [Validators.pattern(/^[a-z ,.'-]+$/i)]),
            email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
            dateOfBirth: new FormControl('', [Validators.required]),
            dialCode: new FormControl(''),
            contact: new FormControl('',[Validators.required, Validators.minLength(8)]),
        })
    }

    /** to get the value of field  */
    get first_name(): any {
        return this.profileForm.get('first_name');
    }
    get last_name(): any {
        return this.profileForm.get('last_name');
    }
    get email(): any {
        return this.profileForm.get('email');
    }
    get dateOfBirth(): any {
        return this.profileForm.get('dateOfBirth');
    }
    get dialCode(): any {
        return this.profileForm.get('dialCode');
    }
    get contact(): any {
        return this.profileForm.get('contact');
    }

    // to get profile details
    getProfileDetails() {
        if(navigator.onLine) {
            if(localStorage.getItem('token')) {
            this.getDetails = this.server.getApi('user/myProfile').subscribe((res)=> {
                this.getDetails.unsubscribe()
                let result = res.result
                let data = {
                    "first_name": result.firstName,
                    "last_name": result.lastName,
                    "email": result.email,
                    "contact": result.phoneNumber,
                    // "dateOfBirth": result.dateOfBirth,
                }
                // to set date
                if(result.dateOfBirth) {
                    let arr = result.dateOfBirth.split('/')
                    let val = arr[1]+ '/'+ arr[0]+ '/'+ arr[2]
                    let dob = new Date(val)
                    let mydate = {
                    date: {
                        year: dob.getFullYear(),
                        month: dob.getMonth() + 1,
                        day: dob.getDate()}
                    }
                    // console.log(mydate)
                    this.profileForm.patchValue({"dateOfBirth": mydate});
                }
                
                this.mobile_code = result.countryCode
                this.profileForm.patchValue(data)
                if(result.profilePic) {
                    this.server.profileImage =  result.profilePic
                }
            })
        }
        }else {
            this.server.showWarnToast('Check internet connection!')
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

    /** on signup */
    updateProfile() {
       if(this.profileForm.valid && this.disableCheck == false) {
           console.log(this.profileForm.value)
           let image
           if(this.server.profileImage == "assets/images/userImg.png") {
            //    this.profileImage = ''
               image = ''
           }else {
               image = this.server.profileImage
           }
        //    let val = this.profileForm.value.dateOfBirth
        //    if(val.date) {

        //     this.profileForm.value.dateOfBirth = val.date.month + '/' + val.date.day + '/' + val.date.year
        //    }


        let data ={
            "firstName": this.profileForm.value.first_name,
            "lastName": this.profileForm.value.last_name,
            "email": this.profileForm.value.email,
            // "countryCode": this.profileForm.value.dialCode,
            // "phoneNumber": this.profileForm.value.contact,
            "dateOfBirth": this.profileForm.value.dateOfBirth.formatted,
            "password": this.profileForm.value.pass,
            "profilePic": this.server.profileImage
        }     
        if(navigator.onLine) {
            this.editprofile = this.server.postApi('user/editProfile', data).subscribe((res)=> {
                this.editprofile.unsubscribe()
                if(res.responseCode == 200) {
                    this.router.navigateByUrl('settings');
                    this.header.getProfileDetails()
                }
            })    
        } else {
            this.server.showWarnToast('Check internet connection!')
        }
       }
    }

    /** to get state country list  */
    getDialCodesJson() {
        this.server.getDialCodesJson().subscribe((res)=>{
          this.dialCodeArr = res
        })
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
        console.log(this.profileForm.value.terms)
        this.disableCheck = this.profileForm.value.terms
    }

    // handleFileInput(event) {
    //     var self = this;
    //     if (event.target.files && event.target.files[0]) {
    //       var type = event.target.files[0].type;
    //       this.type=type
    //       if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
    //         var reader = new FileReader()
    //         reader.onload = (e) => {
    //           if (type === 'image/png' || type === 'image/jpg') {
    //             this.base64Image = e.target['result'].substring(22);
    //           } else if (type === 'image/jpeg') {
    //             this.base64Image = e.target['result'].substring(23);
    //           }
    //         //   this.uplaodFile()
    //         console.log('start');
           

    //         }
    //         reader.onloadend = (e) => {
    //             console.log('end');
    //         };
          
            
    //         reader.readAsDataURL(event.target.files[0]);
    //       } else {
    //         this.server.showErrToast("Select only jpg,jpeg and png file.");
    //         this.base64Image = "";
    //       }
    //     }
    // }

    /** To upload document 1 -- Front*/
    handleFileInput(event) {
        var self = this;
        if(event.target.files && event.target.files[0]){
            this.type = event.target.files[0].type;
            if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
               
                var reader = new FileReader()
                reader.onload = (e)=> {
                    this.base64Image = e.target['result']
                    this.uplaodFile()
                }
                reader.readAsDataURL(event.target.files[0]);

            } else {
                this.server.showErrToast("Select only jpg,jpeg and png file.");
            }
        }
    }

    // to upload file
    uplaodFile() {
        console.log('fadsf'+this.base64Image)
        if (this.type === 'image/png' || this.type === 'image/jpg') {
            this.base64Image = this.base64Image.substring(22);
        } else if (this.type === 'image/jpeg') {
            this.base64Image = this.base64Image.substring(23);
        }                  
        let data ={
            "profilePic": 'data:'+ this.type +'/;base64,'+this.base64Image
        }
        if(navigator.onLine) {
            this.upload = this.server.postApi('user/imageUpload/',data).subscribe((res)=>{
                this.upload.unsubscribe()
                this.server.profileImage = res.result
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // on destroy
    ngOnDestroy() {
        // this.upload.unsubscribe();
        // this.signup.unsubscribe();
    }

    // to change country
    selectCountry() {
        let country = this.profileForm.value.selectcountry
        let index = this.dialCodeArr.findIndex(x=> x.name == country)
        this.profileForm.value.dialCode = this.dialCodeArr[index].dial_code
        this.dialVal = this.dialCodeArr[index].dial_code
        console.log(this.profileForm.value)
    }
    
    // to open modal
    changeEmail() {
        $('#changeEmailId').modal({ backdrop: 'static', keyboard: false });
    }

    changeNumber() {
        $('#changeNumberId').modal({ backdrop: 'static', keyboard: false });
    }

    // to call api for changing email
    changeEmailApi() {
        if(this.changeEmailForm.valid) {
            let data = {
                "email":this.changeEmailForm.value.change_email,
                "type":"EMAIL"
            }
            if(navigator.onLine) {

            }else {
                let api = this.server.postApi('user/changeEmailOrPhoneNumber', data).subscribe((res)=>{
                    api.unsubscribe()
                    if(res.responseCode == 200) {
                        this.changeEmailForm.reset()
                        this.server.showSuccToast(res.responseMessage)
                        // this.navCtrl.navigateForward('personal-info')
                    }
                })
            }
        } 
    }

    // to call api for changing number
    changeNumberApi() {
        if(this.changeNumberForm.valid) {
            let data = {
                "phoneNumber": this.changeNumberForm.value.change_forgot_ph,
                "countryCode" : this.changeNumberForm.value.change_dialCode2,
                "type":"PHONE",
            }
            if(navigator.onLine) {
                let api = this.server.postApi('user/changeEmailOrPhoneNumber', data).subscribe((res)=>{
                    api.unsubscribe()
                    if(res.responseCode == 200) {
                        this.changeNumberForm.reset()
                        this.server.showSuccToast(res.responseMessage)
                        // this.navCtrl.navigateForward('personal-info')
                    }
                })
            }else {
                this.server.showWarnToast('Check internet connection!')
            }

        }
    }

    // // Auto focus functionality /
    // onKey(value, type) {
    //     if (type == 1) {
    //         if (value != "") {
    //             $('#otp2').focus();
    //         }
    //     } else if (type == 2) {
    //         if (value != "") {
    //             $('#otp3').focus();
    //         }
    //     } else if (type == 3) {
    //         if (value != "") {
    //             $('#otp4').focus();
    //         }
    //     } else if (type == 4) {
    //         if (value != "") {
    //             $('#otp5').focus();
    //         }
    //     } else if (type == 5) {
    //         if (value != "") {
    //             $('#otp6').focus();
    //         }
    //     }
    // }

    // // to verify otp
    // verifyOTP() {
    //     let otp = this.otp.one + this.otp.two + this.otp.three + this.otp.four
    //     console.log(otp)
    //     let data = {
    //         "otp": otp
    //     }
    //     let verifyotp = this.server.postApi('user/otpVerify', data).subscribe((res) => {
    //         verifyotp.unsubscribe()
    //         console.log(res)
    //         if (res.responseCode == 200) {
    //             // if(this.message == 'otp') {
    //             //     localStorage.setItem('token', res.result)
    //             //     this.header.checkToken()
    //             //     this.header.getProfileDetails()
    //             //     this.router.navigateByUrl('select-lang')
    //             // }else if(this.message == 'resetOtp') {
    //             //     this.message = 'resetpass'
    //             // }
    //         }
    //     })
    // }

    // // to resend otp
    // resendOtp() {
    //     let resend = this.server.postApi('user/resendOtp', {}).subscribe((res) => {
    //         resend.unsubscribe()
    //         if(res.responseCode == 200) {
    //             this.count = 59
    //             this.timer();
    //             this.resendButton = false;
    //         }
    //     })
    // }

    // //to start timer
    // timer() {
    //     this.const =  setTimeout(() => {
    //         if(this.count > 1) {
    //             this.hiddenTimer = false;
    //             this.count = this.count - 1;
    //             if(this.count < 10) {
    //                 this.hiddenTimer = true;
    //             } 
    //             this.timer();
    //         }else {
    //             this.count = 59;
    //             this.resendButton = true;
    //         }       
    //     },1000);
    // }

    // //to clear time interval and resend
    // tester() {  
    //     this.resendButton = false;
    //     this.hiddenTimer = false;
    //     this.resendOtp();
    // }




}
