import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-practitioner',
  templateUrl: './view-practitioner.component.html',
  styleUrls: ['./view-practitioner.component.css']
})
export class ViewPractitionerComponent implements OnInit {
  userId: any;
  viewData: any;

  constructor(public mainService: MainService, public active:ActivatedRoute)
   {
     this.active.queryParams.subscribe((params)=>{
       this.userId=params.value
       console.log('hfhf', this.userId);
       
     })
    }

  ngOnInit() {
    this.viewPractioner();
  }
  // view practioner
  viewPractioner(){
    
    this.mainService.showSpinner();
    this.mainService.getApi('admin/viewPractitioner?userId='+this.userId,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.viewData=res.result
      }
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })

  }

}
