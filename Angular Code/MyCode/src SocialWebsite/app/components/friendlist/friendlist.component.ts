import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { element } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-friendlist',
    templateUrl: './friendlist.component.html',
    styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {
    selected:any='suggestion';
    page: number=1;
    limit: any = 5;
    suggestionList: any=[];
    requestList: any=[];
    contactList: any=[];
    friendReqUserId_Arr: any=[];
    friendRequestId_Arr: any=[];
    total_request: any;
    total: any;
    suggestion: any;
    search: any='';
    request: any;
    contact: any;
    url2: string;

    constructor(private server:ServerService,private router:Router, public shared: SharedModule) {
       this.url2 = window.location.href.split('/')[4]     
    }

    ngOnInit() {
        this.getSuggestionList()
        if( this.url2 == 'contacts'){        
            this.selectTab('contacts')
          }
          else{
            this.selectTab('suggestion')
          }
    }

    // to check tab
    selectTab(path) {
        this.router.navigateByUrl('friendlist/' + path)
        this.selected = path
        this.page = 1
        this.total = 0
        if(path == 'suggestion') {
            this.suggestionList=[];
            this.getSuggestionList()
        } else if(path == 'request') {
            this.requestList=[];
            this.getRequestList()
        } else if(path == 'contacts') {
            this.contactList=[];
            this.getContactsList()
        }
    }

    // to get suggestion list
    getSuggestionList() {
        let url;
        let data = {
            "pageNumber": this.page  ,
            "limit": this.limit,
            "search": this.search,
        }
        if(this.search) {
            url = 'user/searchFriendSuggestion'
        }else {
            url = 'user/friendSuggestion'
        }
        if(navigator.onLine) {
            this.suggestion = this.server.postApi(url,data).subscribe((res)=> {
                this.suggestion.unsubscribe();
                if(res.responseCode == 200) {
                    this.suggestionList = res.result.success2.docs
                    this.total = res.result.success2.total
                    this.suggestionList.forEach((element,index) => {
                        if(!element.profilePic) {
                        element.profilePic = 'assets/images/userImg.png'
                        }
                        // this.checkMutualFriend(element['_id'], index)
                    });
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to get request list
    getRequestList() {
        let url;
        let data = {
            "pageNumber": this.page  ,
            "limit": this.limit,
            "search": this.search,
        }
        if(this.search) {
            url = 'user/searchFriendRequestList'
        }else {
            url = 'user/getFriendRequestList'
        }
        if(navigator.onLine) {
            this.request = this.server.postApi(url,data).subscribe((res)=> {
                this.request.unsubscribe()
                if(res.responseCode == 200) {
                    this.requestList = res.result.success2.docs
                    this.friendReqUserId_Arr = res.result.friendRequestUserId
                    this.friendRequestId_Arr = res.result.friendRequestId
                    this.total = res.result.success2.total
                    this.requestList.forEach((element,index) => {
                        if(!element.profilePic) {
                        element.profilePic = 'assets/images/userImg.png'
                        }
                        // this.checkMutualFriend(element['_id'], index)
                    });        
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to get contacts list
    getContactsList() {
        let url;
        let data = {
            "pageNumber": this.page  ,
            "limit": this.limit,
            "search": this.search,
        }
        if(this.search) {
            url = 'user/searchFriendList'
        }else {
            url = 'user/getFriendList'
        }
        if(navigator.onLine){
            this.contactList = this.shared.allFriends;
            console.log('this contact list',this.contactList)
            this.total = this.shared.total;
            this.contactList.forEach((element,index) => {
                if(!element.profilePic) {
                    element.profilePic = 'assets/images/userImg.png'
                }
            });    
            // this.contact = this.server.postApi('user/getFriendList',data).subscribe((res)=> {
            //     this.contact.unsubscribe()
            //     if(res.responseCode == 200) {
            //         this.contactList = res.result.success2.docs
            //         this.total = res.result.success2.total
            //         this.contactList.forEach((element,index) => {
            //             if(!element.profilePic) {
            //             element.profilePic = 'assets/images/userImg.png'
            //             }
            //             // this.checkMutualFriend(element['_id'], index)
            //         });      
            //     }
            // })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }


    // Navigate to chatting Page
    openChat(id,pic,name){
        let data = {
            id: id,
            pic : pic,
            name : name
          }
        
          this.router.navigate(['friend-chat'],{queryParams: {value: JSON.stringify(data)}})
          
    }

    // to check mutual friend 
    checkMutualFriend(id,index) {
        let data = {
            "friendId":id
        }
        if(navigator.onLine) {
            let  mutual = this.server.postApi('user/getMutualFriendList', data).subscribe((res)=>{
                mutual.unsubscribe()
                if(res.responseCode == 200) {
                    if(this.selected == 'suggestion') {
                        console.log(this.suggestionList)
                        console.log(index, res.result.mutualFriend)
                        this.suggestionList[index]['mutual'] = res.result.mutualFriend
                    }else if(this.selected == 'request') {
                        console.log(this.suggestionList)
                        console.log(index, res.result.mutualFriend)
                        this.requestList[index]['mutual'] = res.result.mutualFriend
                    }else if(this.selected == 'contacts'){
                        console.log(this.suggestionList)
                        console.log(index, res.result.mutualFriend)
                        this.contactList[index]['mutual'] = res.result.mutualFriend
                    }
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to add / remove friend in a list from suggestion
    addFriend(id,index,action) {
        let data = {
            "friendId": id,
            "response": action
        }
        if(navigator.onLine) {
            let add_friend = this.server.postApi('user/sendFriendRequest',data).subscribe((res)=> {
                add_friend.unsubscribe()
                if(res.responseCode == 200) {
                    this.server.showSuccToast(res.responseMessage)
                    this.suggestionList.splice(index, 1);
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to act on request
    action(act,index) {
        let friendRequestUserId = this.friendReqUserId_Arr[index]
        let friendRequestId = this.friendRequestId_Arr[index]
        let  data = {
            "response":act, //”DELETE” // “BLOCK”
            "friendRequestUserId":friendRequestUserId,
            "friendRequestId":friendRequestId
        }
        if(navigator.onLine) {
            let request_action  = this.server.postApi('user/actionToFriendRequest', data).subscribe((res)=>{
                request_action.unsubscribe()
                this.requestList.splice(index, 1);
                if(res.responseCode == 200) {
                    this.server.showSuccToast(res.responseMessage)
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // for pagination
    pageChanged(page) {
       this.page = page
       if(this.selected == 'suggestion') {
            this.getSuggestionList()
        } else if(this.selected == 'request') {
            this.getRequestList()
        } else if(this.selected == 'contacts') {
            this.getContactsList()
        }
    }

    // to search by name
    searchByName(val) {
        this.search = val
        this.total = 0
        if(this.search) {
            this.page = 1
        }
        if(navigator.onLine) {
            if(this.selected == 'suggestion') {
                this.suggestionList = [];
                this.getSuggestionList()
            } else if(this.selected == 'request') {
                this.requestList = [];
                this.getRequestList()
            } else if(this.selected == 'contacts') {
                this.contactList = [];
                this.getContactsList()
            }
        }else {
            if(val.length == 1)
            this.server.showWarnToast('Check internet connection!')
        }

    }



}
