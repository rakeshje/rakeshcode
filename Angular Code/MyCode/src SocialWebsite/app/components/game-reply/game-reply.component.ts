import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-game-reply',
  templateUrl: './game-reply.component.html',
  styleUrls: ['./game-reply.component.scss']
})
export class GameReplyComponent implements OnInit {
  reply: any = [];
  commentId: any;
  comment: any;
  postId: any;
  showTime: any;
  userPic: any;
  username: any;
  replycom: any='';
  getreply: any=[];

  constructor(public route: Router, public active: ActivatedRoute, public service: ServerService) {
    this.active.queryParams.subscribe((params) => {
      this.reply = JSON.parse(params.value)
      console.log("", this.reply)
      this.commentId = this.reply.commentId
      this.comment = this.reply.comment,
        this.postId = this.reply.postId,
        this.showTime = this.reply.showTime,
        this.userPic = this.reply.userPic,
        this.username = this.reply.username

      console.log("jg", this.comment, this.userPic, this.username, this.showTime, this.postId);

    })
  }


  ngOnInit() {
    this.getreplyComment()
  }

  replyComment() {
    let data = {

      "userId": localStorage.getItem('user_id'),
      "commentId":this.commentId,
      "comment":this.replycom,
      "gameId": this.postId
    }

    this.service.postApi('user/replyCommentInGameVideo', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage)
        this.getreplyComment();
        this.replycom=''
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })

    
  }

  getreplyComment(){
    let data={

      "userId":localStorage.getItem('user_id'),
      "gameId": this.postId,
      "show": "replyComments"
    }

    this.service.postApi('user/viewGamesLikesAndComment', data ).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage);
        this.getreply=res.replyComments;
      // setTimeout(() => {
        
      // }, 2000);
        console.log("fh", this.getreply);
        
      }
    },(error)=>{
      this.service.showErrToast("somnething went wrong")
    })
  }

}
