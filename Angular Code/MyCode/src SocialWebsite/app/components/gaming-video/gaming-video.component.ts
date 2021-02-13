import { Component, OnInit, HostListener } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { SharedModule } from '../shared/shared.module';
declare var $:any

@Component({
    selector: 'app-gaming-video',
    templateUrl: './gaming-video.component.html',
    styleUrls: ['./gaming-video.component.scss']
})
export class GamingVideoComponent implements OnInit {
    selected: string="gamingvideo";
    total: any;
    page: number=1;
    AddGamingVideoForm: FormGroup;
    type: any;
    base64Image: any="assets/images/Layer 139.png";
    cloudinaryUrl: any="";
    
    gamingList: any=[];
    commentsArr: any=[];
    length: any;
    gameId: any;
    likeInterval: any;
    commentInterval: any;
    likesArr: any=[];
    apiHit:boolean= true;
    selectedIndex: any;
    myPostedGamingArr: any=[];
    obj:any={}
    filterBy: any="";
    pageNo: any= 1;
    searchTerm$ = new Subject<string>();
    limit: any=10;
    search: any="";
    bankList: any=[];
    scrollEventListen: boolean=false;
  myOptions: INgxMyDpOptions = {
    dateFormat: 'd/m/yyyy',
    todayBtnTxt: 'Today',
    sunHighlight: true,
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
  };

      // payment form
     
    selectedCardDetails: any={};
    resultgame: any=[];
    newDate: any;
    time:any=[]; 
    myGameTime:any=[]; 
    gamePostedDate: any;
    days: number;
    hours: number;
    minutes: number;
    commentDate: number;
    myGamePostedDate: any;
    viewCount: any;
    commentId: any;
  payForm: FormGroup;
  userIdofGame: any = [];
  gameid: any;
  friendsList: any=[];
  choosenFriend: any=[];
  videoData: any;
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  friendArr: any=[];
  userid: string;
      // to get form value
      get bank(): any {
        return this.payForm.get('bank');
      } 
      get expiry_date():any {
        return this.payForm.get('expiry_date');
      }
      get cvv():any {
        return this.payForm.get('cvv')
      }

    

    constructor(public server:ServerService, private router:Router, public shared:SharedModule) {
      window.scrollTo(0,0)
      // to add search filter
      this.server.search(this.searchTerm$)
      .subscribe(results => {
        this.search = results;
        this.myPostedGamingArr = []
        this.gamingList=[]
        // if(this.search) {
        // }else {
        //    this.myPostedGamingArr = []
        //    this.gamingList=[]
        // }
        this.pageNo=1
        if(this.selected= "gamingvideo") {
          this.viewGamingVideos()
        }else if(this.selected="viewmygamingvideo") {
          this.viewMyGamingVideos()
        }
      });


      let date1= new Date()
      this.newDate=date1.getTime()
      console.log("Today's date==>>",this.newDate)

     }

    ngOnInit() {
      this.userid=localStorage.getItem('user_id')
      this.PayFormData()
        //  this.selectTab('gamingvideo')
        this.checkAddGamingVideo()
        this.callByUrl() 
        this.getBankList();
    }

    ngOnDestroy() {
      clearInterval(this.commentInterval)
      clearInterval(this.likeInterval)
    }

    PayFormData(){
      this.payForm = new FormGroup({
        bank : new FormControl('',[Validators.required]),
        expiry_date : new FormControl('',[Validators.required]),
        cvv: new FormControl('',[Validators.required, Validators.maxLength(3)])
    });
    }

    getId(id){
      console.log("bhdfhbvdhbhjb")
    this.commentId=id
    console.log("dfvd",this.commentId)
    this.addDeleteComment('false')
    }
  // gId(id){
  //     console.log("bhdfhbvdhbhjb")
  //   this.commentId=id
  //   console.log("dfvd",this.commentId)
    
  //   //this.editComment()
  //   }
  
    
     // on close modal
     closeModal() {
      clearInterval(this.commentInterval);
      clearInterval(this.likeInterval);
      this.commentsArr = [];
      this.likesArr= []
    }

   

