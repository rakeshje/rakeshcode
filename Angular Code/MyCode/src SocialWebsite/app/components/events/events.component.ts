import { Component, OnInit, HostListener } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SharedModule } from '../shared/shared.module';

declare var $:any;
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    selected: any='events';
    myOptions: INgxMyDpOptions = {
      dateFormat: 'd/m/yyyy',
      todayBtnTxt: 'Today',
      sunHighlight: true,
      disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };
    total: number;
    addEventForm: FormGroup;
    type: any;
    base64Image: any="assets/images/Layer 139.png";
    upload: any;
    addEventDetails: any;
    filterBy: any="";
    videoUrl: string;
    eventList: any=[];
    pageNo: any= 1;
    limit: any=10;
    eventLocationArr: any=[];
    length: any;
    search: any="";
    myPostedEventsArr: any=[];
    cloudinaryUrl: any="assets/images/Layer 139.png";
    obj:any={}
    eventId: any;
    commentsArr: any=[];
    likesArr: any=[];
    searchTerm$ = new Subject<string>();
    selectedIndex:any
    commentInterval: any;
    myId: any;
    likeInterval: any;
    apiHit:boolean= true;
    scrollEventListen: boolean=false;
    newDate: any;
    time:any=[];  
    myEventTime:any=[];
    eventPostedDate: any;
    myEventPostedDate: any;
    days: number;
    hours: number;
    minutes: number;
    commentDate: number;
    viewCount: any;
    commentId: any;
  eventdata: any=[];
  friendListArray: any=[];
  friendId: any;
  allFriends: any;
  friendid: any=[];
  myArray: any =[];
  choosenFriend: any=[];
  eventid: any;
  ind: any;
  friendsList: any=[];
  edit: any = 'para';
  commentid: any;
  comment: any;
  userid: string;
  id: any=[];
  friendArr: any=[];
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };

    constructor(public server:ServerService, private router:Router, public shared: SharedModule) { 
      // to get my id
      this.myId = localStorage.getItem('user_id')
      window.scrollTo(0,0)

      // to add search filter
      this.server.search(this.searchTerm$)
      .subscribe(results => {
        this.search = results;
        this.myPostedEventsArr = []
        // if(this.search) {
        // }else {
        //    this.myPostedEventsArr = []
        // }
        this.pageNo=1
        this.getMyPostedEvents();

      });

      let date1= new Date()
      this.newDate=date1.getTime()
      console.log("Today's date==>>",this.newDate)
    }

    ngOnInit() {
      this.userid=localStorage.getItem('user_id')
      this.checkValidAddEventForm()
      this.callByUrl()   ;
      this.selectTab('events')
      this.getEventsList() 
    
    }

    ngOnDestroy() {
      clearInterval(this.commentInterval)
      clearInterval(this.likeInterval)
    }

    getId(id){
      console.log("bhdfhbvdhbhjb")
    this.commentId=id
    console.log("dfvd",this.commentId)
    this.addDeleteComment('false')
    }

    // to get event location
    getEventLocation() {
      this.server.postApi('user/eventLocation',{}).subscribe((res)=> {
        this.eventLocationArr = res.result;
      })
    }

    // to call by Url
    callByUrl()  {
      let arr = window.location.href.split('/')
      let val = arr[arr.length - 1]
      this.selectTab(val)
    }

    // to check tab
    selectTab(path) {
      window.scrollTo(0,0)
      this.selected = path;
      this.scrollEventListen = false
      this.eventList = [];
      this.myPostedEventsArr =[];
      this.commentsArr = [];
      this.likesArr= []
      this.cloudinaryUrl = ''
      this.router.navigateByUrl('events/' + path)
      this.pageNo = 1
      this.total = 0
      this.search = "";
      if(path == 'events') {
        this.getEventsList();
        this.getEventLocation();
      } else if(path == 'View_My_Posted_Events') {
          this.getMyPostedEvents()
      }
    }

    //to check validity */
    checkValidAddEventForm() {
      this.addEventForm = new FormGroup({
        eventTitle: new FormControl('', [Validators.required]),
        eventDescription: new FormControl('',[Validators.required]),
        eventLocation: new FormControl('', [Validators.required]),
        eventDate: new FormControl('', [Validators.required]),
        eventTime: new FormControl('00:00',),
      })
    }

    /** to get the value of Add Event form field  */
    get eventTitle(): any {
      return this.addEventForm.get('eventTitle');
    }
    get eventDescription(): any {
      return this.addEventForm.get('eventDescription');
    }
    get eventLocation(): any {
      return this.addEventForm.get('eventLocation');
    }
    get eventDate(): any {
      return this.addEventForm.get('eventDate');
    }
    get eventTime(): any {
      return this.addEventForm.get('eventTime');
    }

    /** To upload cover picture of Event */
    handleFileInput(event) {
      var self = this;
      if(event.target.files && event.target.files[0]){
        this.type = event.target.files[0].type;
        console.log(this.type)
        if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv' || this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') { 
          var reader = new FileReader()
          reader.onload = (e)=> {
            this.base64Image = e.target['result'];
            let mb = 1000000;
            let size = ((event.target.files[0]['size'])/mb)
            if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv') {
              if(size <= 50) {
                this.uploadFile()
              }else {
                this.server.showErrToast('Size must be less than 50 MB')
                return;
              }
            }else if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
              if(size <= 10) {
                this.uploadFile()
              }else {
                this.server.showErrToast('Size must be less than 10 MB')
                return;
              }
            }
            }
          reader.readAsDataURL(event.target.files[0]);
        } else {
            this.server.showErrToast("Select only mp4,mov or flv file.");
          }
      }
    }

    // to uplaod file
    uploadFile() {
      this.cloudinaryUrl=';'
      // to upload image and video
      let data={}, url ;
      if (this.type === 'image/png' || this.type === 'image/jpg') {
        this.base64Image = this.base64Image.substring(22);
      } else if (this.type === 'image/jpeg') {
        this.base64Image = this.base64Image.substring(23);
      }   

      if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
        data['profilePic'] =  'data:'+ this.type +'/;base64,'+this.base64Image;
        url ='user/imageUpload/'
      }else if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv') {
        data['video'] = this.base64Image;
        url = 'user/videoUpload'
      }

      if(navigator.onLine) {
        let api = this.server.postApi(url,data).subscribe((res)=>{
          this.cloudinaryUrl = res.result
          console.log(this.cloudinaryUrl)
        })
      }
    }

    //To add events
    addEvent(){
      if(!this.cloudinaryUrl) {
        this.server.showErrToast('Please upload video or image')
        return;
      }
      let data={
        "userId": localStorage.getItem('user_id'),
        "title": this.addEventForm.value.eventTitle,
        "description": this.addEventForm.value.eventDescription,
        "location": this.addEventForm.value.eventLocation,
        "date":this.addEventForm.value.eventDate.formatted,
        "time": this.addEventForm.value.eventTime,
      }

      if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
        data['image'] =  this.cloudinaryUrl
      }else {
        console.log(this.base64Image)
        data['videoBase'] = this.cloudinaryUrl
      }
      // to check internet connection
      if(navigator.onLine) {
        this.addEventDetails = this.server.postApi('user/addEvent', data).subscribe((res)=> {
          
            this.addEventDetails.unsubscribe()
            if(res.responseCode == 200) {
              this.base64Image="";
              this.addEventForm.reset();
              this.server.showSuccToast('Event Posted!')  
            }
              this.selectTab('events')
              this.getEventsList()
             
        })    
      }
    }

    // to add
    addFilter(val) {
      if(this.filterBy == val) {
        this.filterBy = ''
      }else {
        this.filterBy = val
      }
      this.eventList = []
      this.getEventsList();
    }

    chooseFriend(friend, event) {
      if(event.target.checked)
      this.choosenFriend.push(friend._id);
      else {
        var ind = this.choosenFriend.findIndex(x => x == friend._id);
        if(ind > -1) {
          this.choosenFriend.splice(ind, 1);
        }
      }
    }
  

    
 

