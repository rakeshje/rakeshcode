import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  form: FormGroup;
  faqList: any;
  faqId: any;

  constructor(public mainService: MainService, private activatedroute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((res) => {
      this.faqId = res.id;
    })
    this.form = new FormGroup({
      "question": new FormControl('', Validators.required),
      "answer": new FormControl('', Validators.required),
    });
    this.getFaqList()
    console.log('form data', this.form);

  }

  getFaqList() {
    this.mainService.showSpinner();
    this.mainService.getApi(ApiUrls.viewFaq + this.faqId, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.faqList = res.result;
        this.form.patchValue({
          "question": this.faqList.question,
          "answer": this.faqList.message
        })
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  editFaq() {
    const data = {
      question: this.form.value.question,
      message: this.form.value.answer,
      "faqId": this.faqId
    }
    this.mainService.showSpinner();
    this.mainService.putApi(ApiUrls.editFaq, data, 1).subscribe((res: any) => {
      console.log("helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.router.navigate(['faq'])
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
