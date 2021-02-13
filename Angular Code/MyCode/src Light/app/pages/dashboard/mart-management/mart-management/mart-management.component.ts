import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as jsPDF from 'jspdf';
declare var $: any;

@Component({
  selector: 'app-mart-management',
  templateUrl: './mart-management.component.html',
  styleUrls: ['./mart-management.component.css']
})
export class MartManagementComponent implements OnInit {

  searchForm: FormGroup;
  martData: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  martId: any;
  categoryId: any;
  whichmodal: string;
  particularUserData: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation()
    this.getMartList();
  }
  // -------- search form validation ------------ //
  searchFormValidation() {
    this.searchForm = new FormGroup({
      'search': new FormControl()
    })
  }

  // -------- search form submit -------------- //
  searchFormSubmit() {
      this.getMartList()
  }

  // --------- reset search form --------------- //      
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset();
      this.getMartList()
    }
  }

  // ------- get list of mart -------- //
  pagination(event) {
    console.log(event)
    this.currentPage = event;
    this.getMartList()
  }
  // ------------ get mart list -------------- // 
  getMartList() {
    let data = {
      'search': this.searchForm.value.search
    }
    this.mainService.showSpinner();
    this.mainService.postApi('mart/martList', data, 1).subscribe((res: any) => {
      console.log("get mart list response ==>", res);
      if (res.responseCode == 200) {
        this.martData = res.result.docs;
        this.mainService.hideSpinner();
        // this.mainService.successToast(res.responseMessage);
      } else {
        this.martData = [];
        this.martData = res.result;
        this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }
   // ------- add mart -------- //
   addMart() {
    this.router.navigate(['/add-mart'])
  }
  editMart(id) {
    this.router.navigate(['/edit-mart'], {queryParams: {id:id}})
  }
  viewMart(id) {
    console.log("dfgdfg788967dfhgdfg",id);   
    // this.router.navigate(['/view-category'], {queryParams: {value:id}}) 
    this.router.navigate(['/view-mart'], {queryParams: {id:id}})
  }


// ------- active mart -------- //
activeMartModal() {
  $('#active').modal('show')
}
activeMart() {
  $('#active').modal('hide')
}

// ------- inactive mart  -------- //
inActiveMartModal() {
  $('#inActive').modal('show')

}
inActiveMart() {
  $('#inActive').modal('hide')

}

enableDisableOrDeleteOpenModal (data, whichModal) {
  console.log("Data >>>>> ",data)
  if (whichModal === 'enable') {
    this.whichmodal = 'enable';
  } else {
    if (whichModal === 'disable') {
      this.whichmodal = 'disable';
    } else {
      this.whichmodal = 'delete';
    }
  }
  this.particularUserData = data;
  $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
}

anableDisable(enableorDisable) {
  if (enableorDisable === 'disable') {
    console.log("Inside Disable Block")
    this.disableCategory(this.particularUserData);
    $('#enableDisableDeleteModal').modal('hide');
    this.getMartList();
  } else {
    if (enableorDisable === 'enable') {
      console.log("Inside Enable Block")
      this.enableCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getMartList();
    } else {
      console.log("Inside Delete Block")
      // this.deleteCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.getMartList();
    }
  }
}

disableCategory(data) {
  let dataa={
    martId:data,
  }
  console.log("jhgjhfg",dataa);
  
  this.mainService.showSpinner();
  this.mainService.postApi('mart/activeInactiveMart', dataa,  1).subscribe(success => {
    if(success.response_code == 200) {
      this.mainService.hideSpinner();
      this.getMartList()
    }
    else {
      this.mainService.hideSpinner();
    }
  })
}
enableCategory(data) {
  let dataa={
    martId:data,
  }
  console.log("jhgjhfg",dataa);
  this.mainService.showSpinner();
  this.mainService.postApi('mart/activeInactiveMart', dataa,  1).subscribe(success => {
    if(success.response_code == 200) {
      this.mainService.hideSpinner();
      this.getMartList();
    }
    else {
      this.mainService.hideSpinner();
    }
  })
}


exportCSV() {
  this.mainService.showSpinner()
  this.mainService.postApi('admin/exportMartToCSV',{},0).subscribe((res)=>{
    if(res.responseCode==200){
      this.mainService.hideSpinner()
      this.martData=res.result
  let dataArr = [];
  dataArr.push({
      sno: "S.No.",
      name: "Mart Name",
      status: "Status",
  });

  this.martData.forEach((element,ind) => {
      dataArr.push({
          sno:ind+1,
          name:element.martName?element.martName:'--',
          status:element.status?element.status:'--',
      })
  }) 
  new ngxCsv(dataArr, 'Mart_Management');
}
  })
}

exportPDF() {
  
  console.log("hgjfjhgf");
  const doc = new jsPDF;
  doc.text('Hello', 15, 15);

  doc.save('coupon.pdf');
  
}



  exportXLS(){
  }
}
