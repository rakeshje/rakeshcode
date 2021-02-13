import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { Subject } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

declare var $: any;

@Component({
  selector: 'app-view-advertisement',
  templateUrl: './view-advertisement.component.html',
  styleUrls: ['./view-advertisement.component.scss']
})
export class ViewAdvertisementComponent implements OnInit {
  tabActive: any = "viewAllAdd";
  fileData: any = ["assets/images/Layer 139.png"];
  fileName: any;
  title: any;
  description: any = "";
  type: any = "";
  myAdds: any = [];
  profilePic: any;
  allAdds: any = [];
  advId: any;
  comments: any = [];
  newComment: any = "";
  emoji: boolean = false;
  userProfilePic: string;
  typeAdv: any;
  searchChange = new Subject<string>();
  searchAdv = "";
  friendsList: any = [];
  choosenFriend: any = [];
  userid: any;
  viewAdvMedia = {"media": "", "type": ""};
  actionType = {"view": "", "value": ""};
  adv: any;
  advType: any;
  commentsArr: any=[];

  constructor(public router: Router, public server: ServerService, public shared: SharedModule) {
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe(response => {
      this.searchAdv = response;
      for(var i = 0; i<2; i++) {
        this.viewMyAdd(i);
      }
    })
   }

  ngOnInit() {
    
    this.userid = localStorage.getItem("user_id");
    this.userProfilePic = localStorage.getItem("profilePic");
    for(var i = 0; i<2; i++) {
      this.viewMyAdd(i);
    }
  }

  changeTab(val) {
    this.tabActive = val;
  }

