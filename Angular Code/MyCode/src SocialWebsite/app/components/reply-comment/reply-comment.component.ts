import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent implements OnInit {
  reply: any;
  commentId: any;
  comment: any=[];
  postId: any;
  replycom: any;
  replyies: any=[];
  maincomment: any=[];
  showTime: any;
  userPic: any;
  username: any;
  getreply: any=[];

  constructor(public route:Router, public active:ActivatedRoute, public service:ServerService) { 
    this.active.queryParams.subscribe((params)=>{
      this.reply=JSON.parse(params.value)
      console.log("", this.reply)
      this.commentId=this.reply.commentId
      this.comment=this.reply.comment,
      this.postId=this.reply.postId,
      this.showTime=this.reply.showTime,
      this.userPic=this.reply.userPic,
      this.username=this.reply.username
      
      console.log("jg", this.comment,this.userPic,this.username, this.showTime,this.postId);
      
    })
  }

  ngOnInit() {
    this.getreplyComment()
  }

  replyComment(){
    this.maincomment=this.replycom
    let data={
      "userId":localStorage.getItem('user_id'),
      "commentId":this.commentId,
      "comment":this.replycom,
      "postId":this.postId,
                      
  }
    console.log("my data", data);
    this.service.postApi('user/replyCommentInPost', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage)
        this.replyies=res.comments.replyComments
        console.log("fj", this.replyies);
        
        this.replycom=''
        
        this.getreplyComment()

        
      }
    })
    

  }

 getreplyComment(){
    let data={

      "userId":localStorage.getItem('user_id'),
      "postId": this.postId,
      "show": "replyComments"
    }

    this.service.postApi('user/viewPostLikesAndComment', data ).subscribe((res)=>{
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
