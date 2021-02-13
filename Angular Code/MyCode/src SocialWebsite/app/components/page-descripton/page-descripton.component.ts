import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { SharedModule } from '../shared/shared.module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


var Map: any;
declare var google:any;
declare var $: any;
@Component({
  selector: 'app-page-descripton',
  templateUrl: './page-descripton.component.html',
  styleUrls: ['./page-descripton.component.scss']
})
export class PageDescriptonComponent implements OnInit {
  locationForm: FormGroup;
  location: string;
  location1: string;
  computelatlng: any;
  map: any;
  friendListArray: any;

  type: string;
  
  obj: any = {caption: ""};
 
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

  postdata:any=[]
  gifdata: any=[];
  tagfriend: any=[];
  myEvent: any;

  fileDataImage: any =[];
  postmyData: any = {};


  paramData:any ={pageId:'',pageName:''};
  createNewPostForm:FormGroup;
  fileData: any = [];
  type1:any;
  cloudinaryUrl: any="";
  base64Image: any=[];
  constructor(public server:ServerService,public route:ActivatedRoute, private router:Router, public shared: SharedModule, private fb:FormBuilder) { }

  ngOnInit() {
  this.route.queryParams.subscribe((item:any)=>{
    this.paramData.pageId = item.pageId;
    this.paramData.pageName = item.pageName
   
    console.log( this.paramData)
  })
  this.createNewPostForm = new FormGroup({
    postDescription: new FormControl('',[Validators.required]),
  })
   
  this.pagePostListInfo()
  }

  

 





  selectGif(gif) {
    this.choosenGif = gif.gif;
    $("#gifModal").modal("hide");
    console.log(this.choosenGif);
    // this.obj.caption += gif.gif;
  }

  openGif() {
    if(this.cloudinaryUrl != "assets/images/photolive.png")
    return;
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


  // rohit code start
   
  // handleFileInput(event, data) {
  //   this.fileData = [];
  //   this.postmyData =data
  //   console.log("my data", this.postmyData)
  //   this.videoUrls = [];
  //   this.myEvent = event
  //   let files = event.target.files;
  //   if(files.length>5){
  //     setTimeout(() => {
  //       this.server.showErrToast("Maximum 5 files allow only");  
  //     }, 1000);
  //     return;
  //   }
  //   console.log(files.length)
  //   if (files) {
  //     for (let file of files) {
  //       console.log("file data===>",file.size,file)
  //       if(file.size>50000000){
  //         setTimeout(() => {
  //           this.server.showErrToast("File size should not be greater than 10MB.");      
  //         }, 1000);
  //         return false;
  //       }
      
  //       else if(file.size<=50000000){
  //         if ((file.type == "image/jpeg" || file.type == "image/gif"||  file.type == "image/jpg" || file.type == "image/png" ) || (file.type=="video/mp4" || file.type=="video/mov" || file.type=="video/flv")) {
  //           this.type1 = file.type
  //           var reader = new FileReader();
  //           reader.onload = (e: any) => {
  //             let data = e.target
  //              this.fileData.push(data.result);
  //             //  this.uploadFile()
  //              console.log(this.fileData,"This is the fileData", files.length)
  //              if(this.fileData.length == files.length) {
  //               console.log('FILE GOTT', JSON.stringify(this.fileData))
  //               this.sendPost( this.postmyData)
  //              }
  
  //           };
  
  //           reader.readAsDataURL(file);

  //         }

          
  //  else {
  //           this.server.showErrToast("Select only jpg,jpeg,png,mp4,mov or flv file.");
  //         }
  
  //       }
  //     }
      
  //   }
  // }

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


   // to remove photo / video
   removePhotoOrVideo() {
    this.cloudinaryUrl = "assets/images/photolive.png";
    this.base64Image = ''
  }

   // to get privacy value
   selectPrivacy(val) {
    this.friendListArray = []
    if(val == "EXCEPTFRIENDS" || val == "SPECIFICFRIENDS") {
    }
    this.selectedPrivacy = val.toUpperCase()
  }

    
  createPost(){
    if(this.choosenGif.length==0){
    let data={
    

      "userId": localStorage.getItem('user_id'),
      "pageId":this.paramData.pageId,
      // "image":this.fileData
      
    }
    this.handleFileInput(this.myEvent, data)
    this.sendPost(data)
  }
  else {
    let data1={
    

      "userId": localStorage.getItem('user_id'),
      "pageId":this.paramData.pageId,
      "GIF":this.choosenGif
    }
    // this.handleFileInput(this.myEvent, data1)
    // this.sendPost(data1)
  
    // 
    // 

    if(navigator.onLine) {
      this.server.postApi('user/createPagePost', data1).subscribe((res)=>{
        if(res.responseCode == 200) {
        
          console.log("res", res)
          this.server.showSuccToast('Post have been successfully shared.')
            }
        })
      }else {
      this.server.showWarnToast('Check internet connection!')
      }
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

  
      //  page post list api 
      pagePostListInfo() {
  
    let data = {
      "pageId": this.paramData.pageId
    }
    this.server.showSpinner();
    this.server.postApi('user/pagePostList', data).subscribe(res => {
      console.log(res)
      this.server.hideSpinner();
      if(res.responseCode == 200) {
      
      } else {
    
      }
    }, (err) => {
      this.server.hideSpinner();
      console.log(err);
    })
  }

}
