import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-terms',
  templateUrl: './view-terms.component.html',
  styleUrls: ['./view-terms.component.css']
})
export class ViewTermsComponent implements OnInit {
  type: any;
  result: any;

  constructor(private activatedroute :ActivatedRoute,private mainService:MainService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((res:any)=>{
      this.type=res.type
    })
    this.getStaticData()
  }
  getStaticData(){
    this.mainService.showSpinner();
    this.mainService.getApi(`static/viewStaticPage?type=${this.type}`, 1).subscribe((res: any) => {
      console.log("get user management list response ==>", res)
      if (res.responseCode == 200) {
        this.result = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.successToast(res.responseMessage);
      } else {
        this.result = res.result ? res.result : ''
        this.mainService.hideSpinner();
        this.mainService.errorToast(res.responseMessage)
      }
    }, (error) => {
      this.mainService.hideSpinner()
    })
  }
  }
 

