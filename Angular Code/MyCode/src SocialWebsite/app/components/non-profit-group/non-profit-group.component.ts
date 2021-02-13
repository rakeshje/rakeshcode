import { Component, OnInit,HostListener} from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { SharedModule } from '../shared/shared.module';
declare var $:any

@Component({
  selector: 'app-non-profit-group',
  templateUrl: './non-profit-group.component.html',
  styleUrls: ['./non-profit-group.component.scss']
})
export class NonProfitGroupComponent implements OnInit {
  selected: string="nonProfitGroup";
  total: any;
  page: number=1;
  createNonProfitGroupForm: FormGroup;
  commentsArr: any=[];
  likesArr: any=[];
  type: any;
  base64Image: any="assets/images/Layer 139.png";
  cloudinaryUrl: any=""
  search: any="";
  searchTerm$ = new Subject<string>();
  limit: any=10;
  likeInterval: any;
  commentInterval: any;
  pageNo: any= 1;
  selectedIndex: any;
  apiHit:boolean= true;
  myPostedNonProfitGroupArr: any=[];
  obj:any={}


  profileImage: any;
  upload: any;
  createNonProfit: any;
  viewNonProfit: any;
  nonProfitGroupList: any=[];
  nonProfitGroupId: any;
  scrollEventListen: boolean=false;
  length: any;
  newDate: any;
  time:any=[]; 
  myNonProfitTime:any=[]; 
  nonprofitPostedDate: any;
  days: number;
  hours: number;
  minutes: number;
  commentTime: any=[];
  commentDate: number;
  myNonProfitPostedDate: any;
  viewCount: any;
  commentId: any;
  eventid: any;
  friendsList: any=[];
  choosenFriend: any=[];
  dropdownList: any=[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  friendArr: any=[];
  userid:any;

  constructor(public server:ServerService, private router:Router,public shared:SharedModule) { 
    window.scrollTo(0,0)
      // to add search filter
      this.server.search(this.searchTerm$)
      .subscribe(results => {
        this.search = results;
        this.myPostedNonProfitGroupArr = []
        this.nonProfitGroupList=[]
        this.pageNo=1
        //this.search = results;
        if(this.selected='nonProfitGroup') {
          this.viewNonProfitGroup()
        } 
        else if(this.selected='viewNonProfitGroup'){
          this.viewMyPostedNonProfitGroup()
        }
       
       
       
      });
      let date1= new Date()
      this.newDate=date1.getTime()
      console.log("Today's date==>>",this.newDate)
  }

        ngOnInit() {
          this.userid=localStorage.getItem('user_id')
          this.viewNonProfitGroup()
          this.checkCreateNonProfitGroupForm()
          this.selectTab('nonProfitGroup')
          this.callByUrl()
         // console.log(this.myPostedNonProfitGroupArr)
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


        // to check tab
        selectTab(path) {
          window.scrollTo(0,0)
          this.scrollEventListen = false
          this.router.navigateByUrl('non-profit-group/' + path)
          this.selected = path
          this.pageNo = 1
          this.total = 0
          this.commentsArr = [];
          this.likesArr= []
          //this.cloudinaryUrl = ''
          this.search = "";
          if(path == 'nonProfitGroup') {
              //this.jobList=[];
              this.viewNonProfitGroup()
          } else if(path == 'createNonProfitGroup') {
           
          } 
          else if(path == 'viewNonProfitGroup') {
              this.viewMyPostedNonProfitGroup()
          } 
      }

       // to toggle list
   showList(index) {      
    if(this.nonProfitGroupList[index]['dynamicClass'] == "hide-clas none") {
      this.nonProfitGroupList[index]['dynamicClass']="hide-clas"
    }else if(this.nonProfitGroupList[index]['dynamicClass'] == "hide-clas") {
      this.nonProfitGroupList[index]['dynamicClass']="hide-clas none"
    }
  }

  showList1(index) {      
    if(this.myPostedNonProfitGroupArr[index]['dynamicClass'] == "hide-clas none") {
      this.myPostedNonProfitGroupArr[index]['dynamicClass']="hide-clas"
    }else if(this.myPostedNonProfitGroupArr[index]['dynamicClass'] == "hide-clas") {
      this.myPostedNonProfitGroupArr[index]['dynamicClass']="hide-clas none"
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
      checkCreateNonProfitGroupForm() {
        this.createNonProfitGroupForm = new FormGroup({
          nonProfitGroupTitle: new FormControl('', [Validators.required]),
          nonProfitGroupDescription: new FormControl('', [Validators.required]),
          nonProfitGroupLocation: new FormControl('', [Validators.required]),
          
          })
          }
      /** to get the value of Apply job form field  */
      get nonProfitGroupTitle(): any {
        return this.createNonProfitGroupForm.get('nonProfitGroupTitle');
      }
      get nonProfitGroupDescription(): any {
        return this.createNonProfitGroupForm.get('nonProfitGroupDescription');
      }
      get nonProfitGroupLocation(): any {
        return this.createNonProfitGroupForm.get('nonProfitGroupLocation');
      }


       // To Show modal
       showModal(){
        $('#myModal').modal({backdrop: 'static', keyboard: false}) 
        }

        //To reset Non Profit Group Form
        nonProfitGroupReset(){
          this.createNonProfitGroupForm.reset();
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
            this.server.showErrToast("Select only mp4 file.");
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

        // to open likes modal
    openLikesModal(data) {
      if(data.likes.length>0) {
        this.nonProfitGroupId = data['_id']
        this.viewLikesComments(data,'likes')
        // this.likeInterval = setInterval(()=>{
        //   this.viewLikesComments(data,'likes')
        // },60000)
      }
    }

    // to open comments modal
    openCommentModal(data) {
      this.nonProfitGroupId = data['_id']
      this.viewLikesComments(data,'comments')
      // this.commentInterval = setInterval(()=>{
      //   this.viewLikesComments(data,'comments')
      // },60000)
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
        let api =this.server.postApi('user/viewNonProfitLikesAndComment', req).subscribe((res)=> {
          this.apiHit = true
          api.unsubscribe();  
          console.log(res.comments)
          if(show == 'comments') {

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
            if(this.selected == 'nonProfitGroup') {
              let index = this.nonProfitGroupList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.nonProfitGroupList[index]['comments'] = res.comments
            }else if(this.selected == 'viewNonProfitGroup') {
              let index = this.myPostedNonProfitGroupArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedNonProfitGroupArr[index]['comments'] = res.comments
            }
            // to open modal
            $('#commentModal').modal({backdrop: 'static', keyboard: false}) 
            res.comments.forEach((element)=>{
              element['dynamicClass'] = "hide-clas none"
             // element['dynamicClass'] = "hide-clas none"
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
          }else if(show == 'likes') {
            if(this.selected == 'nonProfitGroup') {
              let index = this.nonProfitGroupList.findIndex((x)=>x==data)
              this.selectedIndex = index
              this.nonProfitGroupList[index]['likes'] = res.likes
            }else if(this.selected == 'viewNonProfitGroup') {
              let index = this.myPostedNonProfitGroupArr.findIndex((x)=>x==data)
              this.selectedIndex= index;
              this.myPostedNonProfitGroupArr[index]['likes'] = res.likes
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


          // To create non profit group
          createNonProfitGroup(){
            {
              this.selected = 'createNonProfitGroup'
              
              let data ={
                  "userId": localStorage.getItem('user_id'),
                  "title": this.createNonProfitGroupForm.value.nonProfitGroupTitle,
                  "description": this.createNonProfitGroupForm.value.nonProfitGroupDescription,
                  //"image": this.cloudinaryUrl,
                  "location": this.createNonProfitGroupForm.value.nonProfitGroupLocation,
                 
              }     
              if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
                data['image'] =  this.cloudinaryUrl
              }else {
                console.log(this.base64Image)
                data['videoBase'] = this.cloudinaryUrl
              }
              if(navigator.onLine) {
                  this.createNonProfit = this.server.postApi('user/nonProfit', data).subscribe((res)=> {
                      this.createNonProfit.unsubscribe()
                      if(res.responseCode == 200) {
                      this.server.showSuccToast('Non-Profit Group Successfully Added')    
                      this.createNonProfitGroupForm.reset()
                      this.cloudinaryUrl = ''
                      this.selectTab('nonProfitGroup')
                      }
                  })    
                } else {
                    this.server.showWarnToast('Check internet connection!')
                }
              
            }
          }

          

          // To view non profit group
          viewNonProfitGroup(){
            
              this.selected = 'nonProfitGroup'
              let data ={
                  "userId": localStorage.getItem('user_id'),
                  "search": this.search,
                  "pageNumber": this.pageNo,
                  "limit": this.limit,
              }     
              console.log("my view", data)
              if(navigator.onLine) {
                  this.viewNonProfit = this.server.postApi('user/viewNonProfit', data).subscribe((res)=> {
                      this.viewNonProfit.unsubscribe()
                      if(res.responseCode == 200) {
                         this.nonProfitGroupList=res.result.docs;
                         console.log("my 4444", this.nonProfitGroupList)
                         let result = res.result.docs;
                         this.time=res.result.docs
                         this.time.forEach((element,index) => {
                           //   this.timeArr.push(element.createdAt)
                           //  console.log('bfdfbdfb====>>>>',this.timeArr)
                            let oldDate= new Date(element.createdAt).getTime()
                            console.log(oldDate)
                            this.nonprofitPostedDate= this.newDate - oldDate
                            console.log("diff date===",this.nonprofitPostedDate)
                                              
                               this.days = Math.floor(this.nonprofitPostedDate / (1000 * 60 * 60 * 24));
                               this.hours = Math.floor((this.nonprofitPostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                               this.minutes = Math.floor((this.nonprofitPostedDate % (1000 * 60 * 60)) / (1000 * 60));
                               var seconds = Math.floor((this.nonprofitPostedDate % (1000 * 60)) / 1000);
              
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
                            this.nonProfitGroupList.push(element)
                          });
                          this.scrollEventListen = false
                         }else {
                          // if there no data and scroll event is listened
                          if(this.scrollEventListen) {
                            this.pageNo = this.pageNo - 1
                          }
                        }
                        console.log(this.nonProfitGroupList)
                        this.length = this.nonProfitGroupList.length
                      
                      }
                  })    
                } 
              
            }
          

          //To view my posted non profit group
          viewMyPostedNonProfitGroup(){
            let data={
              "userId": localStorage.getItem('user_id'),
              "pageNumber": this.pageNo,
              "limit": this.limit,
              "search": this.search,
            }
            if((this.search && this.pageNo == 1)){
              this.myPostedNonProfitGroupArr = []
            }
            if(navigator.onLine) {
              this.server.postApi('user/myNonProfit', data).subscribe((res)=> {
                if(res.responseCode == 200) {
                  let result = res.result.docs
                  this.myNonProfitTime=res.result.docs
                  this.myNonProfitTime.forEach((element,index) => {
                    //   this.timeArr.push(element.createdAt)
                    //  console.log('bfdfbdfb====>>>>',this.timeArr)
                     let oldDate= new Date(element.createdAt).getTime()
                     console.log(oldDate)
                     this.myNonProfitPostedDate= this.newDate - oldDate
                     console.log("diff date===",this.myNonProfitPostedDate)
                                       
                        this.days = Math.floor(this.myNonProfitPostedDate / (1000 * 60 * 60 * 24));
                        this.hours = Math.floor((this.myNonProfitPostedDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        this.minutes = Math.floor((this.myNonProfitPostedDate % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((this.myNonProfitPostedDate % (1000 * 60)) / 1000);
       
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
                      this.myPostedNonProfitGroupArr.push(element)
                    });
                     // to deactivate scroll event
                    this.scrollEventListen =  false
                  }else {
                    //to check if scroll event is called or not
                    if(this.scrollEventListen) {
                      this.pageNo = this.pageNo - 1;
                    }
                  }
               
                this.total= this.myPostedNonProfitGroupArr.length
                }
              })
          }
          }

           // to add comment to event
      addDeleteComment(comments){ 
        $('#commentModal').modal('hide') 
      if(this.obj.comment || comments =='false') {
        let data = {
          "userId": localStorage.getItem('user_id'),
          "postId": this.nonProfitGroupId,
          "comment": this.obj.comment,
          "commentId": this.commentId,
          "comments":comments,
        }
        if(navigator.onLine && this.apiHit) {
          this.apiHit = false
          let api = this.server.postApi('user/nonProfitLikesAndComment',data).subscribe((res)=>{
            this.apiHit = true
            api.unsubscribe()
            if(res.responseCode == 200) {
              this.obj.comment =''
              this.obj.i=''
              this.server.showSuccToast('Comment updated successfully');
              if(this.selected == 'nonProfitGroup') {
                if(comments =='true'){
                  console.log(res.comments.comments[res.comments.comments.length - 1])
                  this.nonProfitGroupList[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments;
                }else{
                  this.nonProfitGroupList[this.selectedIndex]['comments'] = res.result.comments
                  this.commentsArr = res.result.comments;
                }
               
              }else if(this.selected == 'viewNonProfitGroup') {
                if(comments =='true'){
                  this.myPostedNonProfitGroupArr[this.selectedIndex]['comments'] = res.comments.comments
                  this.commentsArr = res.comments.comments
                }else{
                  this.myPostedNonProfitGroupArr[this.selectedIndex]['comments'] = res.result.comments
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

  // to like non profit group post
     addLikeNonProfit(data,val) {
      this.nonProfitGroupId = data['_id']
      let index = this.nonProfitGroupList.findIndex(x=>x == data)
      this.selectedIndex = index
      console.log(index)
      if(navigator.onLine && this.apiHit) {
        this.apiHit = false
        let data = {
          "userId": localStorage.getItem('user_id'),
          "postId": this.nonProfitGroupId,
          "like": val
        }
        this.server.postApi('user/nonProfitLikesAndComment',data).subscribe((res)=>{
          this.apiHit = true
          if(res.responseCode == 200) {
            if(val == 'true') {
              this.server.showSuccToast('Liked!')
              if(this.selected == 'nonProfitGroup') {
                this.nonProfitGroupList[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;

                this.nonProfitGroupList[this.selectedIndex]['myLike'] = true
              }else if(this.selected == 'viewNonProfitGroup') {
                this.myPostedNonProfitGroupArr[this.selectedIndex]['likes'] = res.likes
                this.likesArr = res.likes;
                this.nonProfitGroupList[this.selectedIndex]['myLike'] = true
              }
            }else if(val == 'false'){
              this.server.showSuccToast('UnLiked!')
              if(this.selected == 'nonProfitGroup') {
                this.nonProfitGroupList[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.nonProfitGroupList[this.selectedIndex]['myLike'] = false
              }else if(this.selected == 'viewNonProfitGroup') {
                this.myPostedNonProfitGroupArr[this.selectedIndex]['likes'] = res.result.likes
                this.likesArr = res.result.likes;
                this.nonProfitGroupList[this.selectedIndex]['myLike'] = false
              }
              console.log(this.nonProfitGroupList[this.selectedIndex])
            }
          }
        })
      }
    }

    // to select friend
    openModal(event){
      
      this.eventid=event,
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
shareNonProfit(){
      let data={
        "memberId":localStorage.getItem('user_id'),
        "gameId":this.eventid,
        "sharedTo":this.friendArr,
      }
      console.log("my data464", data)
    this.server.postApi('user/shareNonProfit', data).subscribe((res)=>{
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

    // to get event on scroll End(bottom of the page)
   @HostListener("window:scroll", [])
   onScroll(): void {
   if (((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) && !this.scrollEventListen) {
       console.log('bottom reached!',window.innerHeight + window.scrollY  + ' >= ' + (document.body.offsetHeight))
           // you're at the bottom of the page
           this.pageNo ++;
           console.log('length of non profit Arr', this.nonProfitGroupList.length)
          //  this.callOnScroll()
         }  
   }

   // to call on scroll
   callOnScroll() {
     let arr = window.location.href.split('/')
     let path = arr[arr.length - 1]
     if(path!= 'createNonProfitGroup') {
       if(path == 'nonProfitGroup') {
         this.viewNonProfitGroup();
       } else if(path == 'viewNonProfitGroup') {
           this.viewMyPostedNonProfitGroup()
       }   
     }else {
       return;
     }
   }

   //edit delete of non profit
   actionOnEventList(val,post_id){
    let data={
      "userId":localStorage.getItem('user_id'),
      "postId":post_id,
      "type":val,
    }
    if(navigator.onLine) {
      this.server.postApi('user/hideAndDeleteNonProfit', data).subscribe((res)=> {
        if(res.responseCode == 200) {
         this.server.showSuccToast('Non Profit Group Deleted Successfully.')
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
             "eventId": this.nonProfitGroupId
           }
           
           this.server.postApi('user/nonProfitEditComment', req).subscribe((res)=>{
             if(res.responseCode == 200){
               this.server.showSuccToast(res.responseMessage)
               this.commentsArr[this.selectedIndex]['comment'] = this.obj.edit_comment
               this.obj.edit_comment=''
               this.commentsArr[this.selectedIndex]['showTime']= 'sec ago'
               this.commentsArr[this.selectedIndex]['showEdit'] = false
             }
           })
        }
        // to reply comment on comment
      replyComment(item){
        let data={
          "userId":localStorage.getItem('user_id'),
          "commentId":item._id,
          "comment":item.comment,
          "postId":this.nonProfitGroupId,
          "userPic":item.userPic,
          "showTime":item.commentedTime,
          "username":item.userName
      }
      console.log("fjgj", data);
      
     $('#commentModal').modal('hide')
      this.router.navigate(['/nonprofit-reply'],{queryParams:{value:JSON.stringify(data)}})

      }

}
