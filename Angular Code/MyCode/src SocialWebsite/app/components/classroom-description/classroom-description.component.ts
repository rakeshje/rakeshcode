import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

declare var $: any;

@Component({
  selector: 'app-classroom-description',
  templateUrl: './classroom-description.component.html',
  styleUrls: ['./classroom-description.component.scss']
})
export class ClassroomDescriptionComponent implements OnInit {
  classroomDescription: any = {};
  fileData: any = "assets/images/gallery.png";
  fileName: any;
  postDescription: any;
  postView: any = "";
  posts: any = [];
  comments: any = [];
  emoji: boolean = false;
  newComment: any = "";
  postId: any;
  friendsList: any = [];
  isMember: boolean;
  choosenFriend: any = [];
  userProfilePic: any;
  type: any;
  userid: any;
  typeMedia: any;
  actionType = {"view": "", "value": ""};
  post: any;
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  friendArr: any=[];

  constructor(public server: ServerService, public router: Router, public activatedRoute: ActivatedRoute, public shared: SharedModule) { }

  ngOnInit() {
    this.userid = localStorage.getItem("user_id");
    this.getDesription();
  }

  getDesription() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "classId": this.activatedRoute.snapshot.queryParams.class
    }
    this.server.showSpinner();
    this.server.postApi('user/classDescription', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.userProfilePic = localStorage.getItem("profilePic");
        this.classroomDescription = res.result[0].classId;
        this.posts = res.result;
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
        var index = this.classroomDescription.members.findIndex(x => x.memberId == localStorage.getItem("user_id"));
        if(index > -1){
        this.isMember = true;
      }
        else{
        this.isMember = false;
      }
     } else if(res.responseCode == 404) {
        this.getClassroomInfo();
     }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    });
  }

  getClassroomInfo() {
    this.posts = [];
    let data = {
      "userId": localStorage.getItem("user_id"),
      "classId": this.activatedRoute.snapshot.queryParams.class
    }
    this.server.showSpinner();
    this.server.postApi('user/viewClass', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.classroomDescription['coverPic'] = res.result.coverPic;
        this.classroomDescription['classRoomName'] = res.result.classRoomName;
        this.classroomDescription['description'] = res.result.description;
        this.classroomDescription['members'] = res.result.members;
        this.classroomDescription['_id'] = res.result._id;
        var index = this.classroomDescription.members.findIndex(x => x.memberId == localStorage.getItem("user_id"));
        if(index > -1){
        this.isMember = true;
      }
        else{
        this.isMember = false;
      }
      } else {
        this.classroomDescription = null;
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  openPostModal() {
    this.postDescription = "";
    this.fileData = "assets/images/gallery.png";
    this.postView = "";
    $('#addPost').modal('show');
  }

  upload(event) {
    this.shared.upload(event);
    setTimeout(() => {
      this.fileData = this.shared.fileData;
    }, 1000);
    // var reader = new FileReader()
    // reader.onload = (e) => {
    //   this.fileData = e.target['result'];
    //   console.log(reader.result);
    // }
    // reader.readAsDataURL(event.target.files[0]);
    // this.fileName = event.target.files[0].name;
    // this.typeMedia = event.target.files[0].type.split("/")[0];
  }

  addPost() {
    let data = {
      "classId": this.activatedRoute.snapshot.queryParams.class,
      "userId": localStorage.getItem('user_id'),
      "text": this.postDescription,
      // "image": this.fileData != "assets/images/gallery.png" ? [this.fileData] : "",
      "privacy": this.postView == "PUBLIC" ? "" : this.postView
    }
    if(this.fileData != "assets/images/gallery.png"){
    data[this.shared.typeMedia] = [this.shared.fileData];
  }
    if(this.postView == "SPECIFICFRIENDS"){
    data['friendId'] = this.choosenFriend;
  }
    this.server.showSpinner();
    this.server.postApi('user/createClassPost', data).subscribe(res => {
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

  open(id) {
    var ele = document.getElementById(id);
    ele.classList.toggle("none");
  }

  likePost(post, type) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "postId": type == "like" ? post._id : this.postId,
      // "like": post.userLiked ? "false" : "true"
    }
    if(type == 'like'){
    data['like'] = post.userLiked ? "false" : "true";
  }
    else {
      data['comments'] = "true";
      data['comment'] = this.newComment;
    }
    this.server.showSpinner();
    this.server.postApi('user/postLikeAndCommentInClass', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        if(type == "comment") {
          this.newComment= "";
          $("#commentModal").modal("hide");
        }
        this.getDesription();
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

  openModal(post) {
    // this.type = post;
    // if(id != "")
    this.postId =post;
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

  selectPrivacy(event) {
    if(event.target.value == "SPECIFICFRIENDS") {
      // this.sharePost("post", "");
    }
  }

  chooseFriend(friend, event) {
    if(event.target.checked){
    this.choosenFriend.push(friend._id);
  }
    else {
      var ind = this.choosenFriend.findIndex(x => x == friend._id);
      if(ind > -1) {
        this.choosenFriend.splice(ind, 1);
      }
    }
  }

  sharePostFriends() {
    // switch(this.type) {
    //   case 'post':
    //     $("#sharePost").modal("hide");
    //     break;
    //   case 'share':
        let data = {
          "memberId": localStorage.getItem('user_id'),
          "postId": this.postId,
          "sharedTo": this.friendArr          
        }
        this.server.showSpinner();
        this.server.postApi("user/shareClassPost", data).subscribe(res => {
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
        // break; 
    }
  // }

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
    this.server.postApi('user/hideAndDeleteClassPost', data).subscribe(res => {
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
  this.router.navigate(['/class-reply'],{queryParams:{value:JSON.stringify(data)}})
  }

}
