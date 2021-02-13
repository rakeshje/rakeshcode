import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { MainService } from 'src/app/provider/main.service';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css']
})
export class ViewNotificationComponent implements OnInit {
  Id: any;
  notificationData: any;

  constructor( public service: MainService,public activatedrouted:ActivatedRoute) { }

  ngOnInit() {
    this.activatedrouted.params.subscribe((res:any)=>{
      this.Id=res.id
    })
    this.getNotificatins()
  }
getNotificatins(){
  this.service.showSpinner()
  this.service.getApi(`admin/viewNotification?notificationId=${this.Id}`,1).subscribe((res:any)=>{
    if(res.responseCode==200){
      this.service.hideSpinner()
      console.log(res)
      this.service.successToast(res.responseMessage)
      this.notificationData =res.result
      console.log(this.notificationData)
    }else{
      this.service.hideSpinner()
      this.service.errorToast(res.responseMessage)
    }
  }, (error) => {
    this.service.hideSpinner()
  })
}
}
