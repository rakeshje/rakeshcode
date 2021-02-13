import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  obj: any = {caption: ""};
  emojiList = [ 
    {
    "x" : String.fromCodePoint(0x1F604),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F604',
    "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F600),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F600',
    "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F601),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F601',
    "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F602),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F602',
    "emotion": 'Extremely Happy'
    }, {
    "x" : String.fromCodePoint(0x1F603),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F603',
    "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F605),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F605',
    "emotion": 'Happy'
    },
    {
      "x" : String.fromCodePoint(0x1F606),
      "addClass": 'emojiAd userFelings',
      "value": '0x1F606',
      "emotion": 'Happy'
    },
    {
      "x" : String.fromCodePoint(0x1F607),
      "addClass": 'emojiAd userFelings',
      "value": '0x1F607',
      "emotion": 'Happy'
    },
    {
      "x" : String.fromCodePoint(0x1F608),
      "addClass": 'emojiAd userFelings',
      "value": '0x1F608',
      "emotion": 'Cruel'
    },
    {
      "x" : String.fromCodePoint(0x1F609),
      "addClass": 'emojiAd userFelings',
      "value": '0x1F609',
      "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F60A),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60A',
    "emotion": 'Happy'
    },
    {
    "x" : String.fromCodePoint(0x1F60B),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60B'
    },
    {
    "x" : String.fromCodePoint(0x1F60C),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60C'
    },
    {
    "x" : String.fromCodePoint(0x1F60D),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60D'
    },
    {
    "x" : String.fromCodePoint(0x1F60E),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60E'
    },
    {
    "x" : String.fromCodePoint(0x1F60F),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F60F'
    },
    {
    "x" : String.fromCodePoint(0x1F610),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F610'
    },
    {
    "x" : String.fromCodePoint(0x1F611),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F611'
    },
    {
    "x" : String.fromCodePoint(0x1F612),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F612'
    },
    {
    "x" : String.fromCodePoint(0x1F613),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F613'
    },
    {
    "x" : String.fromCodePoint(0x1F614),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F614'
    },
    {
    "x" : String.fromCodePoint(0x1F615),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F615'
    },
    {
    "x" : String.fromCodePoint(0x1F616),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F616'
    },
    {
    "x" : String.fromCodePoint(0x1F617),
    "addClass": 'emojiAd userFelings',
    "value": '0x1F617'
    },
    ]
  userData: any;
  form: FormGroup;
  getDetails: any;
  data: any = {};
  type1: any;
  fileData: any = [];
  ProfileData: any = [] ;
  suggestion: any;
  total: any;
  suggestionList: any = [];
  page: any = 1;
  search: any;
  limit: any = 5;
  userPhoto: any = [];
  postedData: any=[];
  total1: any;
  postedDataa:any=[];
  length: any;
  time: any=[];
  postDate: number;
  days: number;
  hours: number;
  minutes: number;
  newDate: number;
  postId: any;
  selectedIndex: any;
  apiHit: boolean=true;
  likesArr: any=[];
  commentInterval:any;
  commentsArr: any=[];
  commentTime: any=[];
  commentDate: number;
  likeInterval: any;
  commentId: any;
  eventid: any;
  friendsList: any=[];
  choosenFriend: any=[];


  constructor(private router : Router,private server : ServerService, public shared:SharedModule) { }

  ngOnInit() {
    this.form = new FormGroup({
      bioData :  new FormControl('',Validators.required)
    })
    this.getUserDetails();
    if(localStorage.getItem('token')) {
      this.getProfileDetails();
      this.getSuggestionList(this.page);
      this.getphotos(this.page);
      this.viewPost()
    }
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
  
// to route 

  editProfile(){
    this.router.navigate(['/add-profile'])
  }

  goTOPost(){
    this.router.navigate(['/post'])
  }

  goToActivity(){
    this.router.navigate(['/activity-profile'])
  }

  addShortBio(){
     $('#forBio').modal('show');
    // $('#forBio').modal({backdrop: 'static', keyboard: false}) 

  }

  addHistory(){
    $('#MoreProfile').modal('hide')
    this.router.navigate(['/view-advertisement'])
  }

  // addBio(){
  //   if(this.form.valid){

  //   }
  // }
  applyJobHistory(){
    $('#MoreProfile').modal('hide')
    this.router.navigate(['jobs/appliedJobHistory'])
  }
  postedJobHistory(){
    $('#MoreProfile').modal('hide')
    this.router.navigate(['jobs/viewPostedJob'])
  }
  videoGameHistory(){
    $('#MoreProfile').modal('hide')
    this.router.navigate(['gaming-video/viewmygamingvideo'])
  }

  // select Emoji

  // to toggle list
  showList(index) {      
    if(this.postedDataa[index]['dynamicClass'] == "hide-clas none") {
      this.postedDataa[index]['dynamicClass']="hide-clas"
    }else if(this.postedDataa[index]['dynamicClass'] == "hide-clas") {
      this.postedDataa[index]['dynamicClass']="hide-clas none"
    }
  }

  actionOnEventList(val,post_id,index){
    let data={
      "userId":localStorage.getItem('user_id'),
      "postId":post_id,
      "type":val,
    }
    if(navigator.onLine) {
      this.server.postApi('user/hideAndDeletePost', data).subscribe((res)=> {
        if(res.responseCode == 200) {
          //this.postView()
          this.viewPost()

         this.server.showSuccToast('Post Deleted Successfully.')
         
        }
      })
  }
  
   }



  selectEmoji(i,item){
    let index = this.server.myEmojiArr.findIndex(x=>x == item)
    console.log(index)
    if(index > -1 ) {
      console.log(true)
      this.server.myEmojiArr.splice(index,1)
    }else {
      this.server.myEmojiArr.push(item)
      $('#stickerModal').modal('hide');
      this.obj.caption = '--Feeling ' + this.server.myEmojiArr[0].emotion + this.server.myEmojiArr[0].x
    }
    console.log(this.server.myEmojiArr)
  }

  addEmoji(event) {
    this.obj.caption += event.emoji.native;
  }
  moreDetails(){
    $('#MoreProfile').modal('show')
  }

  handleFileInput(event) {
    this.fileData = [];
   
    // this.myEvent = event
    let files = event.target.files;
    // if(files.length>5){
    //   setTimeout(() => {
    //     this.server.showErrToast("Maximum 5 files allow only");  
    //   }, 1000);
    //   return;
    // }
    // console.log(files.length)
    if (files) {
      for (let file of files) {
        console.log("file data===>",file.size,file)
        if(file.size>100000000){
          setTimeout(() => {
            this.server.showErrToast("File size should not be greater than 10MB.");      
          }, 1000);
          return false;
        }
      
        else if(file.size<=100000000){
          if ((file.type == "image/jpeg" || file.type == "image/gif"||  file.type == "image/jpg" || file.type == "image/png" ) || (file.type=="video/mp4" || file.type=="video/mov" || file.type=="video/flv")) {
            this.type1 = file.type
            var reader = new FileReader();
            reader.onload = (e: any) => {
              let data = e.target
               this.ProfileData =data.result
               this.updateCoverAndProfile()
               console.log(this.ProfileData,"This is the fileData", files.length)
              //  if(this.fileData.length == files.length) {
              //   console.log('FILE GOTT', JSON.stringify(this.fileData))
              //   // this.sendPost( this.postmyData)
              //  }
  
            };
  
            reader.readAsDataURL(file);

          }

          
   else {
            this.server.showErrToast("Select only jpg,jpeg,png,mp4,mov or flv file.");
          }
  
        }
      }
      
    }
  }
  handleFileCoverInput(event){
    this.fileData = [];
   
    // this.myEvent = event
    let files = event.target.files;
    // if(files.length>5){
    //   setTimeout(() => {
    //     this.server.showErrToast("Maximum 5 files allow only");  
    //   }, 1000);
    //   return;
    // }
    console.log(files.length)
    if (files) {
      for (let file of files) {
        console.log("file data===>",file.size,file)
        if(file.size>100000000){
          setTimeout(() => {
            this.server.showErrToast("File size should not be greater than 10MB.");      
          }, 1000);
          return false;
        }
      
        else if(file.size<=100000000){
          if ((file.type == "image/jpeg" ||  file.type == "image/jpg" || file.type == "image/png" )) {
            this.type1 = file.type
            var reader = new FileReader();
            reader.onload = (e: any) => {
              let data = e.target
               this.fileData = data.result
                this.updateCoverAndProfile()
               console.log(this.fileData,"This is the fileData", files.length)
               if(this.fileData.length == files.length) {
                console.log('FILE GOTT', JSON.stringify(this.fileData))
                // this.sendPost( this.postmyData)
               }
  
            };
  
            reader.readAsDataURL(file);

          }

          
   else {
            this.server.showErrToast("Select only jpg,jpeg,png,mp4,mov or flv file.");
          }
  
        }
      }
      
    }
  }
  

  updateCoverAndProfile(){
  if(this.fileData != ''){
    var data = {
      "userId": localStorage.getItem('user_id'),
      coverPhoto : this.fileData
    }
  }
  else if(this.ProfileData != ''){
    var data1 = {
      "userId": localStorage.getItem('user_id'),
      image : this.ProfileData
    }
  }
  else{
    if(this.form.valid){
      var item = {
        "userId": localStorage.getItem('user_id'),
        "bioData" : this.form.value.bioData
      }
    }
    
  }
   

    
    this.server.showSpinner()
    console.log("my profile data", data)
    this.server.postApi('user/addUserDetails', data || data1 || item).subscribe((res)=>{
      console.log("my profile", res);
      this.server.hideSpinner();
      if(res.responseCode==200){
        $('#forBio').modal('hide')
        this.server.showSuccToast(res.responseMessage)
         this.fileData=res.data.profileData.coverPhoto;
         this.ProfileData = res.data.profileData.image;
         this.userData = res.data.profileData
         console.log('this fileData',this.fileData,'userData', this.userData)
      }
      else{
        this.server.showErrToast('Check internet connection!')
      }
    },(err)=>{
      this.server.showErrToast('Check internet connection!')

    })

  }

  

  viewPost(){
    let data = {
      "userId": localStorage.getItem('user_id'),
    }
    this.server.postApi('user/myPost',data).subscribe((res)=>{
      if(res.responseCode == 200){
        this.postedDataa=[]
        this.postedData = res.result.docs;
        res.result.docs.forEach(element => {
          console.log(element)
          if(element.userId._id == localStorage.getItem('user_id')){
            this.postedDataa.push(element)
          }
         
        });
       
        console.log('posted_Data',this.postedDataa)


        this.time=res.result.docs



        this.time.forEach((element,index) => {
          //   this.timeArr.push(element.createdAt)
          //  console.log('bfdfbdfb====>>>>',this.timeArr)
           let oldDate= new Date(element.createdAt).getTime()
           console.log(oldDate)
           this.postDate= this.newDate - oldDate
           console.log("diff date===",this.postDate)
                             
              this.days = Math.floor(this.postDate / (1000 * 60 * 60 * 24));
              this.hours = Math.floor((this.postDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              this.minutes = Math.floor((this.postDate % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((this.postDate % (1000 * 60)) / 1000);

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
          
            // this.time.forEach((element,index) => {
            
            //  let oldDate= new Date(element.createdAt).getTime()
            //  console.log(oldDate)
            //  this.postDate= this.newDate - oldDate
            //  console.log("diff date===",this.postDate)
                                 
            //     this.postDate = this.postDate/1000;
            //     var seconds = Math.floor(this.postDate % 60);
            //     this.postDate = this.postDate/60; 
            //     this. minutes = Math.floor(this.postDate % 60);
            //     this.postDate = this.postDate/60; 
            //     this. hours = Math.floor(this.postDate % 24);  
            //     this. days = Math.floor(this.postDate/24);

            //     element['seconds'] = seconds 
            //     element['minutes'] = this.minutes 
            //     element['hours'] = this.hours
            //     element['days'] = this.days  
            //     console.log("time is", this.days || this.hours || this.minutes || seconds)
                
            //     return this.days + ' days, ' + this.hours + ' hours, ' + this. minutes + ' minutes, and ' + seconds + ' seconds';
                
            // });
             // this.time.forEach((element,index) => {
            
           

                  
                
          
           let result =res.result.docs
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
              this.postedDataa.push(element)
            });
            // this.scrollPostListen = false
          }else {
            // if there no data and scroll event is listened
            // if(this.scrollPostListen) {
            //   this.pageNo = this.pageNo - 1
            // }
          }
         
        
          console.log(this.postedDataa)
          this.length = this.postedDataa.length
        }
      
    })
  }

  // to like Post
  addLikePost(data,val) {
    this.postId = data['_id']
    let index = this.postedDataa.findIndex(x=>x == data)
    this.selectedIndex = index
    console.log(index)
    if(navigator.onLine && this.apiHit) {
      this.apiHit = false
      let data = {
        "userId": localStorage.getItem('user_id'),
        "postId": this.postId,
        "like": val
      }
      this.server.postApi('user/postLikeAndComment',data).subscribe((res)=>{
        this.apiHit = true
        if(res.responseCode == 200) {
          if(val == 'true') {
            this.server.showSuccToast('Liked!')
            // if(this.selected == 'gamingvideo') {
            //   this.gamingList[this.selectedIndex]['likes'] = res.likes
            //   this.likesArr = res.likes;

            //   this.gamingList[this.selectedIndex]['myLike'] = true
            // }else if(this.selected == 'viewmygamingvideo') {
            //   this.myPostedGamingArr[this.selectedIndex]['likes'] = res.likes
            //   this.likesArr = res.likes;
            //   this.gamingList[this.selectedIndex]['myLike'] = true
            // }
            this.postedDataa[this.selectedIndex]['likes'] = res.likes
               this.likesArr = res.likes;
               this.postedDataa[this.selectedIndex]['myLike'] = true
          }else if(val == 'false'){
            this.server.showSuccToast('UnLiked!')
            // if(this.selected == 'gamingvideo') {
            //   this.gamingList[this.selectedIndex]['likes'] = res.result.likes
            //   this.likesArr = res.result.likes;
            //   this.gamingList[this.selectedIndex]['myLike'] = false
            // }else if(this.selected == 'viewmygamingvideo') {
            //   this.myPostedGamingArr[this.selectedIndex]['likes'] = res.result.likes
            //   this.likesArr = res.result.likes;
            //   this.gamingList[this.selectedIndex]['myLike'] = false
            // }
            this.postedDataa[this.selectedIndex]['likes'] = res.result.likes
               this.likesArr = res.result.likes;
               this.postedDataa[this.selectedIndex]['myLike'] = false
            console.log(this.postedDataa[this.selectedIndex])
          }
        }
      })
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

  // to open comments modal
  openCommentModal(data) {
    this.postId = data['_id']
    this.viewLikesComments(data,'comments')
    this.commentInterval = setInterval(()=>{
      this.viewLikesComments(data,'comments')
    },60000)
  }

  // to open likes modal
  openLikesModal(data) {
    if(data.likes.length>0) {
      this.postId = data['_id']
      this.viewLikesComments(data,'likes')
      this.likeInterval = setInterval(()=>{
        this.viewLikesComments(data,'likes')
      },60000)
    }
  }
   // on close modal
   closeModal() {
    console.log('gyuuy')
    clearInterval(this.commentInterval);
    clearInterval(this.likeInterval);
    this.commentsArr = [];
    this.likesArr= []
  }
  
  viewLikesComments(data,show) {
    let req = {
      "userId":data['userId']['_id'],
      "postId":data['_id'],
      "show":show
    }
    if(navigator.onLine && this.apiHit) {
      this.apiHit = false
      let api =this.server.postApi('user/viewPostLikesAndComment', req).subscribe((res)=> {
        this.apiHit = true
        api.unsubscribe();  
        console.log(res.comments)
        if(show == 'comments') {
        //   if(this.selected == 'All_Events') {
        //     let index = this.eventList.findIndex((x)=>x==data)
        //     this.selectedIndex = index
        //     this.eventList[index]['comments'] = res.comments
        //   }else if(this.selected == 'View_My_Posted_Events') {
        //     let index = this.myPostedEventsArr.findIndex((x)=>x==data)
        //     this.selectedIndex= index;
        //     this.myPostedEventsArr[index]['comments'] = res.comments
        //   }

        this.commentTime=res.comments
        //console.log('bfdfbdfb====>>>>',this.time)
         this.commentTime.forEach((element,index) => {
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





        let index = this.postedDataa.findIndex((x)=>x==data)
            this.selectedIndex = index
             this.postedDataa[index]['comments'] = res.comments
          // to open modal
          $('#exampleModalCenter').modal({backdrop: 'static', keyboard: false}) 
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
          $('#exampleModalCenter').modal('hide')
          this.commentsArr = res.comments
        }else if(show == 'likes') {
        //   if(this.selected == 'All_Events') {
        //     let index = this.eventList.findIndex((x)=>x==data)
        //     this.selectedIndex = index
        //     this.eventList[index]['likes'] = res.likes
        //   }else if(this.selected == 'View_My_Posted_Events') {
        //     let index = this.myPostedEventsArr.findIndex((x)=>x==data)
        //     this.selectedIndex= index;
        //     this.myPostedEventsArr[index]['likes'] = res.likes
        //   }
        let index = this.postedDataa.findIndex((x)=>x==data)
            this.selectedIndex = index
            this.postedDataa[index]['likes'] = res.likes
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

  // to add comment / delete comment  to event
  addDeleteComment(comments) { 
    console.log(comments)
      if(this.obj.comment || comments =='false') {
        let data = {
          "userId": localStorage.getItem('user_id'),
          "postId": this.postId,
          "comment": this.obj.comment,
          "commentId": this.commentId,
          "comments":comments,
        }
        if(navigator.onLine && this.apiHit) {
          this.apiHit = false
          let api = this.server.postApi('user/postLikeAndComment',data).subscribe((res)=>{
            this.apiHit = true
            api.unsubscribe()
            if(res.responseCode == 200) {
              this.obj.comment =''
              this.obj.i=''
              this.server.showSuccToast('Comment updated successfully');
              $('#exampleModalCenter').modal('hide')
              if(comments =='true'){
                this.postedDataa[this.selectedIndex]['comments'] = res.comments.comments
                this.commentsArr = res.comments.comments;
                
              }
              else{
                this.postedDataa[this.selectedIndex]['comments'] = res.result.comments
                this.commentsArr = res.result.comments;
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

    // =========for share=============

    // to select friend
    openModal(event){
      
      this.eventid=event,
      this.friendsList = this.shared.allFriends;
      console.log("fjvkfdgdf45545", this.friendsList)
      $('#sharePost').modal("show")
    }

    // select friend
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
// api of share post
sharePostEvent(){
      let data={
        "memberId":localStorage.getItem('user_id'),
        "postId":this.eventid,
        "sharedTo":this.choosenFriend,
      }
      console.log("my data464", data)
    this.server.postApi('user/sharePost', data).subscribe((res)=>{
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


  // to get suggestion list
  getSuggestionList(page) {
    let url;
    this.page  = page;
    let data = {
        "pageNumber": this.page,
        "limit": this.limit,
        // "search": this.search,
    }
    if(this.search) {
        url = 'user/searchFriendSuggestion'
    }else {
        url = 'user/friendSuggestion'
    }
    if(navigator.onLine) {
        this.suggestion = this.server.postApi(url,data).subscribe((res)=> {
            this.suggestion.unsubscribe();
            if(res.responseCode == 200) {
                this.suggestionList = res.result.success2.docs
                this.total1 = res.result.success2.total
                this.suggestionList.forEach((element,index) => {
                    if(!element.profilePic) {
                    element.profilePic = 'assets/images/userImg.png'
                    }
                    console.log('list',this.suggestionList,this.total)
                    // this.checkMutualFriend(element['_id'], index)
                });
            }
        })
    }else {
        this.server.showWarnToast('Check internet connection!')
    }
}

getphotos(page){
  this.page  = page;
  let data = {
    "userId": localStorage.getItem('user_id'),
    "pageNumber": this.page
  };
  this.server.postApi('user/myPost',data).subscribe((res)=>{
    if(res.responseCode == 200){
      this.userPhoto = res.result.docs;
      this.total = res.result.total
      console.log('photo',this.userPhoto)
    }
  })
}



  getUserDetails(){
    let data = {
      userId : localStorage.getItem('user_id')
    }
    this.server.postApi('user/getUserDetails',data).subscribe(res=>{
      if(res['responseCode'] == 200){
        this.userData = res['data']['address'][0];
        console.log('user',this.userData)
      }
    })
  }

    // to get profile details
    getProfileDetails() {
      if(navigator.onLine) {
          if(localStorage.getItem('token')) {
              this.getDetails = this.server.getApi('user/myProfile').subscribe((res)=> {
                  this.getDetails.unsubscribe()
                  let result = res.result
                  this.data = {
                      "first_name": result.firstName,
                  }
                  this.server.first_name = result.firstName;
                  localStorage.setItem("profilePic", result.profilePic);                    
                  if(result.profilePic) {
                      this.data.profileImage =  result.profilePic
                      this.server.profileImage = result.profilePic
                  }else {
                      this.data.profileImage = "assets/images/Layer 61.png"
                      this.server.profileImage =  "assets/images/Layer 61.png"
                  }
              })
          }
      }
  }
}
