import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.css']
})
export class ViewFaqComponent implements OnInit {
  id: any;
  viewData: any;

  constructor(public router:Router, public service:MainService, public active:ActivatedRoute) { 
    this.active.queryParams.subscribe((params)=>{
      this.id=params.id
    })
  }

  ngOnInit() {
    this.viewFaq()
  }

  // view Faq
  viewFaq(){
    let faqId=this.id
    this.service.showSpinner()
    this.service.getApi('faq/faqs/'+faqId,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.viewData=res.result
        console.log("e", this.viewData);
        
      }
    })
  }

}
