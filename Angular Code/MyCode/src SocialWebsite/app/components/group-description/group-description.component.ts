import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { SharedModule } from '../shared/shared.module';

declare var $: any;

@Component({
  selector: 'app-group-description',
  templateUrl: './group-description.component.html',
  styleUrls: ['./group-description.component.scss']
})
export class GroupDescriptionComponent implements OnInit {
  groupDiscussion: any = {};
  posts: any = [];
  isMember: boolean;
  postId: any;
  comments: any = [];
  emoji: boolean = false;
  newComment: any = "";
  postDescription: any;
  postView: any = "";
  choosenFriend: any = [];
  fileData: any = "assets/images/gallery.png";
  fileName: any;
  friendsList: any = [];
  userProfilePic: any;
  type: any;
  userid: any;
  typeMedia: any;
  actionType = {"view": "", "value": ""};
  post: any;
  commentId: any=[];
  commentArr: any=[];
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  friendArr: any=[];

  constructor(public activatedRoute: ActivatedRoute, public server: ServerService, public shared: SharedModule, public router:Router) { }

  ngOnInit() {
    this.userid = localStorage.getItem("user_id");
    this.getDesription();
  }

  open(id) {
    var ele = document.getElementById(id);
    ele.classList.toggle("none");
  }

  getDesription() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "groupId": this.activatedRoute.snapshot.queryParams.group
    }      
    this.server.showSpinner();
    this.server.postApi('user/groupdescription', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.userProfilePic = localStorage.getItem("profilePic");
        this.groupDiscussion = res.result[0].groupId;
        this.posts = res.result;
        console.log("my data", this.posts)
        this.posts.forEach(element => {
          this.commentId.push(element._id)
        });
        console.log("my id", this.commentId)
        this.posts.forEach(obj => {
          // obj.createdAt = moment(obj.createdAt).fromNow();
          obj.createdAt = this.shared.getCreatedAtTime(obj.createdAt);
          var ind = obj.likes.findIndex(x => x.likedId == localStorage.getItem("user_id"));
          if(ind > -1) {
            obj.userLiked = true;
          } else {
            obj.userLiked = false;
          }
        });
        var index = this.groupDiscussion.members.findIndex(x => x.memberId == localStorage.getItem("user_id"));
        if(index > -1)
        this.isMember = true;
        else
        this.isMember = false;
      } else if(res.responseCode == 404) {
        this.getGroupInfo();
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    });
  }

  getGroupInfo() {
    this.posts = [];
    let data = {
      "userId": localStorage.getItem("user_id"),
      "groupId": this.activatedRoute.snapshot.queryParams.group
    }
    this.server.showSpinner();
    this.server.postApi('user/viewGroup', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.groupDiscussion['coverPic'] = res.result.coverPic;
        this.groupDiscussion['groupName'] = res.result.groupName;
        this.groupDiscussion['description'] = res.result.description;
        this.groupDiscussion['members'] = res.result.members;
        this.groupDiscussion['_id'] = res.result._id;
        var index = this.groupDiscussion.members.findIndex(x => x.memberId == localStorage.getItem("user_id"));
        if(index > -1)
        this.isMember = true;
        else
        this.isMember = false;
      } else {
        this.groupDiscussion = null;
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  comment(post) {
    this.postId = post._id;
    this.comments = post.comments;
    // console.log(post.comments);
    $("#commentModal").modal("show");
  }

  addEmoji(event) {
    this.newComment += event.emoji.native;
    this.emoji = false;
  }

  showEmoji() {
    this.emoji = true;
  }

  likePost(post, type) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "postId": type == "like" ? post._id : this.postId,
      // "like": post.userLiked ? "false" : "true"
    }
    if(type == 'like')
    data['like'] = post.userLiked ? "false" : "true";
    else {
      data['comments'] = "true";
      data['comment'] = this.newComment;
    }
    this.server.showSpinner();
    this.server.postApi('user/groupLikeAndComment', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        console.log("comment", res);
        this.commentArr=res.comments
        
        this.server.showSuccToast(res.responseMessage);
        if(type == 'comment') {
          this.newComment= "";
          $("#commentModal").modal("hide");
        }
        this.getDesription();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }


  // reply comment
//   replyCommentInGroup(){
    
//     let data ={
      
// "userId":localStorage.getItem('user_id'),
// // "commentId":,
// "comment":this.comments,
// "postId":this.postId



//     }
//   }

  openPostModal() {
    this.postDescription = "";
    this.fileData = "assets/images/gallery.png";
    this.postView = "";
    $('#addPost').modal('show');
  }

  addPost() {
    let data = {
      "groupId": this.activatedRoute.snapshot.queryParams.group,
      "userId": localStorage.getItem('user_id'),
      "text": this.postDescription,
      // "image": this.fileData != "assets/images/gallery.png" ? [this.fileData] : "",
      "privacy": this.postView == "PUBLIC" ? "" : this.postView
    }
    if(this.fileData != "assets/images/gallery.png")
    data[this.shared.typeMedia] = [this.shared.fileData];
    if(this.postView == "SPECIFICFRIENDS")
    data['friendId'] = this.choosenFriend;
    this.server.showSpinner();
    this.server.postApi('user/addPostGroupDescription', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $('#addPost').modal('hide');
        this.server.showSuccToast(res.responseMessage);
        this.getDesription();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  selectPrivacy(event) {
    if(event.target.value == "SPECIFICFRIENDS") {
      // this.sharePost("post", "");
    }
  }

//    sharePost(share, post){

//  }

  
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
  // }

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

  upload(event) {
    this.shared.upload(event);
    setTimeout(() => {
      this.fileData = this.shared.fileData;
    }, 1000);
    // var reader = new FileReader()
    // reader.onload = (e) => {
    //   this.fileData = e.target['result'];
    // }
    // reader.readAsDataURL(event.target.files[0]);
    // this.fileName = event.target.files[0].name;
    // this.typeMedia = event.target.files[0].type.split("/")[0];
  }

  openModal(post) {
    // this.type = post;
    // if(id != "")
    this.postId = post
    this.friendsList = this.shared.allFriends;
    this.dropdownList=this.friendsList
      this.dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'firstName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    $("#sharePost").modal("show");
  }

  sharePostFriends() {
    // switch(this.type) {
    //   case 'post':
    //     $("#sharePost").modal("hide");
    //     break;
      // case 'share':
        let data = {
          "memberId": localStorage.getItem('user_id'),
          "postId": this.postId,
          "sharedTo": this.friendArr          
        }
        this.server.showSpinner();
        this.server.postApi("user/shareGroupPost", data).subscribe(res => {
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
        
    // }
  }

   //To select particular friend/member
   onItemSelect(item: any) {
    // let obj = {
    //   "memberId": item['_id']
    // }
    this.friendArr.push(item['_id'])
    console.log(this.friendArr)
  }
  //To select all members/friends
  onSelectAll(items: any) {
    console.log("g",items);
    
    let obj = {}
    items.forEach((element) => {
      
       
      
      this.friendArr.push( element['_id'])
    })
    console.log('this.friendArr',this.friendArr)
  }
  //To unselect any particular friend/member
  onItemDeSelect(item: any) {
    let index = this.friendArr.findIndex(x => x == item)
    this.friendArr.splice(index, 1)
    console.log(this.friendArr)
  }

  actionOnPost(post, type) {
    var postAction = {"DELETE": "delete", "ARCHIVE": "archive", "HIDE": "hide"};
    this.post = post;
    this.actionType = {"view": postAction[type], "value": type};
    $('#actionPost').modal('show');
  }

  action() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "postId": this.post._id,
      "type": this.actionType.value
    }
    this.server.showSpinner();
    this.server.postApi('user/hideAndDeleteGroupPost', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $('#actionPost').modal('hide');
        this.server.showSuccToast(res.responseMessage);
        this.getDesription();
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
      "postId":this.postId,
      "userPic":item.userPic,
      "showTime":item.commentedTime,
      "username":item.userName
  }
  console.log("fjgj", data);
  
 $('#commentModal').modal('hide')
  this.router.navigate(['/group-reply'],{queryParams:{value:JSON.stringify(data)}})
  }

}
