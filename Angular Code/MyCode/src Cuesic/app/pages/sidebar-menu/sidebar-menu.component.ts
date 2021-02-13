import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MainserviceService } from '../provider/mainservice.service';
declare var $: any

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  showSidebar: boolean

  currentUrl: any;
  profileImage: any;
  profileData: any;
  showLogo: boolean = false;
  userType: string;
  per : any;
  id: any;
  flag: boolean = false;
  user: any;
  success: string;
  constructor(public mainService:MainserviceService, private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = '/' + e.url.split('/')[1];
        console.log('currentUrl', this.currentUrl,'location',window.location.href.split('/'));

        if (this.currentUrl === '/' || this.currentUrl === '/login' || this.currentUrl == '/forgot-password' ) {
          if (localStorage.getItem('token')) { this.router.navigate(['dashboard']) 
        }
        // else{
        //   if(localStorage.getItem('success' )){
        //     this.router.navigate(['success'])
        //   }
        // }
        }
      }
    });
    // this.updatedUserProfile=
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
     this.id=localStorage.getItem('userId');
     this.userType= window.atob(JSON.parse(localStorage.getItem('userType')))
     console.log('userType', this.userType);
      if(this.userType=="SUBADMIN"){
        this.flag=true;
        console.log('flag', this.flag);

        this.subAdminList()
      }
    this.getProfile();
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
    this.mainService.loginStatus.subscribe((res: boolean) => console.log("status", this.showSidebar = res))
    if (localStorage.getItem('token')) {
      this.showSidebar = true;
    }
    else{
        if(localStorage.getItem('success' )){
          this.showSidebar = false;
        }
      }
    this.mainService.loginData.subscribe((res: any) => {
      if (res) {this.profileData = res}
    })

    
  }


//=============routing=========//
  adminProfile() {
    this.router.navigate(['my-profile'])
  }

  profile(){
    this.router.navigate(['/profile-screen'])
  }

  logOutModal() {
    $('#logoutModal').modal('show')
  }

  logout() {
    $('#logoutModal').modal('hide')
    this.mainService.logout()

  }

  //==========get profile=======//
  getProfile(){
    this.mainService.showSpinner();
    this.mainService.getApi('admin/profile',1).subscribe((res)=>{
      console.log("profile", res);
      this.mainService.hideSpinner();
      if(res.response_code==200){
        this.profileData=res.result;
      }

    },(error)=>{
      this.mainService.errorToast('something went wrong');
    })
  }

  subAdminList(){
    this.mainService.getApi('admin/viewSubAdmin/'+ this.id ,1).subscribe((res)=>{
      console.log('response of user', res);
      if(res.response_code == 200){
        this.user = res.result;
        this.per = res.result.permissions[0];

      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

}
