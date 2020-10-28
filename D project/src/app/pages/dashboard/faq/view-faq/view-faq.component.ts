import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.css']
})
export class ViewFaqComponent implements OnInit {
  faqList: any;
  userId: any;

  constructor(public mainService: MainService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((res) => {
      this.userId = res.id;
    })
    this.getFaqList()
  }

// get faq by id
  getFaqList() {
    this.mainService.showSpinner();
    this.mainService.getApi(ApiUrls.viewFaq + this.userId, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.faqList = res.result;
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }
}
