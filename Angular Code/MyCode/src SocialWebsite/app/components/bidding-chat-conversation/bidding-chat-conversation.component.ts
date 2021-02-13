import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-bidding-chat-conversation',
  templateUrl: './bidding-chat-conversation.component.html',
  styleUrls: ['./bidding-chat-conversation.component.scss']
})
export class BiddingChatConversationComponent implements OnInit {
  chat = [];
  newMessage: any = "";
  receiverId: any;
  productId: any;
  file: any;
  fileData: any;
  fileName: any;
  receiverName: any;
  receiverProfile: any;
  senderProfile: any;
  imageUrl: any = "";
  type: any;
  status: any;
  chatId: any;
  res_user_id: any;

  constructor(public server: ServerService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.receiverId = this.activatedRoute.snapshot.queryParams.ids[0];
    this.productId = this.activatedRoute.snapshot.queryParams.ids[1];
    // console.log("receiver Id", this.receiverId);
    // console.log("product Id", this.productId);
    this.chat = [];
    let data = {
      "userId": localStorage.getItem("user_id"),
      "sellerId": this.receiverId
    }
    console.log("userId",data);
    this.server.sendNewMessage(data, "chatHistory");
    this.server.getNewMessage("chatHistory").subscribe(msg => {
      console.log("get message====>from bidding", msg);
      if (msg['responseCode'] == 200) {
        this.receiverName = msg['result'][0].sellerId.firstName;
        this.receiverProfile = msg['result'][0].sellerId.profilePic;
        this.senderProfile = msg['result'][0].userId.profilePic;
        this.res_user_id = msg['result'][0].userId._id
        this.status = msg['result'][0].status.toLowerCase();
        this.chatId = msg['result'][0]._id;
        msg['result'][0].message.forEach(obj => {
          this.pushChat(obj)
        });
      }
    })
    // console.log("chatId=-=---=-=-=--=----->",this.chatId);
    this.server.getNewMessage("chattingAPI").subscribe(msg => {
      // console.log("get message====>", msg)
      if (msg['responseCode'] == 200) {
        this.pushChat(msg['result'].message[msg['result'].message.length - 1]);
      }
    })

  }
  
  pushChat(obj) {
    this.chat.push({
      profile: "assets/images/bitmapCopy.png",
      time: moment(obj.createdAt).format('LT'),
      message: obj.message,
      role: obj.senderId == localStorage.getItem("user_id") ? "receiver" : "sender",
      // role: obj.senderId == localStorage.getItem("user_id") ? "sender" : "receiver",
      mediaType: obj.mediaType
    })
    // console.log("chatlistmessage from Biddding",this.chat)
  }

  open() {
    var ele = document.getElementById("action");
    ele.classList.toggle("chat-clan");
  }

  submitChat(val) {
    if(this.newMessage == "" && this.imageUrl == ""){
    return;
  }
    let data = {
          "userId": localStorage.getItem("user_id"),
          "sellerId": this.receiverId,
          "productId":this.productId,
           "messages": [{
                "senderId": this.receiverId,
                "message": val == 'text' ? this.newMessage : this.imageUrl,
                "mediaType": val
           }]
    }
    console.log("data from 94",data);
    this.server.sendNewMessage(data, "chattingAPI");
    this.newMessage = "";
  }

  upload(event) {
    this.file = event.target.files[0];
    this.type = this.file.type;
    var reader = new FileReader()
    reader.onload = (e) => {
      $('#showImage').modal({backdrop: 'static', keyboard: false});
      this.fileData = e.target['result'];
    }
    reader.readAsDataURL(event.target.files[0]);
    this.fileName = event.target.files[0].name;    
  }

  submitImage() {
    let data = {
      image: this.fileData
    }
    this.server.showSpinner();
    this.server.postApi("chat/uploadImage", data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $('#showImage').modal('hide');
        this.imageUrl = res.result;
        if(this.file.type == "application/pdf"){
        this.submitChat('pdf')
      }
        else{
        this.submitChat('image');
      }
      } else{
      this.server.showErrToast(res.responseMessage);
    }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    });
  }

  changeStatus(val) {
    $(`#${val}`).modal("show");    
  }

  clearChat() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "chatId": this.chatId,
      "clearStatus": true
    }
    console.log("data=--=--=>",data);
    this.server.showSpinner();
    this.server.postApi('chat/bidderClearChat', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        this.open();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
    });
  }

  block(val) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "sellerId": this.receiverId,
      "status": val == "blockConfirmation" ? "BLOCK" : "ACTIVE"
    }
    this.server.showSpinner();
    this.server.postApi('chat/updateBiddingChatStatus', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        $(`#${val}`).modal("hide"); 
        this.server.showSuccToast(res.responseMessage);
        this.open();
      } else{
      this.server.showErrToast(res.responseMessage);
    }
    }, (err) => {
      this.server.hideSpinner();
      console.log();
    });
  }
}
