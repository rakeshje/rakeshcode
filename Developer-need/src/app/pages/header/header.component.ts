import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLoginHeader: boolean;
  showLogo: boolean = false;
  selected: any;

  constructor(public mainService: MainService) { }

  ngOnInit() {
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showLoginHeader = res))
    if (localStorage.getItem('token')) {
      this.showLoginHeader = true
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
