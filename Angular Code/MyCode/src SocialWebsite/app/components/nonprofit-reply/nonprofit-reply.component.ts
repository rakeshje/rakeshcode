import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-nonprofit-reply',
  templateUrl: './nonprofit-reply.component.html',
  styleUrls: ['./nonprofit-reply.component.scss']
})
export class NonprofitReplyComponent implements OnInit {
  reply: any=[];
  commentId: any;
  comment: any;
  postId: any;
  showTime: any;
  userPic: any;
  username: any;
  replycom: any='';
  replies: any=[];

  constructor(public route:Router, public service:ServerService, public active:ActivatedRoute) {
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
    
    let data ={
      "userId":localStorage.getItem('user_id'),
      "commentId":this.commentId,
      "comment":this.replycom,
      "gameId":this.postId
    }

    console.log("h", data);
    this.service.postApi('user/replyCommentInNonProfit', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage)
       console.log("gggf", res)
        this.replycom=''
        this.getreplyComment()
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })
    
    
  }

   getreplyComment(){
    let data ={

    "userId":localStorage.getItem('user_id'),
     "eventId": this.postId,
     "show": "replyComments"
    }

    this.service.postApi('user/viewNonProfitLikesAndComment', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responseMessage),
        this.replies=res.replyComments
        
      }
    },(error)=>{
      this.service.showErrToast("something went wrong")
    })
  }

}
