import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.form = new FormGroup({
      "question": new FormControl('', Validators.required),
      "answer": new FormControl('', Validators.required),
    });
  }

  // add faq
  addFaq() {
    const data = {
      question: this.form.value.question,
      message: this.form.value.answer
    }
    this.mainService.showSpinner();
    this.mainService.postApi('admin/addFaq', data, 1).subscribe((res: any) => {
      console.log("add faq response ==>", res)
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
