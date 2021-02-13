import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrls: ['./fee-management.component.css']
})
export class FeeManagementComponent implements OnInit {
  

  constructor(public service: MainService) { }

  ngOnInit() {
  }

  

}

