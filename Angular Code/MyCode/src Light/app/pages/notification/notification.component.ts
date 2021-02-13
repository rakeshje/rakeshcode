import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationData: any=[];

  constructor(public router:Router,public service:MainService) { }

  ngOnInit() {
    this.notificationList()
  }
//========notifications=====//
  notificationList(){
    this.service.showSpinner();
    this.service.getApi('admin/viewNotification', 1).subscribe((res)=>{
      console.log("fj",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.service.successToast(res.responseMessage)
        this.notificationData=res.result;
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }
//==========clear all notifications====//
  clearAll(){
    this.service.showSpinner();
    this.service.getApi('admin/clearNotifications', 1).subscribe((res)=>{
      console.log("fj",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.service.successToast(res.responseMessage)
        this.notificationList();
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }

  //==========clear  notifications====//
  clear(id){
    let data={
      notificationId:id
    }
    this.service.showSpinner();
    this.service.postApi('admin/clearNotification',data, 1).subscribe((res)=>{
      console.log("fj",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.service.successToast(res.responseMessage)
        this.notificationList()
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }
  

}
