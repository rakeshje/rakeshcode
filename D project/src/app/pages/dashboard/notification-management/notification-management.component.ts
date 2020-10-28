import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.css']
})
export class NotificationManagementComponent implements OnInit {
  notificationForm: FormGroup;
  countryCodes: Array<any> = [];
  disabled = false;
  selectedCountryCodes: Array<any> = []
  dropdownSettings: any = {};

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.notificationFormValidation();
    this.countryCodes = [
      { item_id: '+1', item_text: 'Canada' },
      { item_id: '+7', item_text: 'Russia' },
      { item_id: '+61', item_text: 'Australian' },
      { item_id: '+64', item_text: 'New Zealand' },
      { item_id: '+77', item_text: 'Kazakhstan' },
      { item_id: '+90', item_text: 'Turkey' },
      { item_id: '+380', item_text: 'Ukraine' },
      { item_id: '+381', item_text: 'Serbia' },
      { item_id: '+382', item_text: 'Montenegro' },
      { item_id: '+385', item_text: 'Croatia' },
      { item_id: '+386', item_text: 'Slovenia' },
      { item_id: '+387', item_text: 'Bosnia and Herzegovina' },
      { item_id: '+389', item_text: 'North Macedonia' },
      { item_id: '+994', item_text: 'Azerbaijan' },
      { item_id: '+995', item_text: 'Georgia' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All Country',
      unSelectAllText: 'UnSelect All Country',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
  }
  notificationFormValidation() {
    this.notificationForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(60)]),
      'content': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'countryCode': new FormControl(''),
      'allUsers': new FormControl(false),
      'covidPositiveUsers': new FormControl(false),
      'covidNegativeUser': new FormControl(false),
      'allHospitals': new FormControl(false)
    })
  }

  notificationFormSubmit() {
    this.selectedCountryCodes = [];
    let countryCodes = this.notificationForm.value.countryCode;
    if (countryCodes) { countryCodes.forEach(element => this.selectedCountryCodes.push(element.item_id)); }
    let data = {
      'title': this.notificationForm.value.title,
      'content': this.notificationForm.value.content,
      'allUsers': this.notificationForm.value.allUsers,
      'covidPositiveUsers': this.notificationForm.value.covidPositiveUsers,
      'covidNegativeUser': this.notificationForm.value.covidNegativeUser,
      'allHospitals': this.notificationForm.value.allHospitals,
      "countryCode": this.selectedCountryCodes
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.notification, data, 1).subscribe((res: any) => {
      console.log("notification send response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.router.navigate(['dashboard'])
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
