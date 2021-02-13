import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { SharedModule } from '../shared/shared.module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $ :any
var Map: any;
declare var google:any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  locationForm: FormGroup;
  location: string;
  location1: string;
  computelatlng: any;
  map: any;
  friendListArray: any;
  base64Image: any=[];
  type: string;
  cloudinaryUrl: any='';
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
  recommendationLocationForm: FormGroup;
  tagFriendsArr: any=[];
  selectedIndex: any;
  selectedPrivacy: any="PUBLIC";
  privacyArr: any=[];
  postData: any={};
  gifList: any = [];
  pollDuration: any;
  choosenGif: any =[];
  // fileData: any=[];
  fileName: any;
  urls: any[];
  videoUrls: any[];
  type1:any;
  postdata:any=[]
  gifdata: any=[];
  tagfriend: any=[];
  myEvent: any;
  fileData: any = [];
  fileDataImage: any =[];
  postmyData: any = {};
  GiF: any;

  constructor(public server:ServerService, private router:Router, public shared: SharedModule, private fb:FormBuilder) { }

  ngOnInit() {
    this.checklocationForm()
    this.checkRecommendationLocationForm()
    navigator.geolocation.getCurrentPosition(this.showPosition);

    
  }

  

  // to get privacy value
  selectPrivacy(val) {
    this.friendListArray = []
    if(val == "EXCEPTFRIENDS" || val == "SPECIFICFRIENDS") {
     
      // modal open code here...
    }
    this.selectedPrivacy = val.toUpperCase()
  }

  // close privacy modal
  closePrivacyModal() {
    if(this.friendListArray.length > 0) {
    }else {
      this.selectedPrivacy = "PUBLIC"
    }
      // close nodal code here
  }

  
  createPost(){
    
    if(this.choosenGif.length===0){
      let data={
        "userId": localStorage.getItem('user_id'),
        "privacy":this.selectedPrivacy,
        "caption":this.obj.caption,
        // "image": this.urls,
       
        // "feeling":this.server.myEmojiArr[0].emotion ,
        // "sticker":this.server.myEmojiArr[0].value,
        "location":this.location,
        "timeLine":this.friendListArray,
        "friendsId": this.tagFriendsArr
      }
      this.handleFileInput(this.myEvent, data)
      console.log('dddd',data)
    }
    else if(this.choosenGif.length != 0){
      let item = {
        "userId": localStorage.getItem('user_id'),
        "privacy":this.selectedPrivacy,
        "caption":this.obj.caption,
         "GIF": this.choosenGif,
       
        // "feeling":this.server.myEmojiArr[0].emotion ,
        // "sticker":this.server.myEmojiArr[0].value,
        "location":this.location,
        "timeLine":this.friendListArray,
        "friendsId": this.tagFriendsArr
      }
      this.server.postApi('user/createPost', item).subscribe((res)=>{
        if(res.responseCode == 200) {
        this.postdata=res.success1
          console.log("my data5+565", this.postdata)
               this.router.navigate(['home'])
            }
        })    
    }
   
  }

  sendPost(data) {
    console.log("jbjvbjv", data)
    console.log('this type',this.type1)
     console.log('this type',this.myEvent)
     console.log('this type',this.fileData)
    if(this.type1 === 'video/mp4' || this.type1 === 'video/mov' || this.type1 === 'video/flv' ) {
      data["video"] = this.fileData;
      console.log('this type',data["video"])
    }else if(this.type1 === 'image/png' || this.type1 === 'image/jpg' || this.type1 === 'image/jpeg') {
      data["image"] = this.fileData;
      console.log('this type',this.fileData)
    }
    else if(this.type1==='image/gif'){
      data["GIF"]=this.choosenGif
    }
   else if(this.server.myEmojiArr.length > 0) {
      data["sticker"] = this.server.myEmojiArr[0].value
    }
    if(navigator.onLine) {
      // if(this.type1 === 'image/gif'){
        console.log("data object", JSON.stringify(data))
        this.server.postApi('user/createPost', data).subscribe((res)=>{
          if(res.responseCode == 200) {
          this.postdata=res.success1
            console.log("my data5+565", this.postdata)
                 this.router.navigate(['home'])
              }
          })
      // }
      // else{
      //   this.server.postApi('user/createPost', data).subscribe((res)=>{
      //     if(res.responseCode == 200) {
          
      //       console.log("my data5+565", this.postdata)
      //            this.router.navigate(['home'])
      //         }
      //     })
      // }
     
        }else {
        this.server.showWarnToast('Check internet connection!')
        }
  }


  //To upload photo/video
  photoVideoModal(){
    
  }

  


   /** to check validity */
   checklocationForm() {
    this.locationForm = new FormGroup({
      //recommendationTitle: new FormControl('',),
      location: new FormControl('',),
    })
  }

  /** to check validity */
  checkRecommendationLocationForm() {
    this.recommendationLocationForm = new FormGroup({
      recommendationTitle: new FormControl('',),
      location1: new FormControl('',),
    })
  }

    handleAddressChange(location: Address) {
     
    this.location=location.formatted_address;
    this.computelatlng={
        'lat':location.geometry.location.lat(),
        'lng':location.geometry.location.lng(),
    };
    //var latlng={computelatlng:lat,computelatlng:lng}
    console.log("position",this.computelatlng)
    
    // var marker = new google.maps.Marker({
    //   position: {lat:this.computelatlng.lat,lng:this.computelatlng.lng},
    //   map: Map,
    // });
    // marker.setMap(this.map);
    // console.log("location position",marker)
    var mapProp={
      center:new google.maps.LatLng(this.computelatlng.lat,this.computelatlng.lng),
      zoom:12
    };
    
    this.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    this.addMarker(this.computelatlng.lat,this.computelatlng.lng)
   
  }


  handleAddressChange1(location1: Address) {
     
    this.location1=location1.formatted_address;
    this.computelatlng={
        'lat':location1.geometry.location.lat(),
        'lng':location1.geometry.location.lng(),
    };
    //var latlng={computelatlng:lat,computelatlng:lng}
    console.log("position",this.computelatlng)
    // var marker = new google.maps.Marker({
    //   position: {lat:this.computelatlng.lat,lng:this.computelatlng.lng},
    //   map: Map,
    // });
    // marker.setMap(this.map);
    // console.log("location position",marker)
    var mapProp={
      center:new google.maps.LatLng(this.computelatlng.lat,this.computelatlng.lng),
      zoom:12
    };
    
    this.map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    this.addMarker(this.computelatlng.lat,this.computelatlng.lng)
   
  }

    
  // Add Marker to map 
  addMarker(lat,lng){
    var latlng={lat:lat,lng:lng}
    var marker = new google.maps.Marker({
      position: latlng,
      map:this.map,
    })
    marker.setMap(this.map)
    }

    showPosition(position) {
      var coordinates = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
      console.log(coordinates)
    }



    // Friend list
    tagFriendsModal(){
      let result= this.shared.allFriends;
      console.log("jkf", result);
      
      result.forEach(element => {
        element['typeClass'] = 'userListItem'
      });
      this.friendListArray = result;
      console.log('friends', this.friendListArray, 'result', result)
      //     let data={
      //       "_id": localStorage.getItem('user_id'),
      //       "token": localStorage.getItem('token'),
      //   }
      //   if(navigator.onLine) {
      //   this.server.postApi('user/getFriendList', data).subscribe((res)=>{
      //       if(res.responseCode == 200) {
      //         let result= res.result.success2.docs
      //         result.forEach(element => {
      //           element['typeClass'] = 'userListItem'
      //         });
      //         this.friendListArray = result
      //       }
      //   })
      // }else {
      //   this.server.showWarnToast('Check internet connection!')
      //   }
  }

  //
   /** To upload cover picture/video of post */
   
   handleFileInput(event, data) {
    this.fileData = [];
    this.postmyData =data
    console.log("my data", this.postmyData)
    this.videoUrls = [];
    this.myEvent = event
    let files = event.target.files;
    if(files.length>5){
      setTimeout(() => {
        this.server.showErrToast("Maximum 5 files allow only");  
      }, 1000);
      return;
    }
    console.log(files.length)
    if (files) {
      for (let file of files) {
        console.log("file data===>",file.size,file)
        if(file.size>5242880){
          setTimeout(() => {
            this.server.showErrToast("File size should not be greater than 5MB.");      
          }, 1000);
          return false;
        }
      
        else if(file.size<=5242880){
          if ((file.type == "image/jpeg" || file.type == "image/gif" ||  file.type == "image/jpg" ||
           file.type == "image/png" ) || (file.type=="video/mp4" || file.type=="video/mov" || file.type=="video/flv")) {
            this.type1 = file.type
            console.log('file type',this.type1)

           
              var reader = new FileReader();
              reader.onload = (e: any) => {
                let data = e.target
                 this.fileData.push(data.result);
                 console.log('file data',this.fileData)
               
                 console.log(this.fileData,"This is the fileData", files.length)
                 if(this.fileData.length == files.length) {
                  console.log('FILE GOTT', JSON.stringify(this.fileData))
                  this.sendPost( this.postmyData)
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

  // uploadFile() {
  //   console.log('fadsf' + this.base64Image)

  //   if (this.type1 === 'image/gif') {
  //     this.base64Image = this.cloudinaryUrl.substring(22);
  //     console.log('fadsf' + this.base64Image)

  //   } 
  //   let data = {
  //     "profilePic": 'data:' + this.type1 + '/;base64,' + this.base64Image
  //   }
  //   console.log('fadsf' + data)

  //   if (navigator.onLine) {
  //     this.server.postApi('user/imageUpload/', data).subscribe((res) => {
     
  //       this.GiF = res.result
        
  //     })
  //   } else {
  //     this.server.showWarnToast('Check internet connection!')
  //   }
  // }




  // toupload(){
  //   let data = {
  //     'GIF' : this.cloudinaryUrl
  //   }
  //     this.server.postApi('user/imageUpload',data).subscribe((res)=>{
  //       if(res.responseCode == 200){
  //         console.log()
  //       }
  //     })
  // }


  //  handleFileInput(event) {
  //   // var self = this;
  //   // if(event.target.files && event.target.files[0]){
  //   //   this.type = event.target.files[0].type;
  //   //   console.log(this.type)
  //   this.fileData = []
  //     let files = event.target.files;
  //      this.type = event.target.files[0].type;
  //     console.log("type-->>",this.type)
  //     if (files) {
  //       for (let file of files) {
  //     if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv' || this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') { 
  //       var reader = new FileReader()
  //       reader.onload = (e)=> {
  //         this.fileData.push(e.target['result']);
  //         // this.base64Image = e.target['result'];
  //         console.log("gdffdgd",this.fileData)
  //         // let mb = 1000000;
  //         // let size = ((event.target.files[0]['size'])/mb)
  //         //       if(this.type === 'video/mp4' || this.type === 'video/mov' || this.type === 'video/flv') {
  //         //   if(size <= 50) {
  //         //     // this.uploadFile()
  //         //   }else {
  //         //     this.server.showErrToast('Size must be less than 50 MB')
  //         //     return;
  //         //   }
  //         // }else if(this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
  //         //   if(size <= 10) {
  //         //     // this.uploadFile()
  //         //   }else {
  //         //     this.server.showErrToast('Size must be less than 10 MB')
  //         //     return;
  //         //   }
  //         // }

  //  }
  //         // event.target.files[0]
  //       reader.readAsDataURL(file);
  //     }
  //     else {
  //       this.server.showErrToast("Select only mp4,mov or flv file.");
  //     }
  //   } 
  //   }
  // }

  // uploadFile(event) {
  //   this.fileData = []
  //   let files = event.target.files;
  //   this.type = event.target.files[0].type.split("/")[0];
  //   console.log("type-->>",this.type)
  //   if (files) {
  //     for (let file of files) {
  //       let reader = new FileReader();
  //       reader.onload = (e: any) => {          
  //         console.log("e-->>",e.target.result.split("/")[0].split(":")[1])
  //         if(this.type == e.target.result.split("/")[0].split(":")[1]){
  //           this.fileData.push(e.target.result);
  //         }else{
  //           this.server.showWarnToast("Please select the Files of same type")
  //           this.fileData = ["assets/images/Layer 139.png"];
  //           return false
  //         }
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  //   this.fileName = event.target.files[0].name;
  // }


  //  to upload file
  //  uploadFile() {
  //   this.cloudinaryUrl=';'
  //   // to upload image and video
  //   let data={}, url ;
  //   this.fileData;
  //   this.fileData.forEach((ele,i) => {
  //     if (this.type1 === 'image/png' || this.type1 === 'image/jpg') {
  //       this.fileDataImage.push(this.fileData[i].substring(22)) 
  //       console.log('image file data',this.fileData)
  //     } else if (this.type1 === 'image/jpeg') {
  //       this.fileDataImage.push(this.fileData[i].substring(23)) 
  //       console.log('image file data jpeg',this.fileDataImage)
  
  //     }   
  //     console.log('file Data here',this.fileDataImage)

  //   });
   
  //   console.log('file Data here',this.fileData)

  //   if(this.type1 === 'image/png' || this.type1 === 'image/jpg' || this.type1 === 'image/jpeg') {
  //     data['profilePic'] =  'data:'+ this.type1 +'/;base64,'+this.fileDataImage;
  //     console.log('Image data',data['profilePic'])
  //     url ='user/imageUpload'
  //   }else if(this.type1 === 'video/mp4' || this.type1 === 'video/mov' || this.type1 === 'video/flv') {
  //     data['video'] = this.fileData;
  //     console.log('video data',data['video'])

  //     url = 'user/videoUpload'
  //   }
  //   else if(this.type1 === 'image/gif') {
  //     data['GIF'] = this.fileData;
  //     console.log('gif data',data['GIF'])

  //     url = 'user/gif'
  //   }

  //   if(navigator.onLine) {
  //     let api = this.server.postApi(url,data).subscribe((res)=>{
  //       this.cloudinaryUrl = res.result
  //       console.log('cloud',this.cloudinaryUrl)
  //     })
  //   }
  // }

  // to add tag friends in array
  addTagFriends(data) {
    let index = this.friendListArray.findIndex(x=>x == data)
    if(this.selectedIndex == index) {
      this.tagFriendsArr.splice(index,1)
      this.friendListArray[index]['typeClass'] = 'userListItem'
    }else {
      this.friendListArray[index]['typeClass'] = 'userListItem tagFrnd'
      this.tagFriendsArr.push(data)
      this.selectedIndex =  index  
    }
   console.log(this.tagFriendsArr);
  }
//to select emoji
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

  //check in
  shareCheckIn(){
    if(this.obj.caption) {
      this.obj.caption =this.obj.caption +  '-at'+'  '+ this.location
    }else {
      this.obj.caption ='At'+'  '+ this.location
    }
  }

  // to remove photo / video
  removePhotoOrVideo() {
    this.cloudinaryUrl = "assets/images/photolive.png";
    this.base64Image = ''
  }

  addEmoji(event) {
    this.obj.caption += event.emoji.native;
  }

  selectGif(gif) {
    this.choosenGif = gif.gif;
    $("#gifModal").modal("hide");
    console.log(this.choosenGif);
    // this.obj.caption += gif.gif;
  }

  openGif() {
    // if(this.cloudinaryUrl != "assets/images/photolive.png")
    // return;
    this.server.showSpinner();
    this.server.getApi('user/getAllGif').subscribe(res => {
      this.server.hideSpinner();
      if(res.responseCode == 200) {
        this.gifList = res.result.docs;
        $("#gifModal").modal("show");
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

  checkNum(val) {
    console.log(this.pollDuration);
    if(val.length >= 5) {
      return false;
    }
    else {
      return true;
    }
  }
   
}
