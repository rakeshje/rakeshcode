import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-add-number',
  templateUrl: './add-number.component.html',
  styleUrls: ['./add-number.component.css']
})
export class AddNumberComponent implements OnInit {
  addNumberForm: FormGroup
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.addNumberFormValidation();
  }
  addNumberFormValidation() {
    this.addNumberForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      'contactNumber': new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{3,13}$/)]),
    })
  }

  addNumber() {
    let data = {
      'title': this.addNumberForm.value.title,
      'contactNumber': this.addNumberForm.value.contactNumber
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.addHelpline, data, 1).subscribe((res: any) => {
      console.log("add helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.successToast(res.responseMessage);
        this.router.navigate(['helpline-number'])
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
}
