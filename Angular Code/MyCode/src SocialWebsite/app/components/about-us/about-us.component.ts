import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutdata: any;

  constructor(public service:ServerService, public route:Router) { }

  ngOnInit() {
    this.about()
  }

  about(){
    let data ={
      "type":'ABOUT_US'
    }
    this.service.postApi('staticPage/staticApi', data).subscribe((res)=>{
      console.log("privacy", res)
      this.aboutdata=res.success
      console.log("privacy", res)

    })
  }
}
