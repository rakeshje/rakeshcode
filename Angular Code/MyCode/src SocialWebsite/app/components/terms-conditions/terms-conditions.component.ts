import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  // privacydata: any=[];
  termsdata: any=[];

  constructor(public service:ServerService, public route:Router) { }

  ngOnInit() {
    this.TERMS()
  }

  TERMS(){
    let data ={
      "type":'TERMS'
    }
    this.service.postApi('staticPage/staticApi', data).subscribe((res)=>{
      console.log("privacy", res)
      this.termsdata=res.success
      console.log("privacy", res)

    })
  }
}