  // to call by Url
  callByUrl()  {
    let arr = window.location.href.split('/')
    let val = arr[arr.length - 1]
    this.selectTab(val)
  }

   // to add
   addFilter(val) {
    if(this.filterBy == val) {
      this.filterBy = ''
    }else {
      this.filterBy = val
    }
    this.gamingList = []
    this.getGamingList();
  }
    //To get gaming list
    getGamingList(){

    }


    // to check tab
    selectTab(path) {
        console.log(path)
        window.scrollTo(0,0)
        this.scrollEventListen = false
        this.router.navigateByUrl('gaming-video/' + path)
        this.selected = path
        this.pageNo = 1
        this.total = 0
        this.commentsArr = [];
        this.likesArr= []
        // this.cloudinaryUrl = ''
        this.search = "";
        if(path == 'gamingvideo') {
            this.viewGamingVideos()
        } else if(path == 'addgamingvideo') {

            //this.discoverClassroomList=[];
            //this.discoverClassroom()
        } else if(path == 'viewmygamingvideo') {
            this.viewMyGamingVideos()
        }
    }

   // to toggle list
   showList(index) {      
    if(this.gamingList[index]['dynamicClass'] == "hide-clas none") {
      this.gamingList[index]['dynamicClass']="hide-clas"
    }else if(this.gamingList[index]['dynamicClass'] == "hide-clas") {
      this.gamingList[index]['dynamicClass']="hide-clas none"
    }
  }

  showList1(index) {      
    if(this.myPostedGamingArr[index]['dynamicClass'] == "hide-clas none") {
      this.myPostedGamingArr[index]['dynamicClass']="hide-clas"
    }else if(this.myPostedGamingArr[index]['dynamicClass'] == "hide-clas") {
      this.myPostedGamingArr[index]['dynamicClass']="hide-clas none"
    }
  }

  showHide(index) {
    if(this.commentsArr[index]['dynamicClass'] == "hide-clas none") {
      this.commentsArr[index]['dynamicClass']="hide-clas"
    }else if(this.commentsArr[index]['dynamicClass'] == "hide-clas") {
      this.commentsArr[index]['dynamicClass']="hide-clas none"
    }
  }


    /** to check validity */
    checkAddGamingVideo() {
        this.AddGamingVideoForm = new FormGroup({
            gamingVideoTitle: new FormControl('', [Validators.required]),
            gamingVideoDescription: new FormControl('', [Validators.required]),
         
          })
        }

    /** to get the value of add gaming video form field  */
      get gamingVideoTitle(): any {
        return this.AddGamingVideoForm.get('gamingVideoTitle');
      }
      get gamingVideoDescription(): any {
        return this.AddGamingVideoForm.get('gamingVideoDescription');
      }

      // To Show modal
      showModal(){
        console.log('huyfrggh')
        if(!this.base64Image) {
          this.server.showErrToast('Please upload  video')
          return;
        }else if (this.base64Image){
          $('#exampleModalCenter').modal({backdrop: 'static', keyboard: false}) 
        }
        
      }
       
      //To reset AddGamingVideoForm
      resetAddGamingVideoForm(){
          this.AddGamingVideoForm.reset()
      }

