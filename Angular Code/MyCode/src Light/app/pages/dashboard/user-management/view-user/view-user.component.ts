import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  id: any;
  editdata: any;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("dffhj", this.id);
      
    })
   }

  ngOnInit() {
    this.viewUser()
  }
//==============view user=======//

  viewUser(){
    let userId=this.id
    this.service.showSpinner()
    this.service.getApi('admin/viewUser/'+userId,1).subscribe((res)=>{
      console.log("dd",res);
      if(res.responseCode==200){
        this.service.hideSpinner();
        this.editdata=res.result
      }
    },(error)=>{
      this.service.errorToast('something went wrong')
    })

  }

}
