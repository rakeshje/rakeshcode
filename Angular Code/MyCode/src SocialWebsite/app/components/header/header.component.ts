import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { AuthService } from 'angularx-social-login';
import { Subject, Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
declare var FB: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    loginStatus: boolean=false;
    getDetails: any;
    data:any={}
    public subject = new Subject<any>();
    total: any;
    cartQuantity: any;
    productId: any = [];
    isNotification: boolean=true;
    
    constructor(private authService: AuthService, private server :ServerService, private router:Router, public shared: SharedModule) {
        this.server.getMessage().subscribe(message => {
            this.total = message.text;
            console.log("my note", this.total) 
        })
            

    }

    ngOnInit() {
       
        this.checkToken()
        if(localStorage.getItem('token')) {
            this.getProfileDetails()
        }
        if(localStorage.getItem("user_id")) {
            this.getCart();
            this.shared.getFriends();
        }  
        // this.server.getMessage().subscribe((res)=>{
        //  notification=res
        // });
    //    console.log("my note", this.notifiacation)      
    }

    // to route
    goToNotification(){
        this.router.navigate(['/notification'])
        this.isNotification=false;
    }

    // to pass message on click
    passMsg(path) {
        this.server.sendMessage(path)
    }

    // to check token
    checkToken() {
        if(localStorage.getItem('token')) {
            this.loginStatus = true
        }else {
            this.loginStatus = false
        }
    }


     // to get profile details
     getProfileDetails() {
        if(navigator.onLine) {
            if(localStorage.getItem('token')) {
                this.getDetails = this.server.getApi('user/myProfile').subscribe((res)=> {
                    this.getDetails.unsubscribe()
                    let result = res.result
                    this.data = {
                        "first_name": result.firstName,
                    }
                    this.server.first_name = result.firstName;
                    localStorage.setItem("profilePic", result.profilePic);                    
                    if(result.profilePic) {
                        this.data.profileImage =  result.profilePic
                        this.server.profileImage = result.profilePic
                    }else {
                        this.data.profileImage = "assets/images/Layer 61.png"
                        this.server.profileImage =  "assets/images/Layer 61.png"
                    }
                })
            }
        }
    }

    logout() {
        localStorage.removeItem('user_id')
        localStorage.removeItem('token')
        if(localStorage.getItem('type')) {
            this.authService.signOut();
            localStorage.clear()
        }
        localStorage.removeItem('type')
        this.loginStatus = false
        this.router.navigateByUrl('dashboard')
        this.server.showSuccToast('Logged Out Successfully!')
    }

    openChat(){
        this.router.navigate(['friend-chat'])
    }
    

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    getCart() {
        this.total = 0;
        let data = {
          "userId": localStorage.getItem("user_id")
        }
        this.server.showSpinner();
        this.server.postApi('user/viewAddToCart', data).subscribe((res) => {
            this.server.hideSpinner();
            if(res.responseCode == 200) {
                this.cartQuantity = res.listResult.addToCart.length;
                res.listResult.addToCart.forEach(obj => {
                    this.productId.push(obj.productId._id);
                });
                localStorage.setItem("cart",JSON.stringify(this.productId));
            }           
            // else
            // this.server.showErrToast(res.responseMessage);
        }, (err) => {
          this.server.hideSpinner()
          console.log(err);
        });
    }

    openCart() {
        this.router.navigate(['/view-cart']);
    }
}
