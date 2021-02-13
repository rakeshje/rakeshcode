import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;

@Component({
  selector: 'app-sub-category-management',
  templateUrl: './sub-category-management.component.html',
  styleUrls: ['./sub-category-management.component.css']
})
export class SubCategoryManagementComponent implements OnInit {
  searchForm: FormGroup;
  subCategoryData: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  subCategoryId: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation()
    this.getSubcategoryListt();
  }
  getSubcategoryListt() {
    this.mainService.showSpinner();
    this.mainService.postApi('subCategory/subCategoryList', '', 1).subscribe((res: any) => {
      console.log("get sub category list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.subCategoryData = res.result.docs;
        console.log("data",this.subCategoryData);
        
      } else {
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage);
      }
    })
  }
  // -------- search form validation ------------ //
  searchFormValidation() {
    this.searchForm = new FormGroup({
      'search': new FormControl()
    })
  }

  // -------- search form submit -------------- //
  searchFormSubmit() {
    if (this.searchForm.value.search) {
      this.getSubcategoryList()
    }
  }

  // --------- reset search form --------------- //      
  searchFormReset() {
    if (this.searchForm.value.search) {
      this.searchForm.reset();
      this.getSubcategoryListt()
    }
  }

  // ------- get list of sub category -------- //
  pagination(event) {
    console.log(event)
    this.currentPage = event;
    // this.getSubcategoryList()
  }
  // ------------ get sub category list -------------- // 
  getSubcategoryList() {
    let data = {
      'search': this.searchForm.value.search
    }
    this.mainService.showSpinner();
    this.mainService.postApi('subCategory/subCategoryList', data, 1).subscribe((res: any) => {
      console.log("get sub category list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.subCategoryData = res.result.docs;
        console.log("data",this.subCategoryData);
        
      } else {
        this.mainService.hideSpinner();
        this.subCategoryData = [];
        this.subCategoryData = res.result;
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }

  // deleteCategoryModal() {

  //   this.mainService.postApi('',{subCategoryId:this.id},1).subscribe(success=>{

  //   })
  // }


   // ------- add sub category -------- //
   addSubCategory() {
    this.router.navigate(['/add-sub-category'])
  }
  editSubCategory(id) {
    // this.router.navigate(['/edit-sub-category', id])
  }
  viewSubCategory(id) {
    // this.router.navigate(['/view-sub-category', id])
  }


  // ------- delete sub category -------- //
  deleteSubCategoryModal(subCategoryId) {
    this.subCategoryId = subCategoryId
    $('#delete').modal('show')
  }
  deleteSubCategory() {
    this.mainService.showSpinner();
    this.mainService.deleteApi('subCategory/deleteSubCategory/'+this.subCategoryId, '', 1).subscribe(((res: any)=>{
      console.log("delete sub category response ==>",res)
      if(res.responseCode==200){
    $('#delete').modal('hide')
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.getSubcategoryListt()
      }else{
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    }))

  }
  editCategory(id)
  {
    // this.router.navigate(['/add-sub-category'])
    // this.router.navigate(['/edit-category'],{queryParams:{id:id, Name:name}})
    this.router.navigate(['/edit-sub-category'], {queryParams: {value:id}})
  }

  viewCategory(id) {
    this.router.navigate(['/view-sub-category'], {queryParams: {value:id}})
  }

  // export CSV
  exportCSV() {
    this.mainService.showSpinner()
      this.mainService.postApi('admin/exportSubCategoryToCsv',{},0).subscribe((res)=>{
        if(res.responseCode==200){
          this.mainService.hideSpinner()
          this.subCategoryData=res.result
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Name: "Sub Category Name",
        Added: "Category Name",
    });
  
    this.subCategoryData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.subCategoryName?element.subCategoryName:'--',
            Added:element.categoryId.categoryName?element.categoryId.categoryName:'--',
        })
    }) 
    new ngxCsv(dataArr, 'sub_category_management');
  }
})
  }
  exportPDF(){
  }
  exportXLS(){
  }
}
