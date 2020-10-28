import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any;

@Component({
  selector: 'app-helpline-number',
  templateUrl: './helpline-number.component.html',
  styleUrls: ['./helpline-number.component.css']
})
export class HelplineNumberComponent implements OnInit {
  searchForm: FormGroup;
  helplineNumberList: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  helplineId: any
  helplineIds: any = [];
  isCheckedAll: any = false;

  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation();
    this.getHelplineNumberList()
  }

  searchFormValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  searchFormSubmit() {
    if (this.searchForm.value.search) {
      this.getHelplineNumberList()
    }
  }
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset({
        search: ''
      });
      this.getHelplineNumberList()
    }
  }

  pagination(event) {
    this.helplineIds = []
    this.isCheckedAll = false
    this.currentPage = event;
    this.getHelplineNumberList()
  }

  // ------- get helpline number list -------- //
  getHelplineNumberList() {
    let data = {
      'search': this.searchForm.value.search,
      'page': this.currentPage,
      'limit': this.itemPerPage
    }
    this.mainService.showSpinner();
    this.mainService.postApi(ApiUrls.helplineList, data, 1).subscribe((res: any) => {
      console.log("helpline number list response ==>", res)
      if (res.responseCode == 200) {
        this.total = res.result.total;
        this.helplineNumberList = res.result.docs ? res.result.docs : '';
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.total = res.result.total ? res.result.total : '';
        this.helplineNumberList = res.result
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // add helpline number
  addHelpline() {
    this.router.navigate(['add-number'])
  }
  editHelpline(helplineId) {
    this.router.navigate(['/edit-number'], { queryParams: { helplineId: helplineId } })
  }


  // delete helpline number 
  deleteHelplineModal(helplineId) {
    this.helplineId = helplineId
    $('#deleteHelplineNumber').modal('show')
  }

  deleteHelpline() {
    const data = {
      "_id": this.helplineId
    }
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteHelpline, data, 1).subscribe((res: any) => {
      console.log("delete helpline number response ==> ", res)
      $('#deleteHelplineNumber').modal('hide')
      if (res.responseCode == 200) {
        this.getHelplineNumberList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

  // ----------------------- delete multiple helpline number --------------------------- //
  setAllCheckboxes(event) {
    this.helplineIds = []
    this.isCheckedAll = event.target.checked
    if (this.isCheckedAll) {
      this.helplineNumberList.forEach((element, index) => {
        this.helplineNumberList[index].isChecked = true;
        this.helplineIds.push(this.helplineNumberList[index]._id);
      });
    }
    else {
      this.helplineIds = []
      this.helplineNumberList.forEach((element, index) => {
        this.helplineNumberList[index].isChecked = false;
      });
    }
  }
  onCheckboxChange(event) {
    if (event.target.checked) {
      this.helplineIds.push(event.target.value);
    } else {
      const index: number = this.helplineIds.indexOf(event.target.value);
      if (index !== -1) { this.helplineIds.splice(index, 1) }
    }
    this.checkIfAllSelected();
  }
  checkIfAllSelected() {
    if (this.helplineNumberList.length == this.helplineIds.length)
      return this.isCheckedAll = true;
    return this.isCheckedAll = false;
  }

  deleteMultiHelplineModal() {
    if (this.helplineIds.length < 1)
      return this.mainService.infoToast('Please select item to delete.')
    $('#deleteMultiHelplineNumber').modal('show')
  }
  deleteMultiHelpline() {
    const data = {
      "helplineId": this.helplineIds
    }
    console.log(data)
    this.mainService.showSpinner();
    this.mainService.deleteApi(ApiUrls.deleteMultiHelpline, data, 1).subscribe((res: any) => {
      console.log("delete helpline number response ==> ", res)
      $('#deleteMultiHelplineNumber').modal('hide')
      if (res.responseCode == 200) {
        this.getHelplineNumberList()
        this.mainService.successToast(res.responseMessage);
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    })
  }

}
