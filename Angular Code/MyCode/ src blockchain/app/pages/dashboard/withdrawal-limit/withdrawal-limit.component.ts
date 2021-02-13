import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-withdrawal-limit',
  templateUrl: './withdrawal-limit.component.html',
  styleUrls: ['./withdrawal-limit.component.css']
})
export class WithdrawalLimitComponent implements OnInit {
  
  constructor(public service: MainService) { }

  ngOnInit() {
  }

  

}
