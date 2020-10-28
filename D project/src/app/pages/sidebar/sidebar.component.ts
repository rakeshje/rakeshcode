import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { ApiUrls } from 'src/app/config/api-urls/api-urls';
declare var $: any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  showSidebar: boolean
  currentUrl: any;
  profileImage: any;
  profileData: any;
  showLogo: boolean = false;
  constructor(public mainService: MainService, private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = '/' + e.url.split('/')[1];
        if (this.currentUrl === '/' || this.currentUrl === '/login' || this.currentUrl == '/forgot-password') {
          if (localStorage.getItem('token')) { this.router.navigate(['dashboard']) }
        }
      }
    });
  }

  showadmin(event) {
    console.log('event', event);
    if (this.showLogo == false) {
      if ((document.getElementById("admin").style.width = "45px")) {
        document.getElementById("admin").style.display = "none";
        this.showLogo = true;
      }
    }
  }

  ngOnInit() {
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showSidebar = res))
    if (localStorage.getItem('token')) {
      this.showSidebar = true;
      this.getProfile();
    }
    this.mainService.loginData.subscribe((res: any) => {
      if (res) { this.profileData = res }
    })
  }

  // get profile
  getProfile() {
    this.mainService.showSpinner()
    this.mainService.getApi(ApiUrls.profile, 1).subscribe((res: any) => {
      console.log("sidebar profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result
        this.mainService.hideSpinner();
      } else {
        this.mainService.hideSpinner();
      }
    })
  }

  adminProfile() {
    this.router.navigate(['my-profile'])
  }

  logOutModal() {
    $('#logoutModal').modal('show')
  }

  logout() {
    $('#logoutModal').modal('hide')
    this.mainService.logout()
  }

}
