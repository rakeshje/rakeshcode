import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  contactUsId: any;
  viewContactList: any;

  constructor(public router:Router, public mainservice:MainserviceService, public active:ActivatedRoute) 
  {
    this.active.params.subscribe((params)=>{
      this.contactUsId=params.id
    })
   }

  ngOnInit() {
    this.viewContact()
  }
  viewContact(){
    this.mainservice.showSpinner()
    this.mainservice.getApi('admin/contactUs/'+this.contactUsId,1).subscribe((res)=>{
      console.log("viewcontact", res);
      if(res.response_code=200){
        this.mainservice.hideSpinner();
        this.mainservice.successToast(res.response_message)
        this.viewContactList=res.result
      }
      
    },(error)=>{
      this.mainservice.errorToast('something went wrong');
      this.mainservice.hideSpinner();
    })

  }
  

}