    // To add gaming videos
   async addGamingVideo(){
      console.log('PAy form',this.payForm.value)
        let data={
            "userId": localStorage.getItem('user_id'),
            "description": this.AddGamingVideoForm.value.gamingVideoDescription,
            "title":this.AddGamingVideoForm.value.gamingVideoTitle,
            // "gameVideo": this.cloudinaryUrl,
            "gameVideo": this.base64Image,
            "cvvNumber":this.payForm.value.cvv,
           "cardNumber": this.selectedCardDetails.cardNumber,
           "cardId":this.selectedCardDetails._id,
            // "title": this.createNonProfitGroupForm.value.nonProfitGroupTitle,
            // "description": this.createNonProfitGroupForm.value.nonProfitGroupDescription,
            // "image": this.profileImage,
            // "location": this.createNonProfitGroupForm.value.nonProfitGroupLocation,
        }
        if(navigator.onLine) {
          let addGame = await this.server.postApi('user/addGameVideo',data).subscribe((res)=> {
              // addGame.unsubscribe()
              if(res.responseCode == 200) {
                 this.server.showSuccToast('Gaming video uploaded successfully!!')
                   this.AddGamingVideoForm.reset()
                  this.base64Image = ''
                  $('#payModal').modal('hide');
                  this.selectTab('gamingvideo');
                // this.viewMyGamingVideos();
                
                
              }
          })
      }else {
          this.server.showWarnToast('Check internet connection!')
      }
       
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
      console.log("hff", this.chooseFriend);
      
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

  

    
 

openModal(event){

  this.gameid=event
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
  console.log("my list", this.friendsList)
  $('#sharePost').modal("show")
}

    // to share game post
    shareEvent(){
     
      // this.server.showSpinner()
      let data={
      "memberId": localStorage.getItem('user_id'),
      "gameId":this.gameid,
      "sharedTo":this.friendArr
    }
    console.log("my data464", data)
    this.server.postApi('user/shareGame', data).subscribe((res)=>{
      console.log("my event4544", res)
      if(res.responseCode==200){
        $('#sharePost').modal("hide")
        // this.server.hideSpinner();
        this.server.showSuccToast(res.responseMessage)

      }
    },(error)=>{
      this.server.showErrToast("check the internet connection")
    })
    }


    //Navigate to bank page
    makePayment(){
      if(this.bankList == ''){
        $('#exampleModalBank').modal({backdrop: 'static', keyboard: false}) 

      }
      else{
        $('#payModal').modal({backdrop: 'static', keyboard: false}) 
      }
        
    } 

    AddBank(){
      this.router.navigate(['bank/Add_Bank_Details'])
    }

    // to open payment modal
    openpayModal() {
      $('#payModal').modal({backdrop: 'static', keyboard: false})  
    }

    /** To upload cover picture of gaming video */
    handleFileInput(event) {
        var self = this;
        if(event.target.files && event.target.files[0]){
          this.type = event.target.files[0].type;
          console.log(this.type)
          if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv' || this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') { 
            var reader = new FileReader()
            reader.onload = (e)=> {
              this.base64Image = e.target['result'];
              let mb = 5242880;
              let size = ((event.target.files[0]['size'])/mb)
              if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv') {
                if(size <= 5) {
                  // this.uploadFile()
                }else {
                  this.server.showErrToast('Size must be less than 5 MB')
                  return;
                }
              }else if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
                if(size <= 10) {
                  // this.uploadFile()
                }else {
                  this.server.showErrToast('Size must be less than 10 MB')
                  return;
                }
              }
              }
            reader.readAsDataURL(event.target.files[0]);
          } else {
              this.server.showErrToast("Select only mp4 file.");
            }
        }
      }

      // to uplaod file
    // uploadFile() {
    //     this.cloudinaryUrl=''
    //     // to upload image and video
    //     let data={}, url ;
    //     if (this.type === 'image/png' || this.type === 'image/jpg') {
    //       this.base64Image = this.base64Image.substring(22);
    //     } else if (this.type === 'image/jpeg') {
    //       this.base64Image = this.base64Image.substring(23);
    //     }   
  
    //     if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
    //       data['profilePic'] =  'data:'+ this.type +'/;base64,'+this.base64Image;
    //       url ='user/imageUpload/'
    //     }else if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv') {
    //       data['video'] = 'data:'+ this.type +'/;base64,'+this.base64Image;
    //       url = 'user/videoUpload'
    //     }
  
    //     if(navigator.onLine) {
    //       // let api = this.server.postApi(url,data).subscribe((res)=>{
    //       //   this.videoData = res.result
    //       //   console.log(this.cloudinaryUrl)
    //       // })
    //     }
    //   }

       // to open likes modal
    openLikesModal(data) {
      if(data.likes.length>0) {
        this.gameId = data['_id']
        this.viewLikesComments(data,'likes')
        this.likeInterval = setInterval(()=>{
          this.viewLikesComments(data,'likes')
        },60000)
      }
    }

    // to open comments modal
    openCommentModal(data) {
      this.gameId = data['_id']
      this.viewLikesComments(data,'comments')
      this.commentInterval = setInterval(()=>{
        this.viewLikesComments(data,'comments')
      },60000)
    }

    // to view likes and comments
    viewLikesComments(data,show) {
      let req = {
        "userId":data['userId']['_id'],
        "gameId":data['_id'],
        "show":show
      }
      if(navigator.onLine && this.apiHit) {
        this.apiHit = false
        let api =this.server.postApi('user/viewGamesLikesAndComment', req).subscribe((res)=> {
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

            if(this.selected == 'gamingvideo') {
              let index = this.gamingList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.gamingList[index]['comments'] = res.comments
            }else if(this.selected == 'viewmygamingvideo') {
              let index = this.myPostedGamingArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedGamingArr[index]['comments'] = res.comments
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
            console.log(this.commentsArr)
          }else if(show == 'likes') {
            if(this.selected == 'gamingvideo') {
              let index = this.gamingList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.gamingList[index]['likes'] = res.likes
            }else if(this.selected == 'viewmygamingvideo') {
              let index = this.myPostedGamingArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedGamingArr[index]['likes'] = res.likes
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

      // to view gaming videos
      viewGamingVideos(){
          let data={
            "userId": localStorage.getItem('user_id'),
            "pageNumber": this.pageNo,
            "limit": this.limit,
            "search": this.search
          }

          if((this.search && this.pageNo == 1)){
            this.myPostedGamingArr = []
          }

          if(navigator.onLine) {
            this.server.postApi('user/viewGame', data).subscribe((res)=> {
              if(res.responseCode == 200) {
            let result = res.result.docs;
            this.time=res.result.docs
            this.time.forEach((element,index) => {
              //   this.timeArr.push(element.createdAt)
              //  console.log('bfdfbdfb====>>>>',this.timeArr)
               let oldDate= new Date(element.createdAt).getTime()
               console.log(oldDate)
               this.gamePostedDate= this.newDate - oldDate
               console.log("diff date===",this.gamePostedDate)
                                 
                  this.days = Math.floor(this.gamePostedDate / (1000 * 60 * 60 * 24));
                  this.hours = Math.floor((this.gamePostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  this.minutes = Math.floor((this.gamePostedDate % (1000 * 60 * 60)) / (1000 * 60));
                  var seconds = Math.floor((this.gamePostedDate % (1000 * 60)) / 1000);
 
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


            if(result.length > 0){
            result.forEach(element => {
             
              // For compare particular game posted userId
              
                   
             
             
              // to manage delete 
              element['dynamicClass'] = "hide-clas none";

              if(element.likes.length > 0) {
                element.likes.forEach(element2 => {
                  if(element2['likedId'] == localStorage.getItem('user_id')) {
                    element['myLike']= true
                  }else {
                    element['myLike']= false
                  }
                })
              }
              this.gamingList.push(element)
            });
            console.log('gameList',this.gamingList)
            this.scrollEventListen = false
          }else {
            // if there no data and scroll event is listened
            if(this.scrollEventListen) {
              this.pageNo = this.pageNo - 1
            }
          }
          
            console.log(this.gamingList)
            this.length = this.gamingList.length
              }
            })
        }
      }

      // to add comment to event
      addDeleteComment(comments) { 
      if(this.obj.comment || comments =='false') {
        let data = {
          "userId": localStorage.getItem('user_id'),
          "gameId": this.gameId,
          "comment": this.obj.comment,
          "commentId": this.commentId,
          "comments":comments,
        }
        if(navigator.onLine && this.apiHit) {
          this.apiHit = false
          let api = this.server.postApi('user/gameLikesAndComment',data).subscribe((res)=>{
            this.apiHit = true
            // api.unsubscribe()
            if(res.responseCode == 200) {
              this.obj.comment =''
              this.obj.i=''
              this.server.showSuccToast('Comment updated successfully');
              if(this.selected == 'gamingvideo') {
                if(comments =='true'){
                  console.log(res.comments.comments[res.comments.comments.length - 1])
                  this.gamingList[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments;
                }else{
                  this.gamingList[this.selectedIndex]['comments'] = res.result.comments
                  this.commentsArr = res.result.comments;
                }
               
              }else if(this.selected == 'viewmygamingvideo') {
                if(comments =='true'){
                  this.myPostedGamingArr[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments
                }else{
                  this.myPostedGamingArr[this.selectedIndex]['comments'] = res.result.comments
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

     // to like game video
     addLikeGame(data,val) {
      this.gameId = data['_id']
      let index = this.gamingList.findIndex(x=>x == data)
      this.selectedIndex = index
      console.log(index)
      if(navigator.onLine && this.apiHit) {
        this.apiHit = false
        let data = {
          "userId": localStorage.getItem('user_id'),
          "gameId": this.gameId,
          "like": val
        }
        this.server.postApi('user/gameLikesAndComment',data).subscribe((res)=>{
           this.apiHit = true
          if(res.responseCode == 200) {
            if(val == 'true') {
              this.server.showSuccToast('Liked!')
              if(this.selected == 'gamingvideo') {
                this.gamingList[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;

                this.gamingList[this.selectedIndex]['myLike'] = true
              }else if(this.selected == 'viewmygamingvideo') {
                this.myPostedGamingArr[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;
                this.gamingList[this.selectedIndex]['myLike'] = true
              }
            }else if(val == 'false'){
              this.server.showSuccToast('UnLiked!')
              if(this.selected == 'gamingvideo') {
                this.gamingList[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.gamingList[this.selectedIndex]['myLike'] = false
              }else if(this.selected == 'viewmygamingvideo') {
                this.myPostedGamingArr[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.gamingList[this.selectedIndex]['myLike'] = false
              }
              console.log(this.gamingList[this.selectedIndex])
            }
          }
        })
      }
    }



      // to view gaming videos
      viewMyGamingVideos(){
        let data={
          "userId": localStorage.getItem('user_id'),
          "pageNumber": this.pageNo,
          "limit": this.limit,
          "search": this.search,
        }

        if((this.search && this.pageNo == 1)){
          this.myPostedGamingArr = []
        }

        if(navigator.onLine) {
          this.server.postApi('user/myGameVideo', data).subscribe((res)=> {
            if(res.responseCode == 200) {
              let result = res.result.docs
              // 

              this.myGameTime=res.result.docs
                this.myGameTime.forEach((element,index) => {
                  //   this.timeArr.push(element.createdAt)
                  //  console.log('bfdfbdfb====>>>>',this.timeArr)
                   let oldDate= new Date(element.createdAt).getTime()
                   console.log(oldDate)
                   this.myGamePostedDate= this.newDate - oldDate
                   console.log("diff date===",this.myGamePostedDate)
                                     
                      this.days = Math.floor(this.myGamePostedDate / (1000 * 60 * 60 * 24));
                      this.hours = Math.floor((this.myGamePostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      this.minutes = Math.floor((this.myGamePostedDate % (1000 * 60 * 60)) / (1000 * 60));
                      var seconds = Math.floor((this.myGamePostedDate % (1000 * 60)) / 1000);
     
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

              if(result.length > 0){
            result.forEach(element => {
              element['dynamicClass'] = "hide-clas none"
              this.myPostedGamingArr.push(element)
            });
            // to deactivate scroll event
            this.scrollEventListen =  false
          }else {
            //to check if scroll event is called or not
            if(this.scrollEventListen) {
              this.pageNo = this.pageNo - 1;
            }
          }
            this.total= this.myPostedGamingArr.length
            }
          })
      }
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

  /** to check if number */
  toCheckIfNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(charCode == 32 || charCode == 101) {
        evt.preventDefault()
    }else {
        return true;
    }
    }

  // to get bank details
  getBankList() {
    if(navigator.onLine) {
      this.server.postApi('user/viewcard',{"userId": localStorage.getItem('user_id')}).subscribe((res)=>{
        if(res.responseCode == 200) {
          this.bankList = res.result
        }
      })
    }
  }

  // to get selected card data
  getCardData(bankName){
    let index = this.bankList.findIndex(x=>x.bankName == bankName) 
    this.selectedCardDetails = this.bankList[index]
    console.log(this.selectedCardDetails)
  }

   // to get event on scroll End(bottom of the page)
   @HostListener("window:scroll", [])
   onScroll(): void {
   if (((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) && !this.scrollEventListen) {
       console.log('bottom reached!',window.innerHeight + window.scrollY  + ' >= ' + (document.body.offsetHeight))
           // you're at the bottom of the page
           this.pageNo ++;
           console.log('length of game Arr', this.gamingList.length)
           this.callOnScroll()
         }  
   }

   // to call on scroll
   callOnScroll() {
     let arr = window.location.href.split('/')
     let path = arr[arr.length - 1]
     if(path!= 'addgamingvideo') {
       if(path == 'gamingvideo') {
         this.viewGamingVideos();
       } else if(path == 'viewmygamingvideo') {
          //  this.viewMyGamingVideos()
       }   
     }else {
       return;
     }
   }

   // edit delete gaming video
   actionOnEventList(val,game_id){
    let data={
      "userId":localStorage.getItem('user_id'),
      "gameId":game_id,
      "type":val,
    }
    if(navigator.onLine) {
      this.server.postApi('user/hideAndDeleteGame', data).subscribe((res)=> {
        if(res.responseCode == 200) {
         this.server.showSuccToast('Game Video Updated Successfully.')
        }
      })
  }
   }

    // viewers of videos
    viewers(event_id,userId){
      let data={
        "userId":localStorage.getItem('user_id'),
        "eventId":event_id,
       
      };
    
      if(navigator.onLine) {
        this.server.postApi('user/eventViewers', data).subscribe((res)=> {
          if(res.responseCode == 200) {
            this.viewCount=res.result
            console.log("view no:", this.viewCount )
            //this.postView()
           //this.server.showSuccToast('Post Deleted Successfully.')
          }
        });
     
        if(userId != localStorage.getItem('user_id')){
          let item ={
            "userId":localStorage.getItem('user_id'),
            "gameId" : event_id
          }
          console.log("this is the id of userId of game",userId);
          this.server.postApi('user/chargeForGameVideo',item).subscribe((res)=>{
            if(res.responseCode == 200){
              console.log("Success")
            }
          })
        }
       

    }
     }

    // to edit comment
     editComment(data,index) {
     // to open one dit at a time
     this.commentsArr.forEach(element => {
     element['showEdit'] = false
     });
     console.log(data.comment)
     this.obj.edit_comment = data.comment;
     this.commentsArr[index]['showEdit'] = true
     this.selectedIndex = index
    //  this.selectedData = data
     }
     // to call edit api
     callEditApi(evt,data) {
      //  to call API on enter key
       if(evt.which == 13 && evt.target.value) {
        let req = {
          "userId":localStorage.getItem('user_id'),
          "comment":this.obj.edit_comment,
          "commentId":data['_id'],
          "gameId": this.gameId
        }
        
        this.server.postApi('user/editGameComment', req).subscribe((res)=>{
          if(res.responseCode == 200){
            this.server.showSuccToast(res.responseMessage)
            this.commentsArr[this.selectedIndex]['comment'] = this.obj.edit_comment
            this.obj.edit_comment=''
            this.commentsArr[this.selectedIndex]['showTime']= 'sec ago'
            this.commentsArr[this.selectedIndex]['showEdit'] = false
          }
        })
       }
     }
     

    //  editComment(){
    //    let data={
    //     "userId":localStorage.getItem('user_id'),
    //     "eventId":this.gameId,
    //     "comment":this.obj.comment,
    //     "commented":this.commentId
    //    }
    //    if(navigator.onLine) {
    //     this.server.postApi('user/editLikesAndComment', data).subscribe((res)=> {
    //       if(res.responseCode == 200) {
    //         // this.viewCount=res.result
    //         // console.log("view no:", this.viewCount )
    //         //this.postView()
    //        //this.server.showSuccToast('Post Deleted Successfully.')
    //       }
    //     })
    // }
    //  }

    replyComment(item){
      let data={
        "userId":localStorage.getItem('user_id'),
        "commentId":item._id,
        "comment":item.comment,
        "postId":this.gameId,
        "userPic":item.userPic,
        "showTime":item.commentedTime,
        "username":item.userName
    }
    console.log("fjgj", data);
    
   $('#commentModal').modal('hide')
    this.router.navigate(['/game-reply'],{queryParams:{value:JSON.stringify(data)}})
    }
}
