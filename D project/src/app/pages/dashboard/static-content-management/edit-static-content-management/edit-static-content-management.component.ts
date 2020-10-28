import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-edit-static-content-management',
  templateUrl: './edit-static-content-management.component.html',
  styleUrls: ['./edit-static-content-management.component.css']
})
export class EditStaticContentManagementComponent implements OnInit {
  userId: any;
  result: any;
  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };
  form: FormGroup;
  editorValue;
  type: any;

  constructor(private activatedroute: ActivatedRoute, private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((res) => {
      this.userId = res.id;
      this.type = res.type
      console.log('userId', this.userId, this.type, res);

    });
    this.form = new FormGroup({
      "editorValue": new FormControl('', ([Validators.required])),
      "Title": new FormControl('', ([Validators.required, Validators.minLength(3), Validators.pattern(/^[^\s][A-Za-z&\s]*$/)]))
    });
    this.viewStaticData()
  }

  viewStaticData() {
    this.mainService.showSpinner();
    this.mainService.getApi(ApiUrls.viewStaticContent + this.type, 1).subscribe((res: any) => {
      console.log("get static content management list response ==>", res)
      if (res.responseCode == 200) {
        this.result = res.result;
        setTimeout(() => {
          this.form.patchValue({
            Title: this.result.title,
            editorValue: this.result.description
          });
          this.mainService.hideSpinner();
        }, 1000);

        this.mainService.successToast(res.responseMessage);
      } else {

        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  Update() {
    const description = this.form.value.editorValue
    let data = {
      'staticId': this.userId,
      "title": this.form.value.Title,
      "description": description.slice(3, (description.length - 5))
    }
    console.log('data', data)
    this.mainService.showSpinner();
    this.mainService.putApi(ApiUrls.editStaticContent, data, 1).subscribe((res: any) => {
      console.log("edit static content management response ==>", res)
      if (res.responseCode == 200) {
        this.mainService.successToast(res.responseMessage);
        this.router.navigate(['/static-content-management'])
      } else {

        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
