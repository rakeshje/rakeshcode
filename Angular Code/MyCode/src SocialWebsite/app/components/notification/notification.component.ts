import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationData: any=[];
  Total: any;

  constructor(public route:Router, public service:ServerService) { }

  ngOnInit() {
    this.notification();
    

  }

  // api of notification
  notification(){
    this.service.showSpinner();
    let data={
      "userId": localStorage.getItem('user_id')
    }
    console.log("hggf", data)

    this.service.postApi('user/notificationForWeb',data).subscribe((res)=>{
      console.log("my data",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.service.showSuccToast(res.responseMessage);
        this.notificationData=res.result.docs;
        this.Total=res.result.total
        // for date send to header via service
        this.service.sendMessage(this.Total)
    
        console.log("my notiification", this.notificationData, "total", this.Total)
      }
    },(error)=>{
      this.service.showErrToast('something went wrong')
    })
  
  }

  // delete notification
  delete(id){
    let data={
      "webId":id
    }
    this.service.postApi('user/deleteNotification', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage)
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })
    this.notification()
  }

}
