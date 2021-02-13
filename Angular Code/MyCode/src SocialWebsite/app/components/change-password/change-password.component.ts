import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup
  constructor(public service:ServerService, public route:Router) { }

  ngOnInit() {
    this.checkFormValidation()
  }
  checkFormValidation(){
    this.changePasswordForm= new FormGroup({
     "old": new FormControl('', Validators.required),
     "new": new FormControl('', Validators.required),
     "confirm": new FormControl('', Validators.required)
    })
  }

  changePassword(){
    let data ={
      "newPassword":'',
      "confirmPassword":'',
      "oldPassword":''
    }
  }

}
