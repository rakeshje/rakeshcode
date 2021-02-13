import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userDetail: any;

  constructor(public service: MainService) { }

  ngOnInit() {
    this.myProfile();
  }

  // Api of my-profile
  
  myProfile(){
    var url = 'account/my-account';
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
    
      this.service.hideSpinner();
      if(res['status']== 200){      
       this.userDetail = res['data']
      }else {
        this.service.toasterErr(res['message']);
      }
    },err=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
  }

}