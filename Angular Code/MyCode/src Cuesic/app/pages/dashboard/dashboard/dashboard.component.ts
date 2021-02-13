import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../../provider/mainservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var CanvasJS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any=[];
  dash:FormGroup
  graphItem: any=[];
  constructor(public router:Router, public mainservice:MainserviceService) { }

  ngOnInit() {
    this.graph();
    this.dashboard()
    this.formValidation()
  }

  formValidation(){
    this.dash= new FormGroup({
      fromDate: new FormControl('',Validators.compose([Validators.required, Validators.pattern('')])),
      toDate: new FormControl('', Validators.compose([Validators.required, Validators.pattern('')])),
      
    })
  }

  //========graph api====//
  graphContent(){
    let data={
      'fromDate':this.dash.value.fromDate,
      'toDate':this.dash.value.toDate
    }
    this.mainservice.showSpinner();
    this.mainservice.postApi('admin/userGraphData', data, 1).subscribe((res)=>{
      console.log('graph', res);
      if(res.response_code==200){
        this.mainservice.hideSpinner();
        this.mainservice.successToast(res.response_message);
        this.graphItem=res.result;
        
      }
      if(res.response_code==404){
        this.mainservice.errorToast(res.response_message)
      }
      
    },(error)=>{
      this.mainservice.errorToast('something went wrong')
    })

  }
  graph() {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        // text: "<< 12 November 2019 - 28 july 2020 >>"
      },
      axisX: {
        title: ""
      },
      axisY: {
        title: "Amount",
        suffix: "$"
      },
      data: [{
        type: "column",
        name: "CPU Utilization",
        connectNullData: true,
        //nullDataLineDashType: "solid",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        yValueFormatString: "#,##0.##\"%\"",
        dataPoints: [
          
          { y: 55, label: "Monday" },
          { y: 50, label: "Tuesday" },
          { y: 65, label: "Wednesday" },
          { y: 95, label: "Thursday" },
          { y: 68, label: "Friday" },
          { y: 28, label: "Saturday" },
          { y: 75, label: "Sunday" }
          ]
      }]
    });
    chart.render();
  }

  dashboard(){
    this.mainservice.showSpinner();
    this.mainservice.getApi('admin/dashboard',1).subscribe((res)=>{
      console.log("dashboard", res);
      if(res.response_code==200){
      this.mainservice.hideSpinner();
      // this.mainservice.successToast(res.response_message);
      this.users=res.result.Dashboard[0].Users[0].all;
      }
    },(error)=>{
      this.mainservice.errorToast('something went wrong')
    })
  }

  graphData(){
    
  }

}
