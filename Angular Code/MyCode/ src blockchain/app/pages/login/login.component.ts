import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  Obj: { 'email': any; };

  constructor(
    private router : Router,

    private fb: FormBuilder,
    private http : HttpClient,
    public service : MainService
    ) { }

  ngOnInit() {
    this.formValidation()
}

// =======form validation====//
formValidation(){
  this.loginForm= new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)]),
    'password': new FormControl('',[Validators.required]),
    'rememberMe': new FormControl('',[Validators.required]),
  })
}

onLogin(){
  this.service.showSpinner();
  this.service.post("auth", {
    email : this.loginForm.value.email,
    password : this.loginForm.value.password
  }).subscribe(
    (res : any)=>{
     
       this.service.hideSpinner();
       if(res['status'] == '200'){
       localStorage.setItem('Auth',res['data']['token']);
       this.service.toasterSucc('login successful')

       if(this.loginForm.value.rememberMe==true){
        let remData={
          "email":this.loginForm.value.email,
          "password":window.btoa(this.loginForm.value.password)
        }
        localStorage.setItem('rememberMe',JSON.stringify(remData))
  
    }

       this.service.changeLoginSub('login');
    
       this.router.navigate(['dashboard']);
       }
    },
    (err : any)=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    }
  )
this.Obj={
 'email' : this.loginForm.value.email,

}

  localStorage.setItem('data',JSON.stringify(this.Obj));
  
}

}
