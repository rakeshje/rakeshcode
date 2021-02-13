import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, NavigationEnd } from '@angular/router';
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
  constructor(public mainService: MainService, private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = '/' + e.url.split('/')[1];
        if (this.currentUrl === '/' || this.currentUrl === '/login' || this.currentUrl == '/forgot-password') {
          if (localStorage.getItem('token')) { this.router.navigate(['user-management']) }
        }
      }
    });
  }

  ngOnInit() {
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showSidebar = res))
    if (localStorage.getItem('token')) { this.showSidebar = true 
      // this.getProfile() 
    }
  }

  // get profile
  getProfile() {
    // this.mainService.showSpinner()
    this.mainService.getApi('admin/getProfile', 1).subscribe((res: any) => {
      console.log("sidebar profile response ==>", res);
      if (res.responseCode == 200) {
        this.profileData = res.result
        // this.mainService.hideSpinner();
        // this.mainService.successToast(res.responseMessage);
      } else {
        // this.mainService.hideSpinner();
        // this.mainService.errorToast(res.responseMessage)
      }
    })
  }
  adminProfile() {
    // this.router.navigate(['my-profile'])
  }

  logOutModal() {
    $('#signout_modal').modal('show')
  }

  logout() {
    this.mainService.loginStatus.next(false)
    localStorage.removeItem('token');
    $('#signout_modal').modal('hide')
    this.router.navigate(['login'])
  }

}