openModal(event){

  this.eventid=event
  this.friendsList = this.shared.allFriends;
  this.dropdownList=this.friendsList
  console.log("hh", this.dropdownList);
  
  this.dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  $('#sharePost').modal("show")
}

    // to share event post
    shareEvent(){
     
      this.server.showSpinner()
      let data={
      "memberId": localStorage.getItem('user_id'),
      "eventId":this.eventid,
      "sharedTo":this.friendArr
    }
    console.log("my data464", data)
    this.server.postApi('user/shareEventPost', data).subscribe((res)=>{
      console.log("my event4544", res)
      if(res.responseCode==200){
        $('#sharePost').modal("hide")
        this.server.hideSpinner();
        this.server.showSuccToast(res.responseMessage)

      }
    },(error)=>{
      this.server.showErrToast("check the internet connection")
    })
    }

    //To select particular friend/member
  onItemSelect(item: any) {
    // let obj = {
    //   "memberId": item['_id']
    // }
    this.friendArr.push(item['_id'])
    console.log(this.friendArr)
  }
  //To select all members/friends
  onSelectAll(items: any) {
    console.log("g",items);
    
    let obj = {}
    items.forEach((element) => {
      
       
      
      this.friendArr.push( element['_id'])
    })
    console.log('this.friendArr',this.friendArr)
  }
  //To unselect any particular friend/member
  onItemDeSelect(item: any) {
    let index = this.friendArr.findIndex(x => x == item)
    this.friendArr.splice(index, 1)
    console.log(this.friendArr)
  }

    // to get event list
    getEventsList() {
      let data = {
        "userId": localStorage.getItem('user_id'),
        "newsDay":this.filterBy,
        "pageNumber": this.pageNo,
        "limit": this.limit,
        "search": this.search
      }
      
      if(navigator.onLine) {
        this.server.postApi('user/viewEvent', data).subscribe((res)=> {
          if(res.responseCode == 200) {
            let result = res.result.docs;
            this.eventdata=res.result.docs
            this.eventdata.forEach(e => {
              this.id.push(e.userId._id)
            });
            // console.log("jhfrgikjf", this.id);
            
            // console.log("my eventdata is",this.eventdata)
                this.time=res.result.docs
                this.time.forEach((element,index) => {
                  //   this.timeArr.push(element.createdAt)
                  //  console.log('bfdfbdfb====>>>>',this.timeArr)
                   let oldDate= new Date(element.createdAt).getTime()
                   console.log(oldDate)
                   this.eventPostedDate= this.newDate - oldDate
                   console.log("diff date===",this.eventPostedDate)
                                     
                      this.days = Math.floor(this.eventPostedDate / (1000 * 60 * 60 * 24));
                      this.hours = Math.floor((this.eventPostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      this.minutes = Math.floor((this.eventPostedDate % (1000 * 60 * 60)) / (1000 * 60));
                      var seconds = Math.floor((this.eventPostedDate % (1000 * 60)) / 1000);
     
                      element['seconds'] = seconds 
                      element['minutes'] = this.minutes 
                      element['hours'] = this.hours
                      element['days'] = this.days  
                      if(Number(this.days) > 0) {
                        element['showTime'] = this.days + ' days ago'
                      }else if(Number(this.hours) > 0) {
                       element['showTime'] = this.hours + ' hr ago'
                     }else if(Number(this.minutes) > 0) {
                       element['showTime'] = this.minutes + ' min ago'
                     }else {
                       element['showTime'] = 'sec ago'
                     }
                      console.log("time is", this.days + ' ' + this.hours + ' ' + this.minutes + ' ' + seconds)                      
                  });
                  
            if(result.length > 0) {
              result.forEach(element => {
                element['dynamicClass'] = "hide-clas none"
                if(element.likes.length > 0) {
                  element.likes.forEach(element2 => {
                    if(element2['likedId'] == localStorage.getItem('user_id')) {
                      element['myLike']= true
                    }else {
                      element['myLike']= false
                    }
                  })
                }
                this.eventList.push(element)
              });
              this.scrollEventListen = false
            }else {
              // if there no data and scroll event is listened
              if(this.scrollEventListen) {
                this.pageNo = this.pageNo - 1
              }
            }
           
          
            console.log(this.eventList)
            this.length = this.eventList.length
          }
        })
      }
    }

    // to change location
    changeLocation(selected_location) {
      this.search = selected_location
      this.eventList = []
      this.getEventsList()
    }

    // to toggle list
    showList(index) {      
      if(this.eventList[index]['dynamicClass'] == "hide-clas none") {
        this.eventList[index]['dynamicClass']="hide-clas"
      }else if(this.eventList[index]['dynamicClass'] == "hide-clas") {
        this.eventList[index]['dynamicClass']="hide-clas none"
      }
    }

    showList1(index) {      
      if(this.myPostedEventsArr[index]['dynamicClass'] == "hide-clas none") {
        this.myPostedEventsArr[index]['dynamicClass']="hide-clas"
      }else if(this.myPostedEventsArr[index]['dynamicClass'] == "hide-clas") {
        this.myPostedEventsArr[index]['dynamicClass']="hide-clas none"
      }
    }

    // showHide(index) {
    //   if(this.commentsArr[index]['dynamicClass'] == "hide-clas none") {
    //     this.commentsArr[index]['dynamicClass']="hide-clas"
    //   }else if(this.commentsArr[index]['dynamicClass'] == "hide-clas") {
    //     this.commentsArr[index]['dynamicClass']="hide-clas none"
    //   }
    // }
     // showHide(index) {
    //   if(this.commentsArr[index]['dynamicClass'] == "hide-clas none") {
    //     this.commentsArr[index]['dynamicClass']="hide-clas"
    //   }else if(this.commentsArr[index]['dynamicClass'] == "hide-clas") {
    //     this.commentsArr[index]['dynamicClass']="hide-clas none"
    //   }
    // }

    

    //  api for my p[osted events
    getMyPostedEvents() {
      let data = {
        "userId": localStorage.getItem('user_id'),
        "search": this.search,
        "limit": this.limit,
        "pageNumber": this.pageNo
      }

      if((this.search && this.pageNo == 1)){
        this.myPostedEventsArr = []
      }

      if(navigator.onLine) {
        this.server.postApi('user/myEvent', data).subscribe((res)=>{
          if(res.responseCode == 200) {
            let result = res.result.docs
            this.myEventTime=res.result.docs
                this.myEventTime.forEach((element,index) => {
                  //   this.timeArr.push(element.createdAt)
                  //  console.log('bfdfbdfb====>>>>',this.timeArr)
                   let oldDate= new Date(element.createdAt).getTime()
                   console.log(oldDate)
                   this.myEventPostedDate= this.newDate - oldDate
                   console.log("diff date===",this.myEventPostedDate)
                                     
                      this.days = Math.floor(this.myEventPostedDate / (1000 * 60 * 60 * 24));
                      this.hours = Math.floor((this.myEventPostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      this.minutes = Math.floor((this.myEventPostedDate % (1000 * 60 * 60)) / (1000 * 60));
                      var seconds = Math.floor((this.myEventPostedDate % (1000 * 60)) / 1000);
     
                      element['seconds'] = seconds 
                      element['minutes'] = this.minutes 
                      element['hours'] = this.hours
                      element['days'] = this.days  
                      if(Number(this.days) > 0) {
                        element['showTime'] = this.days + ' days ago'
                      }else if(Number(this.hours) > 0) {
                       element['showTime'] = this.hours + ' hr ago'
                     }else if(Number(this.minutes) > 0) {
                       element['showTime'] = this.minutes + ' min ago'
                     }else {
                       element['showTime'] = 'sec ago'
                     }
                      console.log("time is", this.days + ' ' + this.hours + ' ' + this.minutes + ' ' + seconds)                      
                  });

            if(result.length > 0) {
              result.forEach(element => {
                element['dynamicClass'] = "hide-clas none"
                this.myPostedEventsArr.push(element)
              });
              // to deactivate scroll event
              this.scrollEventListen =  false
            }else {
              //to check if scroll event is called or not
              if(this.scrollEventListen) {
                this.pageNo = this.pageNo - 1;
              }
            }
            this.total= this.myPostedEventsArr.length
          }
        })
      }
    }

    // to get event on scroll End(bottom of the page)
    @HostListener("window:scroll", [])
    onScroll(): void {
    if (((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) && !this.scrollEventListen) {
      console.log('called')
        console.log('bottom reached!',window.innerHeight + window.scrollY  + ' >= ' + (document.body.offsetHeight))
            // you're at the bottom of the page
            this.scrollEventListen = true
            console.log('length of event Arr', this.eventList.length)
            this.callOnScroll()
          }  
    }

    // to call on scroll
    callOnScroll() {
      this.pageNo ++;
      let arr = window.location.href.split('/')
      let path = arr[arr.length - 1]
      if(path!= 'Add_Events') {
        if(path == 'events') {
          this.getEventsList();
        } else if(path == 'View_My_Posted_Events') {
            this.getMyPostedEvents()
        }   
      }else {
        return;
      }
    }

    // to open comments modal
    openCommentModal(data) {
      this.eventId = data['_id']
      this.viewLikesComments(data,'comments')
      this.commentInterval = setInterval(()=>{
        this.viewLikesComments(data,'comments')
      },60000)
    }

    // to open likes modal
    openLikesModal(data) {
      if(data.likes.length>0) {
        this.eventId = data['_id']
        this.viewLikesComments(data,'likes')
        this.likeInterval = setInterval(()=>{
          this.viewLikesComments(data,'likes')
        },60000)
      }
    }

    // to view likes and comments
    viewLikesComments(data,show) {
      let req = {
        "userId":data['userId']['_id'],
        "eventId":data['_id'],
        "show":show
      }
      if(navigator.onLine && this.apiHit) {
        this.apiHit = false
        let api =this.server.postApi('user/viewEventsLikesAndComment', req).subscribe((res)=> {
          this.apiHit = true
          api.unsubscribe();  
          console.log(res.comments)
          if(show == 'comments') {
            //console.log('bfdfbdfb====>>>>',this.time)
            res.comments.forEach((element,index) => {
             //   this.timeArr.push(element.createdAt)
             //  console.log('bfdfbdfb====>>>>',this.timeArr)
              let oldDate= new Date(element.commentedTime).getTime()
              console.log(oldDate)
              this.commentDate= this.newDate - oldDate
              console.log("diff date===",this.commentDate)
                                   //take out milliseconds
                 this.commentDate = this.commentDate/1000;
                 var seconds = Math.floor(this.commentDate % 60);
                 this.commentDate = this.commentDate/60; 
                 this. minutes = Math.floor(this.commentDate % 60);
                 this.commentDate = this.commentDate/60; 
                 this. hours = Math.floor(this.commentDate % 24);  
                 this. days = Math.floor(this.commentDate/24);

                 element['seconds'] = seconds 
                 element['minutes'] = this.minutes 
                 element['hours'] = this.hours
                 element['days'] = this.days  
                 if(Number(this.days) > 0) {
                   element['showTime'] = this.days + ' day ago'
                 }else if(Number(this.hours) > 0) {
                  element['showTime'] = this.hours + ' hr ago'
                }else if(Number(this.minutes) > 0) {
                  element['showTime'] = this.minutes + ' min ago'
                }else if(Number(seconds) > 0) {
                  element['showTime'] = seconds + ' sec ago'
                }
                 console.log("time is", this.days || this.hours || this.minutes || seconds)
                                 
             });


            if(this.selected == 'events') {
              let index = this.eventList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.eventList[index]['comments'] = res.comments
            }else if(this.selected == 'View_My_Posted_Events') {
              let index = this.myPostedEventsArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedEventsArr[index]['comments'] = res.comments
            }
            // to open modal
            $('#commentModal').modal({backdrop: 'static', keyboard: false}) 
            res.comments.forEach((element)=>{
              element['dynamicClass'] = "hide-clas none"
             // to show trash icon and edit icon
             element['showTrashIcon'] = false
             element['showEditIcon'] = false
             element['showEdit'] =false

           if(localStorage.getItem('user_id') == element.commentedUser) {
             element['showTrashIcon'] = true
             element['showEditIcon'] = true
           }

           // to check if game is posted by  same user or not
           if(data['userId']['_id'] == data['_id']) {
             element['showTrashIcon'] = true
           }
         })

            this.commentsArr = res.comments
            console.log("jfjg", this.commentsArr);
            
          }else if(show == 'likes') {
            if(this.selected == 'events') {
              let index = this.eventList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.eventList[index]['likes'] = res.likes
            }else if(this.selected == 'View_My_Posted_Events') {
              let index = this.myPostedEventsArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedEventsArr[index]['likes'] = res.likes
            }
            // to open modal
            $('#likedmodal').modal({backdrop: 'static', keyboard: false}) 
            // for managing add button
            res.likes.forEach((element)=> {
              element['add_button']= true
            })
            this.likesArr = res.likes
            console.log('ARRAY LIKES',this.likesArr)
          }
        })
      }
    }

    // to add comment to event
    addDeleteComment(comments) { 
      if(this.obj.comment || comments =='false') {
        let data = {
          "userId": localStorage.getItem('user_id'),
          "eventId": this.eventId,
          "comment": this.obj.comment,
          "commentId": this.commentId,
          "comments":comments,
        }
        if(navigator.onLine && this.apiHit) {
          this.apiHit = false
          let api = this.server.postApi('user/eventLikeAndComment',data).subscribe((res)=>{
            this.apiHit = true
            api.unsubscribe()
            if(res.responseCode == 200) {
              this.obj.comment =''
              this.obj.i=''
              this.server.showSuccToast('Comment updated successfully');
              if(this.selected == 'events') {
                if(comments =='true'){
                  console.log(res.comments.comments[res.comments.comments.length - 1])
                  this.eventList[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments;
                }else{
                  this.eventList[this.selectedIndex]['comments'] = res.result.comments
                  this.commentsArr = res.result.comments;
                }
               
              }else if(this.selected == 'View_My_Posted_Events') {
                if(comments =='true'){
                  this.myPostedEventsArr[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments
                }else{
                  this.myPostedEventsArr[this.selectedIndex]['comments'] = res.result.comments
                  this.commentsArr = res.result.comments;
                }
               
              }

              this.commentsArr.forEach((element,index) => {
                //   this.timeArr.push(element.createdAt)
                //  console.log('bfdfbdfb====>>>>',this.timeArr)
                 let oldDate= new Date(element.commentedTime).getTime()
                 console.log(oldDate)
                 this.commentDate= this.newDate - oldDate
                 console.log("diff date===",this.commentDate)
                                      //take out milliseconds
                    // this.commentDate = this.commentDate/1000;
                    // var seconds = Math.floor(this.commentDate % 60);
                    // this.commentDate = this.commentDate/60; 
                    // this. minutes = Math.floor(this.commentDate % 60);
                    // this.commentDate = this.commentDate/60; 
                    // this. hours = Math.floor(this.commentDate % 24);  
                    // this. days = Math.floor(this.commentDate/24);
                    this.days = Math.floor(this.commentDate / (1000 * 60 * 60 * 24));
                    this.hours = Math.floor((this.commentDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    this.minutes = Math.floor((this.commentDate % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((this.commentDate % (1000 * 60)) / 1000);
   
                    element['seconds'] = seconds 
                    element['minutes'] = this.minutes 
                    element['hours'] = this.hours
                    element['days'] = this.days  
                    if(Number(this.days) > 0) {
                      element['showTime'] = this.days + ' days ago'
                    }else if(Number(this.hours) > 0) {
                     element['showTime'] = this.hours + ' hr ago'
                   }else if(Number(this.minutes) > 0) {
                     element['showTime'] = this.minutes + ' min ago'
                   }else {
                     element['showTime'] = 'sec ago'
                   }
                    console.log("time is", this.days + ' ' + this.hours + ' ' + this.minutes + ' ' + seconds)                      
                });

            }
          })
        }
      }else{
        return;
      }
    }

    /** to check space */
    toCheckSpace(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      console.log(charCode)
      if(charCode == 32 && !evt.target.value) {
        evt.preventDefault()
      }else {
        return true;
      }
    }
    
    // to like event
    addLikeEvent(data,val) {
      this.eventId = data['_id']
      let index = this.eventList.findIndex(x=>x == data)
      this.selectedIndex = index
      console.log(index)
      if(navigator.onLine && this.apiHit) {
        this.apiHit = false
        let data = {
          "userId": localStorage.getItem('user_id'),
          "eventId": this.eventId,
          "like": val
        }
        this.server.postApi('user/eventLikeAndComment',data).subscribe((res)=>{
          this.apiHit = true
          if(res.responseCode == 200) {
            if(val == 'true') {
              this.server.showSuccToast('Liked!')
              if(this.selected == 'events') {
                this.eventList[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;

                this.eventList[this.selectedIndex]['myLike'] = true
              }else if(this.selected == 'View_My_Posted_Events') {
                this.myPostedEventsArr[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;
                this.eventList[this.selectedIndex]['myLike'] = true
              }
            }else if(val == 'false'){
              this.server.showSuccToast('UnLiked!')
              if(this.selected == 'events') {
                this.eventList[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.eventList[this.selectedIndex]['myLike'] = false
              }else if(this.selected == 'View_My_Posted_Events') {
                this.myPostedEventsArr[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.eventList[this.selectedIndex]['myLike'] = false
              }
              console.log(this.eventList[this.selectedIndex])
            }
          }
        })
      }
    }

    // to delete comment 
    deleteComment() {

    }

    // on close modal
    closeModal() {
      console.log('gyuuy')
      clearInterval(this.commentInterval);
      clearInterval(this.likeInterval);
      this.commentsArr = [];
      this.likesArr= []
    }

     // to add / remove friend in a list from suggestion
     addFriend(id) {

      let data = {
          "friendId": id,
          "response": 'SENT'
      }
      if(navigator.onLine) {
          let add_friend = this.server.postApi('user/sendFriendRequest',data).subscribe((res)=> {
              add_friend.unsubscribe()
              if(res.responseCode == 200) {
                  this.server.showSuccToast(res.responseMessage)
                  let index = this.likesArr.findIndex(x=>x['likedId'] == id);
                  this.likesArr[index]['add_button'] = false
                  
              }
          })
      }else {
          this.server.showWarnToast('Check internet connection!')
      }
  }


  //edit delete of post
  actionOnEventList(val,event_id,index){
    let data={
      "userId":localStorage.getItem('user_id'),
      "eventId":event_id,
      "type":val,
    }
    if(navigator.onLine) {
      this.server.postApi('user/hideAndDeleteEvent', data).subscribe((res)=> {
        if(res.responseCode == 200) {
          if(this.selected == 'events') {
            this.eventList.splice(index,1)
          }else if(this.selected == 'View_My_Posted_Events') {
            this.myPostedEventsArr.splice(index,1)
  
          }
         this.server.showSuccToast('Event Updated Successfully.')
        }
      })
  }
   }


   // viewers of videos
   viewers(event_id){
    let data={
      "userId":localStorage.getItem('user_id'),
      "eventId":event_id,
     
    }
    if(navigator.onLine) {
      this.server.postApi('user/eventViewers', data).subscribe((res)=> {
        if(res.responseCode == 200) {
          this.viewCount=res.result
          console.log("view no:", this.viewCount )
          //this.postView()
         //this.server.showSuccToast('Post Deleted Successfully.')
        }
      })
  }
   }

   // to edit comment
   editComment(data,id,index,edit) {
    // to open one dit at a time
    this.commentid=id;
    this.edit=edit
    // this.comment=comment,
    this.commentsArr.forEach(element => {
    element['showEdit'] = false
    });
    console.log(data.comment)
    this.obj.edit_comment = data.comment;
    this.commentsArr[index]['showEdit'] = true
    this.selectedIndex = index;
    console.log('data', this.commentid,edit);
    }

    // editcomment(comment, id, edit, i){
    //   this.commentid=id
    //   this.comment=comment,
    //   this.edit=edit
    //   console.log('data', this.commentid,comment,edit);
      

    // }
    // to call edit api
    // callEditApi(evt) {
    //   console.log('event',evt);
    //   this.comment = evt
    //    let req = {
    //      "userId":localStorage.getItem('user_id'),
    //      "comment": this.comment,
    //      "commentId":this.commentid,
    //      "eventId": this.eventId
    //    }
       
    //    this.server.postApi('user/editLikesAndComment', req).subscribe((res)=>{
    //      if(res.responseCode == 200){
    //       this.comment = '';
    //        this.commentsArr[this.selectedIndex]['comment'] = this.obj.edit_comment
    //        this.obj.edit_comment=''
    //        this.commentsArr[this.selectedIndex]['showTime']= 'sec ago'
    //        this.commentsArr[this.selectedIndex]['showEdit'] = false
    //      }
    //    })
    // }

    //To update comment
    updateComment(evt){
      console.log('event',evt);
      this.comment = evt
     //  to call API on enter key
       let req = {
         "userId":localStorage.getItem('user_id'),
         "comment": this.comment,
         "commentId":this.commentid,
         "eventId": this.eventId
       }
       
       this.server.postApi('user/eventEditComment', req).subscribe((res)=>{
        console.log('res',res); 
        if(res.responseCode == 200){
          this.server.showSuccToast(res.responseMessage)
          this.comment = '';
          console.log('res',res);
          
        }
        else{
          console.log('res',res);

        }
      })
    }

    replyComment(item){
      
        let data={
          "userId":localStorage.getItem('user_id'),
          "commentId":item._id,
          "comment":item.comment,
          "postId":this.eventId,
          "userPic":item.userPic,
          "showTime":item.commentedTime,
          "username":item.userName
      }
      console.log("fjgj", data);
      
     $('#commentModal').modal('hide')
      this.router.navigate(['/event-reply'],{queryParams:{value:JSON.stringify(data)}})

      

    }
  
}