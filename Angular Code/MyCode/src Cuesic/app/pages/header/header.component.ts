import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../provider/mainservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLoginHeader: boolean;
  showLogo: boolean = false;
  selected: any;
  success: string;
  token: string;

  constructor(public mainService: MainserviceService) { this.success=localStorage.getItem('success' )}

  ngOnInit() {
    console.log('hgh', localStorage.getItem('success' ));
    
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showLoginHeader = res))
    if (localStorage.getItem('token')) {
      this.showLoginHeader = true
    }
    else{
    if (localStorage.getItem('success')) {
  
      this.showLoginHeader = false
    }
  }
}

  head() {
    if (this.showLogo == false) {
      if ((document.getElementById("logo").style.width = "45px")) {
        document.getElementById("logo").style.display = "none";
        this.showLogo = true;
      }
    }
    else {
      document.getElementById("logo1").style.display = "none";
      this.showLogo = false;
    }
  }

}
