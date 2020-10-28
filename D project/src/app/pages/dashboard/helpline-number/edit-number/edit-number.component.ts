import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-edit-number',
  templateUrl: './edit-number.component.html',
  styleUrls: ['./edit-number.component.css']
})
export class EditNumberComponent implements OnInit {

  editNumberForm: FormGroup
  helplineId: any;
  constructor(private route: ActivatedRoute, private router: Router, public mainService: MainService) {
    this.route.queryParams.subscribe((res: any) => {
      if (res.helplineId) { this.helplineId = res.helplineId }
    })
  }

  ngOnInit() {
    this.addNumberFormValidation();
    this.getHelplineNumber()
  }
  addNumberFormValidation() {
    this.editNumberForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      'contactNumber': new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[1-9][0-9]{3,13}$/)]),
    })
  }

  // get helpline number by id
  getHelplineNumber() {
    let data = {
      'helplineId': this.helplineId
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.viewHelpline, data, 1).subscribe((res: any) => {
      console.log("get helpline number by id response ==>", res)
      if (res.responseCode == 200) {
        this.editNumberForm.patchValue({
          'title': res.result.docs[0].title,
          'contactNumber': res.result.docs[0].contactNumber
        })
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // edit helpline number
  editNumber() {
    let data = {
      'helplineId': this.helplineId,
      'title': this.editNumberForm.value.title,
      'contactNumber': this.editNumberForm.value.contactNumber
    }
    this.mainService.showSpinner();
    this.mainService.putApi(ApiUrls.editHelpline, data, 1).subscribe((res: any) => {
      console.log("edit helpline number response ==>", res)
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
