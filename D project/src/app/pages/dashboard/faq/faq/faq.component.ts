import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  searchForm: FormGroup;
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  helplineId: any
  faqList: any = [];
  faqId: any;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getFaqList()
  }

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  searchFormSubmit() {
    if (this.searchForm.value.search) {
      this.getFaqList()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset();
      this.getFaqList()
    }
  }

  pagination(event) {
    console.log(event)
    this.currentPage = event;
    this.getFaqList()
  }

  // ------- get helpline number list -------- //
  getFaqList() {
    const data = {
      page: this.currentPage,
      limit: this.itemPerPage
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.faqList, data, 1).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this.faqList = res.result.docs ? res.result.docs : '';
        this.total = res.result.total;
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.faqList = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  addFaq() {
    this.router.navigate(['add-faq'])
  }
  viewUser() {
    this.router.navigate(['view-faq'])
  }
  editFaq() {
    this.router.navigate(['/edit-faq'])

  }
  
  deleteFaqModal() {
    $('#delete').modal('show')
  }

  deleteFaq() {
    const data = {
      faqId: this.faqId
    }
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteFaq, data, 1).subscribe((res: any) => {
      $('#delete').modal('hide')
      if (res.responseCode == 200) {
        this.faqList = res.result;
        this.getFaqList()
        this.mainService.successToast(res.responseMessage);
        setTimeout(() => {
          this.mainService.hideSpinner();
        }, 1000);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }



}
