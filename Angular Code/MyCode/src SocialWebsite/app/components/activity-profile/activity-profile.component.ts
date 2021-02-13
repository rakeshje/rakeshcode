import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
declare var $: any
@Component({
  selector: 'app-activity-profile',
  templateUrl: './activity-profile.component.html',
  styleUrls: ['./activity-profile.component.scss']
})
export class ActivityProfileComponent implements OnInit {
  activityData: any = [];
  commented_id: any;
  _id: any;
  id: any;

  constructor(public route: Router, public service: ServerService) { }

  ngOnInit() {
    this.activity()
  }

  // Api integrate for Activity

  activity() {
    this.service.showSpinner();
    this.service.postApi('user/activityLogForWeb', { 'senderId': localStorage.getItem('user_id') }).subscribe((res) => {
      console.log("my activity data", res)
      if (res.responseCode == 200) {
        this.service.hideSpinner();
        this.activityData = res.result
        console.log("my activity data", this.activityData)
        this.service.showSuccToast(res.responseMessage)
      }
    }, (error) => {
      this.service.showErrToast("Something went wrong")
    })

  }

 

  activityModal(data) {
    $('#activityModal').modal('show')
    this.id=data;
    // this.delete();
  }

  // activityModal1(id) {
   
  //   this.commented_id = id
  //   console.log('iddddd',id)
  //   // $('#activityModal1').modal('show')
  // }

  

   delete() {
     let data={
       "webId":this.id
     }
  this.service.postApi('user/deleteActivity',data).subscribe((res)=>{
    if(res.responseCode==200){
      $('#activityModal').modal('hide')
      this.activity();
      this.service.showSuccToast(res.responseMessage)
    }
  },(error)=>{
    this.service.showErrToast("something went wrong")
  })

    
  }


}
