import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: any;
  user: any;

  constructor(private activatedroute : ActivatedRoute , private mainService : MainserviceService) { }

  ngOnInit() {
   this.activatedroute.params.subscribe((res)=>{
     this.userId = res.id;
     console.log('userId', this.userId);
   });
   this.viewUser()
  }

  viewUser(){
    const data = {
      userId : this.userId
    }
     this.mainService.postApi('admin/viewUser',data ,1).subscribe((res)=>{
       console.log('response of user', res);
       if(res.response_code == 200){
         this.user = res.result;
         console.log('user data', this.user);

       }
       else{
         this.mainService.errorToast(res.response_message)
       }
     })
   }

}
