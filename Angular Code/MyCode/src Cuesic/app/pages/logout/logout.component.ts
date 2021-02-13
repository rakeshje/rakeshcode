import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../provider/mainservice.service';
declare var $:any
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loginData: any;
  loginStatus: any;

  constructor(public router:Router,public mainService:MainserviceService) { }

  ngOnInit() {
  }

  //=======open modal=====//
  logoutModal(){
    $('#logout').modal('show')
  }
  
   logout() {
    $('#logoutModal').modal('hide')
    localStorage.removeItem('token')
    this.loginData.next('');
    this.loginStatus.next(false)
    this.router.navigate(['login'])
  }
  
}
