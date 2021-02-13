import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from './services/server.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'BayiseWeb';
    show: boolean=false;
    connect: boolean=false;
    interval: any;
    constructor(private router:Router, private server:ServerService) {}
    ngOnInit() {
        // to call set interval
      setInterval(()=> {
        this.interval = this.checkInternetConnection()
      },2000)

        //to manage navigation through Url
        this.router.events.subscribe(x => {
            if(x instanceof NavigationEnd) {
                setTimeout(() => {
                    this.show = true;
                }, 1000);
                
                if(!localStorage.getItem('token')) {
                    //to block url after login
                    // if((x.url == '/')) {
                    //     this.router.navigateByUrl('home');
                    // } 
                }
                // else {
                //     if((x.url == '/')) {
                //         this.router.navigateByUrl('dashboard');
                //     } 
                // }            
            }
        })
    }

      // to check internet connection
      checkInternetConnection() {
        if(!navigator.onLine && this.connect == false) {
          this.connect = true
            this.server.showWarnToast('Check internet connection!')
        }else if(navigator.onLine && this.connect == true) {
          this.connect = false
          this.server.showSuccToast('You are back online!')
        }
    }

    ngOnDestroy() {
        clearInterval(this.interval)
    }
}

