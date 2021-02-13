import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
resetPassword : FormGroup;
  constructor() { }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      password         : new FormControl('', [Validators.required]),
      confirmPassword  : new FormControl('', [Validators.required])
    });
  }

}