  upload(event) {
    this.fileData = []
    let files = event.target.files;
    this.type = event.target.files[0].type.split("/")[0];
    console.log("type-->>",this.type)
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {          
          console.log("e-->>",e.target.result.split("/")[0].split(":")[1])
          if(this.type == e.target.result.split("/")[0].split(":")[1]){
            this.fileData.push(e.target.result);
          }else{
            this.server.showWarnToast("Please select the Files of same type")
            this.fileData = ["assets/images/Layer 139.png"];
            return false
          }
        }
        reader.readAsDataURL(file);
      }
    }
    this.fileName = event.target.files[0].name;
  }

  uploadAdd() {
    if(this.title == "" || this.fileData == "assets/images/Layer 139.png") {
      this.server.showErrToast("Enter the missing fields");
      return;
    }
    let data = {
      "title": this.title,
      "description": this.description,
      "userId": localStorage.getItem("user_id")
    }
    data[this.type] = this.fileData;
    // localStorage.setItem("addDetail", JSON.stringify(data));
    this.server.addDetail = data
    localStorage.setItem("addType", "advertisement");
    this.router.navigate(['/choose-card']);
  }

  viewMyAdd(val) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "search": this.searchAdv
    }
    let data1 = {
      "search": this.searchAdv
    }
    this.server.showSpinner();
    this.server.postApi("user/viewMyPostAdv", (val == 0 ? data1 : data)).subscribe(res => {
      this.server.hideSpinner();
      this.profilePic = localStorage.getItem("profilePic");
      if(val == 0) {
        if(res.responseCode == 200) {
          this.allAdds = res.advData.docs;
          console.log("ff", this.allAdds)
          
          this.allAdds.forEach(obj => {
            // obj.createdAt = moment(obj.createdAt).fromNow();
            obj.createdAt = this.shared.getCreatedAtTime(obj.createdAt);
            var ind = obj.likes.findIndex(x => x.likedId == localStorage.getItem("user_id"));
            if(ind > -1) {
              obj.userLiked = true;
            } else {
              obj.userLiked = false;
            }
          });
        } else
        this.allAdds = [];
      } else if(val == 1) {
        if(res.responseCode == 200) {
          this.myAdds = res.advData.docs;
          this.myAdds.forEach(obj => {
              // obj.createdAt = moment(obj.createdAt).fromNow();
              obj.createdAt = this.shared.getCreatedAtTime(obj.createdAt);
              var ind = obj.likes.findIndex(x => x.likedId == localStorage.getItem("user_id"));
              if(ind > -1) {
                obj.userLiked = true;
              } else {
                obj.userLiked = false;
              }
            });
        } else
        this.myAdds = [];
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  open(id) {
    var ele = document.getElementById(id);
    ele.classList.toggle("none");
  }

  // actionOnAdv(adv, type, val) {
  //   let data = {
  //     "userId": localStorage.getItem("user_id"),
  //     "advId": adv._id,
  //     "type": type
  //   }
  //   this.server.showSpinner();
  //   this.server.postApi('user/hideAndDeleteAdv', data).subscribe(res => {
  //     this.server.hideSpinner();
  //     if(res.responseCode == 200) {
  //       this.server.showSuccToast(res.responseMessage);
  //       this.viewMyAdd(val);
  //     } else {
  //       this.server.showErrToast(res.responseMessage);
  //     }
  //   }, (err) => {
  //     this.server.hideSpinner();
  //     console.log(err);
  //   })
  // }
    

  likePost(adv, val) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "advId": adv._id,
      "like": adv.userLiked ? "false" : "true"
    }
    this.server.showSpinner();
    this.server.postApi('user/advlikesAndComment', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        this.viewMyAdd(val);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  comment(adv, val) {
    this.advId = adv._id;
    this.comments = adv.comments;
    console.log('fj',this.comments);
    
    this.typeAdv = val;
    $("#commentModal").modal("show");
  }

  addEmoji(event) {
    this.newComment += event.emoji.native;
    this.emoji = false;
  }

  showEmoji() {
    this.emoji = true;
  }

  commentAdv() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "advId": this.advId,
      "comments": "true",
	    "comment": this.newComment
    }
    this.server.showSpinner();
    this.server.postApi('user/advlikesAndComment', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        this.commentsArr=res.comments.comments
        console.log("cfgyhfguhfgy", this.commentsArr);
        
        this.newComment= "";
        $("#commentModal").modal("hide");
        this.viewMyAdd(this.typeAdv);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log();
    })
  }

  sharePost(id) {
    this.advId = id;
    this.friendsList = this.shared.allFriends;
    $("#sharePost").modal("show");
    // let data = {
    //   "_id": localStorage.getItem('user_id'),
    //   "token": localStorage.getItem('token'),
    // }
    // this.server.showSpinner();
    // this.server.getFriend('user/getFriendList').subscribe(res => {
    //   this.server.hideSpinner();
    //   if(res.responseCode == 200) {
    //     this.friendsList = res.result.success2.docs;
    //     $("#sharePost").modal("show");
    //   } else {
    //     this.server.showErrToast(res.responseMessage);
    //   }
    // }, (err) => {
    //   this.server.hideSpinner();
    //   console.log(err);
    // })
  }

  chooseFriend(friend, event) {
    if(event.target.checked)
    this.choosenFriend.push(friend._id);
    else {
      var ind = this.choosenFriend.findIndex(x => x == friend._id);
      if(ind > -1) {
        this.choosenFriend.splice(ind, 1);
      }
    }
  }

  shareAdvFriends() {
    let data = {
      "memberId": localStorage.getItem("user_id"),
      "advId": this.advId,
      "sharedTo": this.choosenFriend
    }
    this.server.showSpinner();
    this.server.postApi('user/shareAdvPost', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $("#sharePost").modal("hide");
        this.server.showSuccToast(res.responseMessage);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  viewAdv(adv) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "advId": adv._id
    }
    this.server.showSpinner();
    this.server.postApi('user/chargeForAdv', data).subscribe(res => {
      this.server.hideSpinner();
      $("#viewAdv").modal('show');
      if(adv.image)
      this.viewAdvMedia = {"media": adv.image, "type": "image"};
      else
      this.viewAdvMedia = {"media": adv.video, "type": "video"};
      if(res.responseCode == 200) {
        // this.server.showSuccToast(res.responseMessage);
      } 
      // else
      // this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }
      

  actionOnAdv(post, type, val) {
    var postAction = {"DELETE": "delete", "ARCHIVE": "archive", "HIDE": "hide"};
    this.adv = post;
    this.actionType = {"view": postAction[type], "value": type};
    this.advType = val;
    $('#actionAdvertisement').modal('show');
  }

  action() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "advId": this.adv._id,
      "type": this.actionType.value
    }
    this.server.showSpinner();
    this.server.postApi('user/hideAndDeleteAdv', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $('#actionAdvertisement').modal('hide');
        this.server.showSuccToast(res.responseMessage);
        this.viewMyAdd(this.advType);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  replyComment(item){
    let data={
      "userId":localStorage.getItem('user_id'),
      "commentId":item._id,
      "comment":item.comment,
      "postId":this.advId,
      "userPic":item.userPic,
      "showTime":item.commentedTime,
      "username":item.userName
  }
  console.log("fjgj", data);
  
 $('#commentModal').modal('hide')
  this.router.navigate(['/adv-reply'],{queryParams:{value:JSON.stringify(data)}})
  }
}
