import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLoginHeader: boolean;
  constructor(public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showLoginHeader = res))
    if (localStorage.getItem('token')) { this.showLoginHeader = true }
  }
  

  //=========Routing=====//
  goToNotification(){
    this.router.navigate(['/notification'])
  }

}
