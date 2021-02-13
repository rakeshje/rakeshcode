import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacydata: any;

  constructor(public service:ServerService,public route:Router) { }

  ngOnInit() {
    this.privacy();
  }

  privacy(){
    let data ={
      "type":'PRIVACY'
    }
    this.service.postApi('staticPage/staticApi', data).subscribe((res)=>{
      console.log("privacy", res)
      this.privacydata=res.success
      console.log("privacy", this.privacydata)

    })
  }

}
