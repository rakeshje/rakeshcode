import { Component, OnInit } from '@angular/core';
import { ServerService }from 'src/app/services/server.service';
import { FormGroup , FormControl , Validators, FormBuilder} from '@angular/forms';
import { Subject }from 'rxjs';

declare var $ :any;
declare var google : any;

@Component({
  selector: 'app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.scss']
})
export class DiscussionForumComponent implements OnInit {

  discussionForm : FormGroup;
  selected:string="discussion-forum";
  lat: any;
  lng: any;
  listOfDiscussionForum: any;
  searchByName = new Subject<string>();
  viewDiscussionForum:boolean =false

  constructor(private server : ServerService,private fb :FormBuilder) { 
    this.searchByName.debounceTime(800).distinctUntilChanged().subscribe(success=>{
      this.gettingDiscussForum(success);
    })
  }

  ngOnInit() {
    this.selection('discussion-forum');
    this.gettingDiscussForum('');
    this.discussionForm = this.fb.group({
      'title': ['',[Validators.required]],
      'description': ['',[Validators.required]],
    })

    this.gettingCurrentLocation();
    
  }

  selection(path){
    this.selected = path;
    console.log("selected value", this.selected);
    // this.discussionForm.reset();
  }

  //getting Discussion forum
  gettingDiscussForum(search){
    this.server.showSpinner();
    let apireq = {
      "userId": localStorage.getItem('user_id'),
      "search": search
    }
    console.log("sffsgjks",apireq);
    this.server.postApi('user/viewDiscussionForum',apireq).subscribe(success=>{
      if(success.responseCode == 200){
        // this.server.showSuccToast(success.responseMessage);
        this.listOfDiscussionForum = success.result;
        console.log("discussione forum ",this.listOfDiscussionForum);
      }
      this.server.hideSpinner();
    },error=>{
      console.log("error from discussion forum",error);
      this.server.showErrToast(error);
      this.server.hideSpinner();
    })
  }


  //getting current location
  gettingCurrentLocation(){
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition((position)=> {
         
         // for when getting location is a success
         console.log('latitude', position.coords.latitude, 
                     'longitude', position.coords.longitude);

                     this.lat = position.coords.latitude;
                     this.lng = position.coords.longitude;
                    //  console.log("lat",this.lat);
                    //  console.log("lng",this.lng);
    });
    } else {
      // geolocation is not supported
      // get your location some other way
      this.server.showInfoToast('geolocation is not enabled on this browser')
      // console.log('geolocation is not enabled on this browser')
    }

    // setTimeout(()=>{
    //   console.log("lat",this.lat);
    // },1000)

  }

//uploading post
  postSubmit(){
   this.server.showSpinner();
   let apireq = {
    "userId":localStorage.getItem('user_id'),
    "title":this.discussionForm.value.title,
    "description":this.discussionForm.value.title,
    "lat":this.lat,
    "long":this.lng
   } 
   console.log("apireq------>",apireq);
   this.server.postApi('user/addDiscussionForm',apireq).subscribe(success=>{
     if( success.responseCode == 200){
      // console.log("success----->",success);
      this.server.showSuccToast(success.responseMessage);
      $('#post-submit').modal('show');
     }
     this.server.hideSpinner();
   },error=>{
     this.server.hideSpinner();
     this.server.showErrToast(error);
    //  console.log("error------->",error);
   })
  }

  //search discussion form by title name 
  // searchByTitle(search){
  //   this.server.showSpinner();
  //   let apireq ={
  //     'userId': localStorage.getItem('user_id'),
  //     'title': search
  //   }
  //   this.server.postApi('user/searchByName',apireq).subscribe(success=>{
  //     if(success.responseCode == 200){
  //       console.log("result from search", success);
  //       // this.listOfDiscussionForum = success.Discussion Titles
  //     }
  //   },error=>{
  //     console.log("error form error", error);
  //   })
  // }
}
