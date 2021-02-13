import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;

  constructor() { }

  ngOnInit(){
    this.otpForm = new FormGroup({
    'otp': new FormControl('')
    })
    }
  }
  


