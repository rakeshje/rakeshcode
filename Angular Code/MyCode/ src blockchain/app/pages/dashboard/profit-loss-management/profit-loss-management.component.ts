import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MainService } from 'src/app/provider/main.service';
declare var $: any;
declare var kendo: any;

@Component({
  selector: 'app-profit-loss-management',
  templateUrl: './profit-loss-management.component.html',
  styleUrls: ['./profit-loss-management.component.css']
})
export class ProfitLossManagementComponent implements OnInit {
  

  constructor(public server: MainService) { }

  ngOnInit() {
  }

 

}
