import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-static-page-management',
  templateUrl: './static-page-management.component.html',
  styleUrls: ['./static-page-management.component.css']
})
export class StaticPageManagementComponent implements OnInit {
  StaticContentList: any = [];

  constructor(private service: MainService, public router:Router, private spinner: NgxSpinnerService) {  }

  ngOnInit() {
    this.Getlist();
  }

  Getlist(){
    
    this.service.getApi('static/staticPageList', 1).subscribe(success => {
      console.log("success",success);
      if(success.responseCode == 200) {
        this.StaticContentList = success.result;
       console.log("sdfgasd",this.StaticContentList)
      }
      else {
        this.service.hideSpinner();
      }
    })
  }

  Getlist1(){
    
    this.service.getApi('static/staticPageList', 1).subscribe(success => {
      console.log("success",success);
      if(success.responseCode == 200) {
        this.StaticContentList = success.result;
       console.log("sdfgasd",this.StaticContentList)
      }
      else {
        this.service.hideSpinner();
      }
    },(error)=>{
       this.service.errorToast("something went wrong")
    })
  }

  gotoEditstatic(data){
    console.log("dj", data);
    
    this.router.navigate(['/edit-static-page'],{queryParams:{value:JSON.stringify(data)}})
  }

  gotoViewstatic(data) {
    this.router.navigate(['/view-static-page'],{queryParams: {value:JSON.stringify(data)}})
  }
  

}
