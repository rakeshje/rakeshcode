import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare var $: any;
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  searchForm: FormGroup;
  categoryData: any = [];
  itemPerPage = 10;
  currentPage = 1;
  total: any;
  categoryId: any;
  constructor(private router: Router, public mainService: MainService) { }

  ngOnInit() {
    this.searchFormValidation()
    this.getcategoryList();
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
      this.getcategoryList()
    }
  }

  // --------- reset search form --------------- //      
  searchFormReset() {
      this.searchForm.reset();
      this.getcategoryList()
    
  }

  // ------- get list of category -------- //
  pagination(event) {
    console.log(event)
    this.currentPage = event;
    this.getcategoryList()
  }
  // ------------ get category list -------------- // 
  getcategoryList() {
    let data = {
      categoryName: this.searchForm.value.search
    }
    this.mainService.showSpinner();
    this.mainService.postApi('category/categoryList', data, 1).subscribe((res: any) => {
      console.log("get category list response ==>", res);
      if (res.responseCode == 200) {
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
        this.categoryData = res.result.docs;
      } else {
        this.mainService.hideSpinner();
        this.categoryData = [];
        this.categoryData = res.result;
        // this.mainService.errorToast(res.responseMessage);
      }
    })
  }
   // ------- add category -------- //
   addCategory() {
    this.router.navigate(['/add-category'])
  }
  editCategory(id) {
    this.router.navigate(['/edit-category'], {queryParams: {value:id}})
  }
  viewCategory(id) {
    this.router.navigate(['/view-category'], {queryParams: {value:id}})
  }


  // ------- delete category -------- //
  deleteCategoryModal(categoryId) {
    this.categoryId = categoryId
    $('#delete').modal('show')
  }
  deleteCategory() {
    let data={
      categoryId:this.categoryId
    }
    $('#delete').modal('hide')
    this.mainService.postApi('category/deleteCategory', data, 1).subscribe(success=>{
      console.log("mainserviceDeleteapi",success);
      this.getcategoryList();
    })

  }

  // export
  // export CSV
  exportCSV() {
      this.mainService.showSpinner()
      this.mainService.postApi('admin/exportCategoryToCSV',{},0).subscribe((res)=>{
        if(res.responseCode==200){
          this.mainService.hideSpinner()
          this.categoryData=res.result
    let dataArr = [];
    dataArr.push({
        sno: "S.No.",
        Name: "Category Name",
        // Added: "Category Name",
    });
  
    this.categoryData.forEach((element,ind) => {
        dataArr.push({
            sno:ind+1,
            Name:element.categoryName?element.categoryName:'--',
        })
    }) 
    new ngxCsv(dataArr, 'Category_management');
  }
})
  }
  exportPDF(){
  }
  exportXLS(){
  }
  
  

}
