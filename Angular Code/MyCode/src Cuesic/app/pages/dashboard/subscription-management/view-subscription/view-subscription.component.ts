import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-view-subscription',
  templateUrl: './view-subscription.component.html',
  styleUrls: ['./view-subscription.component.css']
})
export class ViewSubscriptionComponent implements OnInit {
  subscriptionId: any;
  subscriptionData: any;

  constructor(private activatedroute : ActivatedRoute , private mainService : MainserviceService) 
  { this.activatedroute.params.subscribe((params)=>{
    this.subscriptionId = params.id;
    console.log('userId', this.subscriptionId);
  });}

  ngOnInit() {
   this.viewSubscription()
  }

  viewSubscription(){
     
     this.mainService.getApi('admin/subscription/'+this.subscriptionId ,1).subscribe((res)=>{
       console.log('response of user', res);
       if(res.response_code == 200){
         this.subscriptionData = res.result;
         console.log('user data', this.subscriptionData);

       }
       else{
         this.mainService.errorToast(res.response_message)
       }
     })
   }

}
