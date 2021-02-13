import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-help-center',
  templateUrl: './view-help-center.component.html',
  styleUrls: ['./view-help-center.component.css']
})
export class ViewHelpCenterComponent implements OnInit {
  id: any;
  viewData: any=[];

  constructor(private activatedRoute:ActivatedRoute, private router: Router, private mainService:MainService) {
    this.activatedRoute.queryParams.subscribe(success => {
      this.id=success.id
      console.log("fdfgdfgdfgdfgdfgdfsgdsfgfg",success);
    });
   }

  ngOnInit() {
    this.getHelpData();
  }
  getHelpData() {
    this.mainService.showSpinner();
    this.mainService.getApi('helpCenter/viewHelpCenter/'+this.id, 1).subscribe(success=>{
      console.log("kjug98kjghiluhgbilo89",success)
      this.viewData = success.result;
      this.mainService.hideSpinner();
    })
  }

}
