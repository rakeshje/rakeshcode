import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-view-sub-admin',
  templateUrl: './view-sub-admin.component.html',
  styleUrls: ['./view-sub-admin.component.css']
})
export class ViewSubAdminComponent implements OnInit {
  userId: any;
  user: any;
  permission: any;
  myPermission: any =[];

  constructor(private activatedroute : ActivatedRoute , private mainService : MainserviceService) { }

  ngOnInit() {
   this.activatedroute.params.subscribe((res)=>{
     this.userId = res.id;
     console.log('userId', this.userId);
   });
   this.viewUser()
  }

  viewUser(){
     this.mainService.getApi('admin/viewSubAdmin/'+ this.userId ,1).subscribe((res)=>{
       console.log('response of user', res);
       if(res.response_code == 200){
         this.user = res.result;
         this.permission = res.result.permissions[0];
         var result = Object.entries(this.permission)
         for(var i = 0; i < result.length; i++) {
           for(var z = 0; z < result[i].length; z++) {
               if(result[i][z] == true){
                 this.myPermission.push(result[i]);
               }
           }
         }
       }
       else{
         this.mainService.errorToast(res.response_message)
       }
     })
   }

}
