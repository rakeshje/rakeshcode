import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-session-activity',
  templateUrl: './login-session-activity.component.html',
  styleUrls: ['./login-session-activity.component.css']
})
export class LoginSessionActivityComponent implements OnInit {
  currTab : any ="Login"

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'WalletTrading'){
      this.router.navigate(['wallet-management'])
    }
   else if(this.currTab === 'Trading'){
      this.router.navigate(['user-detail-trading'])
    }
    else if (this.currTab === 'Login'){
      this.router.navigate(['login-session-activity'])
    }
    else if (this.currTab === 'GI'){
      this.router.navigate(['user-details'])
    }
  }

}
