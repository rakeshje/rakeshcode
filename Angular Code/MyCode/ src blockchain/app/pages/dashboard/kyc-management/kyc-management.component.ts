import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-kyc-management',
  templateUrl: './kyc-management.component.html',
  styleUrls: ['./kyc-management.component.css']
})
export class KycManagementComponent implements OnInit {
  

  constructor(private router: Router, public service: MainService) { }

  ngOnInit() {
  }

  
}
