import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactdata: any;

  constructor(public service:ServerService) { }

  ngOnInit() {
    this.contact()
  }

  contact(){
    let data ={
      "type":'CONTACT_US'
    }
    this.service.postApi('staticPage/staticApi', data).subscribe((res)=>{
      console.log("CONTACT_US", res)
      this.contactdata=res.success
      console.log("CONTACT_US", this.contactdata)

    })
  }
}
