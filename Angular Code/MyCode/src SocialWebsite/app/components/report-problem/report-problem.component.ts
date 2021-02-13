import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
declare var $:any

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {
  reason='';
  description=''
  type: any;
  constructor(public service:ServerService) { }

  ngOnInit() {
    // this.openModal()
  }

  // openModal(){
  //   $('#itemreport').modal('show')
  // }

  submitReport(){
    this. type = { fraud: "FROUD", notGoodQuality: "NOT GOOD QUALITY", other: "OTHER" };
    if (!this.reason)
      return;
    let data ={
      "userId": localStorage.getItem('user_id'),
      "query":this.description

    }
    this.service.postApi('user/reportQuery', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage),
        this.description='',
         this.reason=''
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })
    
  }

}
