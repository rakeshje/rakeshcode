import { Component, OnInit,HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';
import { SharedModule } from '../shared/shared.module';

declare var $:any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    postArr: any=[];
    postId: any;
    apiHit:boolean= true;
    selectedIndex: any;
    obj:any={}
    commentsArr: any=[];
    likesArr: any=[];
    commentInterval: any;
    likeInterval: any;
    pageNo: any= 1;
    scrollPostListen: boolean=false;
    length: any;
    time:any=[];
  timeArr: any=[];
  postDate: any;
  newDate: any;
  days: number;
  hours: number;
  minutes: number;
  commentId:any;
  commentTime: any=[];
  commentDate: number;
  viewCount: any;
  eventid: any;
  allFriends: any;
  friendid: any=[];
  myArray: any=[];
  total: any;
  choosenFriend: any=[];
  friendsList: any=[];
  friendArr: any=[];
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  userid:any;
  replycomment:any=''
  commentkey: any;
 // newDate:any

    constructor(public header:HeaderComponent,public server:ServerService, private router:Router,public shared: SharedModule) { 
        this.header.checkToken();
        this.header.getProfileDetails();

        window.scrollTo(0,0)

        let date1= new Date()
        this.newDate=date1.getTime()
        console.log("Today's date==>>",this.newDate)
    }

    ngOnInit() {
      this.userid=localStorage.getItem('user_id')
        this.postView();
        //this.getId()
        
       
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

    gId(id){
      console.log("bhdfhbvdhbhjb")
    this.commentId=id
    console.log("dfvd",this.commentId)
    
    }

    postView(){
        let data={
            "userId":localStorage.getItem('user_id')
        }
        if(navigator.onLine) {
            let postData = this.server.postApi('user/viewPost',data).subscribe((res)=> {
                postData.unsubscribe()
                if(res.responseCode == 200) {
                   //this.server.showSuccToast('Gaming video uploaded successfully!!')
                   this.postArr=res.result.docs
                   console.log("nkvgfkg2424", this.postArr)
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
                      this.postArr.push(element)
                    });
                    this.scrollPostListen = false
                  }else {
                    // if there no data and scroll event is listened
                    if(this.scrollPostListen) {
                      this.pageNo = this.pageNo - 1
                    }
                  }
                 
                
                  console.log(this.postArr)
                  this.length = this.postArr.length
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
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

     // to open comments modal
     openCommentModal(data) {
        this.postId = data['_id']
        this.viewLikesComments(data,'comments')
        // this.commentInterval = setInterval(()=>{
        //   this.viewLikesComments(data,'comments')
        // },60000)
      }
  
      // to open likes modal
      openLikesModal(data) {
        if(data.likes.length>0) {
          this.postId = data['_id']
          this.viewLikesComments(data,'likes')
          // this.likeInterval = setInterval(()=>{
          //   this.viewLikesComments(data,'likes')
          // },60000)
        }
      }
  
    // to like Post
    addLikePost(data,val) {
        this.postId = data['_id']
        let index = this.postArr.findIndex(x=>x == data)
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
                this.postArr[this.selectedIndex]['likes'] = res.likes
                   this.likesArr = res.likes;
                   this.postArr[this.selectedIndex]['myLike'] = true
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
                this.postArr[this.selectedIndex]['likes'] = res.result.likes
                   this.likesArr = res.result.likes;
                   this.postArr[this.selectedIndex]['myLike'] = false
                console.log(this.postArr[this.selectedIndex])
              }
            }
          })
        }
      }

       // to add comment / delete comment  to event.
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
                  this.postArr[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments;
                  
                }
                else{
                  this.postArr[this.selectedIndex]['comments'] = res.result.comments
                  this.commentsArr = res.result.comments;
                }

                this.commentsArr.forEach((element,index) => {
                  
                   let oldDate= new Date(element.commentedTime).getTime()
                   console.log(oldDate)
                   this.commentDate= this.newDate - oldDate
                   console.log("diff date===",this.commentDate)
                                       
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

     // to view likes and comments
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





            let index = this.postArr.findIndex((x)=>x==data)
                this.selectedIndex = index
                 this.postArr[index]['comments'] = res.comments
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
              console.log("comment", this.commentsArr);
              
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
            let index = this.postArr.findIndex((x)=>x==data)
                this.selectedIndex = index
                this.postArr[index]['likes'] = res.likes
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

      
  
// to select friend
    openModal(event){
      
      this.eventid=event,
      this.friendsList = this.shared.allFriends;
      this.dropdownList=this.friendsList
      this.dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'firstName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
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
        "sharedTo":this.friendArr,
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

     // to get event on scroll End(bottom of the page)
     @HostListener("window:scroll", [])
     onScroll(): void {
     if (((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) && !this.scrollPostListen) {
       console.log('called')
         console.log('bottom reached!',window.innerHeight + window.scrollY  + ' >= ' + (document.body.offsetHeight))
             // you're at the bottom of the page
             this.scrollPostListen = true
             console.log('length of post Arr', this.postArr.length)
             this.callOnScroll()
           }  
     }
 
     // to call on scroll
     callOnScroll() {
       this.pageNo ++;
       let arr = window.location.href.split('/')
       let path = arr[arr.length - 1]
    //    if(path!= 'Add_Events') {
    //      if(path == 'All_Events') {
    //        this.getEventsList();
    //      } else if(path == 'View_My_Posted_Events') {
    //          this.getMyPostedEvents()
    //      }   
    //    }else {
    //      return;
    //    }
     }

     // to send comment
     sendComment(evt,data) {
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      this.postId = data['_id']
      if(charCode == 13) {
        this.obj.comment = evt.target.value
        this.addDeleteComment('true')
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

   // to toggle list
   showList(index) {      
    if(this.postArr[index]['dynamicClass'] == "hide-clas none") {
      this.postArr[index]['dynamicClass']="hide-clas"
    }else if(this.postArr[index]['dynamicClass'] == "hide-clas") {
      this.postArr[index]['dynamicClass']="hide-clas none"
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
          this.postView()
         
         this.server.showSuccToast('Post Deleted Successfully.')

        }
      })
  }
  
   }

   viewers(post_id){
    let data={
      "userId":localStorage.getItem('user_id'),
      "postId":post_id,
     
    }
    if(navigator.onLine) {
      this.server.postApi('user/postViewers', data).subscribe((res)=> {
        console.log("myyhhbg454view", res)
        if(res.responseCode == 200) {
          this.postArr=res.result.docs.viewers
          console.log("myygygu", this.postArr)
          // this.viewCount=res.result
          // console.log("view no:", this.viewCount )
          //this.postView()
         //this.server.showSuccToast('Post Deleted Successfully.')
        }
      })
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
         let req = {
           "userId":localStorage.getItem('user_id'),
           "comment":this.obj.edit_comment,
           "commentId":data['_id'],
           "postId": this.postId
         }
         
         this.server.postApi('user/editPostLikesAndComment', req).subscribe((res)=>{
           console.log("jfjg", res)
           if(res.responseCode == 200){
             this.server.showSuccToast(res.responseMessage)
             this.commentsArr[this.selectedIndex]['comment'] = this.obj.edit_comment
             this.obj.edit_comment=''
             this.commentsArr[this.selectedIndex]['showTime']= 'sec ago'
             this.commentsArr[this.selectedIndex]['showEdit'] = false
           }
         })
      }

      // replycomment Api
      replyComment(item){
        // this.commentkey=item._id
        let data={
            "userId":localStorage.getItem('user_id'),
            "commentId":item._id,
            "comment":item.comment,
            "postId":this.postId,
            "userPic":item.userPic,
            "showTime":item.commentedTime,
            "username":item.userName
        }
        console.log("fjgj", data);
        
       $('#exampleModalCenter').modal('hide')
        this.router.navigate(['/reply-comment'],{queryParams:{value:JSON.stringify(data)}})
        // this.server.postApi('user/replyCommentInPost', data).subscribe((res)=>{
        //   console.log("res",res )
        //   if(res.responseCode==200){
        //     this.server.showSuccToast(res.responseMessage)
        //   }
        // },(error)=>{
        //   this.server.showErrToast("something went wrong")
        // })
    }
      
  
      playPause(post_id) { 
        var x = document.getElementById("myVideo");
         x['controls'] = true;
         x['play()'];
       
       
        let data={
          "userId":localStorage.getItem('user_id'),
          "postId":post_id,
         
        }
        if(navigator.onLine) {
          this.server.postApi('user/postViewers', data).subscribe((res)=> {
            if(res.responseCode == 200) {
              //this.postArr=res.result.docs.viewers
              // this.viewCount=res.result
              // console.log("view no:", this.viewCount )
              //this.postView()
             //this.server.showSuccToast('Post Deleted Successfully.')
            }
          })
      }
      } 

    
}
