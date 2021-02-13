import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-friend-chat',
  templateUrl: './friend-chat.component.html',
  styleUrls: ['./friend-chat.component.scss']
})
export class FriendChatComponent implements OnInit {
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
  onlineUser: any = [];
  friendList: any;
  chatForm: FormGroup;
  msgSender: any =[];
  message: any;
  item: any;
  url: string;
  base64Image: any;
  type1: any;

  constructor(private server : ServerService,public activatedRoute: ActivatedRoute, public shared: SharedModule,private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        console.log(ev);
        this.listOfAllMessage()

        
        /* Your code goes here on every router change */}

    });
  }

  ngOnInit() {
    this.chatForm = new  FormGroup({
      'chat' : new FormControl('')
    })
      this.activatedRoute.queryParams.subscribe(x=>{
       this.item =   JSON.parse(x.value);
        console.log('params', this.item )

         this.receiverId =  this.item.id
      });
       
      this.listOfAllMessage()
           }

  listOfAllMessage() {

    let data = {
    "senderId": localStorage.getItem("user_id"),
    "receiverId": this.receiverId
    }
    console.log("historyRequest", data)
    this.server.sendNewMessage(data, "friendChattingHistory");
    this.server.getNewMessage('friendChattingHistory').subscribe(msg => {
    console.log('Hey I am your Response from history', msg)
    
    if (msg['responseCode'] == 200) {
      if(msg['result'].firstName) {
        this.receiverProfile = msg['result'].profilePic;
        this.receiverName = msg['result'].firstName;
      }
      else{
        this.msgSender = msg['result'][0]['messages'];
        this.senderProfile = msg['result'][0]['receiverId']['profilePic']
        this.receiverProfile = msg['result'][0]['senderId']['profilePic']
        this.msgSender.forEach(obj => {
        obj.type = obj.receiverId == localStorage.getItem("user_id") ? "sender" : "receiver"
        });
        this.chatId = msg['result'][0]._id;

      }
    console.log('msgSender', this.msgSender);
    
    }
    })
    }


    sendMessage(val) {
      console.log('val',val)
      if(this.chatForm.value.chat == "" && this.imageUrl == "")
      return;
    this.message = this.chatForm.value.chat
    let data1 = {
    "senderId": localStorage.getItem("user_id"),
    "receiverId": this.receiverId,
    "messages": [{
    "receiverId": this.receiverId,
    "message": val == 'text' ? this.message : this.imageUrl,
    "mediaType" : val.toString()
    }]
    }
    
    console.log(data1)
    
    this.server.sendNewMessage(data1, "friendChatting");
    this.server.getNewMessage("friendChatting").subscribe(msg => {
    console.log('Hey I am your Response chat', msg)
    
    if (msg['responseCode'] == 200) {
    this.chatForm.value.chat = ''
    this.msgSender = msg['result']['messages']
    this.msgSender.forEach(element => {
    
    if (element.receiverId == localStorage.getItem("user_id")) {
        element.type = 'sender';

    //  this.sendMessages.push(element)
    // console.log("all send message", this.sendMessages)
    
    }
    if (element.receiverId != localStorage.getItem("user_id")) {
    element.type = 'receiver';
    // this.recieveMessages.push(element)
    // console.log("all recieve message", this.recieveMessages)
    
    }
    });
    this.chatForm.reset();
     this.listOfAllMessage()
    }
    })
    }
    


  open() {
    var ele = document.getElementById("action");
    ele.classList.toggle("chat-clan");
  }

  changeStatus(val) {
    $(`#${val}`).modal("show");    
  }

  clearChat() {
    let data = {
      "senderId": localStorage.getItem("user_id"),
      "chatId": this.chatId,
      "clearStatus": true
    }
    this.server.showSpinner();
    this.server.postApi('chat/clearChatForFriend', data).subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.msgSender  = "";
        this.server.showSuccToast(res.responseMessage);
        this.open();
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.server.hideSpinner();
    });
  }

  
  upload(event) {
    this.file = event.target.files[0];
    console.log('file',this.file);
    
    if(this.file.size>8388607){
        this.server.showErrToast("File size should not be greater than 10MB.");      
      return false;
    }
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
        if(this.file.type == "application/pdf")
        this.sendMessage('pdf');
        else
        this.sendMessage('image');
      } else
      this.server.showErrToast(res.responseMessage);
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    });
  }

 
}


