import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply-ticket',
  templateUrl: './reply-ticket.component.html',
  styleUrls: ['./reply-ticket.component.css']
})
export class ReplyTicketComponent implements OnInit {
  chatForm:FormGroup
  id: any;
  replyList: any=[];
  image: any;

  constructor(public active: ActivatedRoute, public route:Router, public service:MainService ) { }

  ngOnInit(): void {
    this.chatForm= new FormGroup({
      'text': new FormControl('', Validators.required)
    })
    this.id=this.active.snapshot.paramMap.get('id')
    this.getReplyList()
  }

  getReplyList(){
    this.service.showSpinner();
    var url="static/get-ticket-reply-data?ticketId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      console.log('fg', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.replyList=res.data;
        this.image=res.data[0].imageUrl
        console.log('gh', this.image);
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  sendMessage(){
    this.service.showSpinner();
    let supportReplyDto={
      'ticketId':this.id,
      'message':this.chatForm.value.text,
      'languageCode':null,
      'imageUrl':this.image
    }
    this.service.post('static/support-ticket-reply', supportReplyDto).subscribe((res:any)=>{
      console.log('fg', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.getReplyList();
        this.chatForm.reset();
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

}
