import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent implements OnInit {
  userId: string;
  auctionId: any;
  participantsDetails: any;

  constructor(private server : ServerService,private activatedRoute : ActivatedRoute) { 
    this.userId = localStorage.getItem('user_id');
    this.activatedRoute.params.subscribe( params=>{
      this.auctionId = params['id']
    })
  }

  ngOnInit() {
    this.getParticipantsDetails();
  }

  //getting participants details
  getParticipantsDetails(){
    // console.log("auction id ",this.auctionId);
    let apireq = {
      "userId":this.userId,
      "auctionId":this.auctionId
    }
    this.server.postApi('user/participantDetail',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        this.participantsDetails = success.biddingData;
        console.log(success)
      }
    },error=>{
      console.log(error);
    })
  }

  //approve participant
  approve(status,id){
    this.server.showSpinner();
    console.log("approve status=-=:",status);
    let apireq = {
      "biddingId":id,
      "userId":this.userId,
      "status":status  
    }
    this.server.postApi('user/upadteBiddingStatus',apireq).subscribe(success=>{
      if( success.responseCode == 200 ){
        this.getParticipantsDetails();
        this.server.showSuccToast(success.responseMessage);
      }
      this.server.hideSpinner();
    },error=>{
      this.server.hideSpinner();
      this.server.showErrToast(error);
      console.log(error);
    })
  }

  //cancel a participant bid
  cancel(status,id){
    this.server.showSpinner();
    console.log("Cancel status -=-:",status);
    let apireq = {
      "biddingId":id,
      "userId":this.userId,
      "status":status  
    }
    this.server.postApi('user/upadteBiddingStatus',apireq).subscribe(success=>{
      if(success.responseCode = 200){
        this.getParticipantsDetails();
        this.server.showSuccToast(success.responseMessage);
      }
      this.server.hideSpinner();
    },error=>{
      this.server.hideSpinner();
      this.server.showErrToast(error);
    })
  }
}
