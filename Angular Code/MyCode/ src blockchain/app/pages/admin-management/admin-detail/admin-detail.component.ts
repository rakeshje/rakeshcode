import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  userId: any;
  viewData: any;
  imageUrl: any;

  constructor(public route:Router, public service:MainService, public active:ActivatedRoute)
  {
    this.active.params.subscribe((params)=>{
      this.userId=params.id
    })
   }

  ngOnInit(): void {
    this.viewAdmin();
  }

  viewAdmin(){
    this.service.showSpinner();
    var url="account/admin/user-management/user-details?userId="+this.userId;
    this.service.get(url).subscribe((res:any)=>{
      console.log("gf", res);
      if(res.status==200){
        this.service.hideSpinner();
        this.viewData=res.data
        this.imageUrl=res.data.imageUrl
      }
      
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }


}
