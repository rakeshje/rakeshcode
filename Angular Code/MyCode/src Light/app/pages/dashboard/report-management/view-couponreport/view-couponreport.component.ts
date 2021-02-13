import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var CanvasJS: any;

@Component({
  selector: 'app-view-couponreport',
  templateUrl: './view-couponreport.component.html',
  styleUrls: ['./view-couponreport.component.css']
})
export class ViewCouponreportComponent implements OnInit {
  searchForm: FormGroup;
  constructor(public router:Router, private mainService: MainService) { }

  ngOnInit() {
    this.form();
    this.graph();
      }

  // search Validation.
  form() {
    this.searchForm = new FormGroup({
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      select : new FormControl('', [Validators.required]),
      status : new FormControl('', [Validators.required]),
    });
  }

  graph() {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Progress chart"
      },
      axisX: {
        title: ""
      },
      axisY: {
        title: "Values",
        suffix: ""
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
          { y: 71, label: "Sunday" },
          { y: 55, label: "Monday" },
          { y: 50, label: "Tuesday" },
          { y: 65, label: "Wednesday" },
          { y: 95, label: "Thursday" },
          { y: 68, label: "Friday" },
          { y: 28, label: "Saturday" },
          ]
      }]
    });
    chart.render();
  }


}
