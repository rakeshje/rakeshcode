import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-rightsidemenu',
  templateUrl: './rightsidemenu.component.html',
  styleUrls: ['./rightsidemenu.component.scss']
})
export class RightsidemenuComponent implements OnInit {
  response: any;
  chatSocket: WebSocket;
  chatSocketUrl: string;
  socketConnection: any;
  chatArr: any = [];
  onlineUser: any = [];
  userList: any = [];
  userId: any = [];
  friendList: any = [];
  OnlineFriendID: any = [];
  myID: any;
  myOnlineFriend: any = [];
  status: any;


  constructor(public server: ServerService,private router : Router,public shared: SharedModule) { }

  ngOnInit() {
    // this.response = this.server.getNewMessage("markettingChatApi").subscribe(msg => {
    //   console.log("get message from sidemenu====>", msg)
    // });
    this.getOnlineUser();
    setTimeout(() => {
      this.friendList  =  this.shared.allFriends;
      console.log('friend',this.friendList);
    }, 1000);
    
  }


  getOnlineUser() {

    this.server.sendNewMessage(localStorage.getItem('user_id'), 'onlineUser');
    this.server.getNewMessage('onlineUser').subscribe((res) => {
      this.onlineUser = Object.values(res);
     console.log('online',this.onlineUser ,res);
      this.onlineUser.forEach((ele, i) => {
       if(ele['userId'] !=localStorage.getItem('user_id')){
          this.status = ele.status;
          console.log('status',this.status);
          // this.friendList.push({
          //   item?._id,item?.profilePic,item?.firstName
          //   id=
          // })
       }
        // this.userList.push(ele['userId']);

      });

      this.onlineUser.filter((x)=>{
        setTimeout(() => {
          this.friendList.forEach((ele,i) => {
            if( x.userId == ele._id){
              this.friendList[i]['status'] = x.status
              console.log('status',x.status,this.friendList);

            }
           });
           console.log('onlineData',this.onlineUser,'friendList',this.friendList);

        }, 1000);
      
      })
     
    })

  }

  openChat() {
    // this.myID = id
    let data = {
      userId: localStorage.getItem('user_id')
    }
    this.server.postApi('user/viewFriend', data).subscribe((res) => {
      if (res.responseCode == 200) {
        this.friendList = res.data.friendList
        console.log('this friend List', this.friendList);
        // this.friendList.forEach(ele => {
        //   setTimeout(() => {
        //     this.userList.filter(x => {
        //       if (ele['friendId']['_id'] == x) {
        //         this.myOnlineFriend.push(ele['friendId'])
        //         console.log('friend1', ele['friendId'], this.myOnlineFriend);
        //       }
        //     })
        //   }, 1000);
        // });
      }
    })
  }


  Chat(id,pic,name){
  let data = {
    id: id,
    pic : pic,
    name : name
  }

  this.router.navigate(['friend-chat'],{queryParams: {value: JSON.stringify(data)}})
  

  }

}