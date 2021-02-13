import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-view-discussion-forum',
  templateUrl: './view-discussion-forum.component.html',
  styleUrls: ['./view-discussion-forum.component.scss']
})
export class ViewDiscussionForumComponent implements OnInit {
  discussionId: any;
  discussionViewData: any;
  SearchChange = new Subject<string>();
  search: string = '';
  commentChange = new Subject<string>();
  friends: any;
  friendsList: any = [];
  myLike: boolean = false;
  commentId: any;
  edit: any = 'para';
  commentt: any='';
  userid:any;
  

  constructor(private server: ServerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {
      this.discussionId = param['id'];
    })
    console.log("discussion id :-", this.discussionId);

  }

  ngOnInit() {
    this.userid=localStorage.getItem('user_id')
    this.gettingViewDiscussionForum(this.search);
    this.commentChange.debounceTime(600).distinctUntilChanged().subscribe(res => {
    })
  }

  gettingViewDiscussionForum(search) {
    this.server.showSpinner();
    let apireq = {
      "userId": localStorage.getItem('user_id'),
      "discussionId": this.discussionId
    }
    // console.log("view discussion data with discussion id ", apireq);
    this.server.postApi('user/viewDiscussionForum', apireq).subscribe(success => {
      if (success.responseCode == 200) {
        this.discussionViewData = success.result;

        console.log("discuss", this.discussionViewData);

        var ind = this.discussionViewData.likes.findIndex(x => x.likedId == localStorage.getItem("user_id"));
        if (ind > -1) {
          this.discussionViewData.userLiked = true;
        } else {
          this.discussionViewData.userLiked = false;
        }

      }
      this.checkIfLikedByMe(this.discussionViewData);
      this.server.hideSpinner();
    }, error => {
      this.server.hideSpinner();
      this.server.showErrToast(error);
    })
  }

  //checking if  i like
  checkIfLikedByMe(data) {
    let myId = localStorage.getItem('user_id');

    console.log("liked data", data);
    if (data.likes.length) {
      data.likes.forEach(element => {
        if (element.likedId == myId) {
          console.log("liked by me ");
          this.myLike = true;
        } else {
          console.log("dislike by me ");
          this.myLike = false;
        }
      });
    } else {
      this.myLike = false;
    }



  }

  //like 
  like(like) {
    this.server.showSpinner();
    let apireq = {
      "userId": localStorage.getItem('user_id'),
      "discussionId": this.discussionId,
      "like": like
    }
    this.server.postApi('user/discussionFormLikeAndComment', apireq).subscribe(success => {
      if (success.responseCode == 200) {
        this.server.showSuccToast(success.responseMessage);
        this.gettingViewDiscussionForum(this.search);
        // this.server.showSuccToast(success.responseMessage);
        // window.location.reload();
      }
      // this.gettingViewDiscussionForum(this.search);
      this.server.hideSpinner();
    }, error => {
      this.server.showErrToast(error);
      this.server.hideSpinner();
    })
  }

  //comment

  comment(comment) {
    // this.server.showSpinner();
    let apireq = {
      "userId": localStorage.getItem('user_id'),
      "discussionId": this.discussionId,
      "comments": "true",
      "comment": comment
    };
    this.commentt = comment
     console.log("date=-=-->",apireq);
    this.server.postApi('user/discussionFormLikeAndComment', apireq).subscribe(success => {
      if (success.responseCode == 200) {
        this.server.showSuccToast(success.responseMessage);
        // var ele = document.getElementById("comment");
        // ele['value'] = "";
         this.commentt = '';

        this.gettingViewDiscussionForum(this.search);
        setTimeout(() => {
          this.commentt = '';
        }, 1000);
      }
      
    }, error => {
      this.server.hideSpinner();
      this.server.showErrToast(error);
    })
  }

  deleteComment(id, disscussion){

    let data ={
      "discussionId":disscussion,
      "comments":'false',
      userId: localStorage.getItem('user_id'),
      "commentId":id,
    }

    console.log("hh",data );

    this.server.postApi('user/discussionFormLikeAndComment', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.server.showSuccToast(res.responseMessage)
        // this.comment(comment)
        this.gettingViewDiscussionForum(this.search)
      }
    },(error)=>{
      this.server.showErrToast("something went wrong")
    })
    

  }

  //getting friend List 
  gettingFriendList() {
    this.server.getFriend('user/getFriendList').subscribe(success => {
      if (success.responseCode == 200) {
        this.friends = success.result.success2.docs;
        $('#sharePost').modal('show');
      }
      console.log("getting Friend List", success);
    }, error => {
      console.log("errror from friend list", error);
    })
  }

  //choose friend 
  chooseFriend(val) {
    this.friendsList.push(val._id)
    console.log("firjkhds", this.friendsList);
  }

  //share post 
  sharePostFriends() {
    this.server.showSpinner();
    let apireq = {
      "memberId": localStorage.getItem('user_id'),
      "discussionId": this.discussionId,
      "sharedTo": this.friendsList
    }
    this.server.postApi('user/shareDiscussionPost', apireq).subscribe(success => {
      if (success.responseCode == 200) {
        this.server.showSuccToast(success.responseMessage);
        $('#sharePost').modal('hide');
      }
      this.server.hideSpinner();
    }, error => {
      this.server.hideSpinner();
      this.server.showErrToast(error);
    })
  }

  // edit comment
  editComment(comment, id, i,edit) {
    console.log("hjkgrthghy", comment, "hhg", id, "hfk", i,edit);
    this.commentId = id,
      this.comment = comment,
      this.edit=edit
      // this.updateComment()
  }

  updateComment(comment) {
    let data = {
      "userId": localStorage.getItem('user_id'),
      "discussionId": this.discussionId,
      "commentId": this.commentId,
      "comment": comment
    }
    this.server.postApi('user/editDiscussionComment', data).subscribe((res)=>{
      console.log("hfrhfg", res);
      this.edit = 'para';
      this.gettingViewDiscussionForum(this.search)
      this.server.showSuccToast(res.responseMessage)
    })

  }
  // reply comment

  replyComment(item){
    let data={
      "userId":localStorage.getItem('user_id'),
      "commentId":item._id,
      "comment":item.comment,
      "postId":this.discussionId,
      "userPic":item.userPic,
      "showTime":item.commentedTime,
      "username":item.userName
  }
  console.log("fjgj", data);
  
 $('#commentModal').modal('hide')
  this.router.navigate(['/view-discussion-reply'],{queryParams:{value:JSON.stringify(data)}})
  }
}
