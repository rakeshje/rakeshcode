import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-event-reply',
  templateUrl: './event-reply.component.html',
  styleUrls: ['./event-reply.component.scss']
})
export class EventReplyComponent implements OnInit {
  reply: any=[];
  commentId: any;
  comment: any;
  postId: any;
  showTime: any;
  userPic: any;
  username: any;
  getreply: any=[];
  replycom: any='';

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
    let data={
      "userId":localStorage.getItem('user_id'),
      "commentId":this.commentId,
      "comment":this.replycom,
      "eventId":this.postId
    }
    this.service.postApi('user/replyCommentInEvent', data).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.showSuccToast(res.responsemessage)
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
      "eventId": this.postId,
      "show": "replyComments"
    }

    this.service.postApi('user/viewEventsLikesAndComment', data ).subscribe((res)=>{
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
