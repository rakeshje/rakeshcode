import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-email-template',
  templateUrl: './view-email-template.component.html',
  styleUrls: ['./view-email-template.component.css']
})
export class ViewEmailTemplateComponent implements OnInit {
  id: any;
  viewdata: any;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
      console.log("ff", this.id);
      
    })
   }

  ngOnInit() {
    this.viewEmailTemplate()
  }

  viewEmailTemplate(){
    let  templateId=this.id
    console.log("f",templateId);
    
    this.service.showSpinner()
    this.service.getApi('emailTemplate/emailTemplates/'+templateId,1).subscribe((res)=>{
      console.log("dkd",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.viewdata=res.result
      }
      
    },(errro)=>{
      this.service.errorToast("something went wrong")
    })
    
  }

}
