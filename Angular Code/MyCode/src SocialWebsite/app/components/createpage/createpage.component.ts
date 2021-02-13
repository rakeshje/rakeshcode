import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';


declare var $: any;
@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.scss']
})
export class CreatepageComponent implements OnInit {
  myPageName:any ;
  id: any;
  token: any;
  createGroupForm: FormGroup;
  data1: any;
  categoryNameList: any = []
  categoryArry: any;
  newArry: any = []
  discoverGroupList: any = []
  discoverArray: any = []
  groupsList: any = []
  categoryname: any;
  selected: string = "pages";
  friendList: any = []
  dropdownSettings: any
  dropdownList = [];
  friendArr: any = [];

  limit: any = 5;
  page: number = 1;
  total: any;
  page1: number = 1;
  total1: any;
  groupId: any;
  categoryName: any;
  fileData: any = "assets/images/backmod.png";
  fileName: any = '';
  imageUpload: any = 'assets/images/doc.png';
  follow: any = [];
  userInfo :any = localStorage.getItem('user_id')
  PageimageUpload: void;
    like: any=[];
  constructor(public server: ServerService, private router: Router, public shared: SharedModule) {   this.groups()}


  ngOnInit() {
      this.validateForm()
    console.log('this.usrInfo',this.userInfo)
  }

  // to validate Creategroup form
  validateForm() {
      this.createGroupForm = new FormGroup({
          'pageName': new FormControl('', [Validators.required]),
          'category': new FormControl(''),
          'websiteUrl': new FormControl('',[Validators.required]),
          'description': new FormControl('',[Validators.required]),
          'pageImage': new FormControl('')
      })
  }

  //To Reset createGroupForm
  createGroupFormReset() {
      this.createGroupForm.reset();
      this.selected = "pages"
      this.imageUpload = ''
      this.createGroupForm.controls['pageImage'].reset()
      this.fileName = ''
      this.fileData = 'assets/images/backmod.png'
  }

  /** to get the value of field  */
  get groupName(): any {
      return this.createGroupForm.get('groupName');
  }

  /** to get the value of field  */
  get category(): any {
      return this.createGroupForm.get('category');
  }

  /** to get the value of field  */
  get welcomePost(): any {
      return this.createGroupForm.get('welcomePost');
  }

  /** to get the value of field  */
  get description(): any {
      return this.createGroupForm.get('description');
  }

  /** to get the value of field  */
  get dropdown_friendlist(): any {
      return this.createGroupForm.get('dropdown_friendlist');
  }


  // to search by group 
  search() {
      let data = {
          "_id": localStorage.getItem('user_id'),
          "token": localStorage.getItem('token')
      }
      this.server.postApi('user/searchFriendSuggestion', data).subscribe((res) => {
          if (res.responseCode == 200) {
              this.server.showSuccToast(res['responseMessage'])
          }
      })
  }

  // to get group list
  groups() {
      this.selected = 'pages'
      let data = {
          "userId": localStorage.getItem('user_id'),
          // "pageNumber": this.page1,
          // "limit": this.limit,
          // "search": this.search

      }
      if (navigator.onLine) {
          this.server.postApi('user/getMyPage', data).subscribe((res) => {
              if (res.responseCode == 200) {
                  this.groupsList = res.advData.docs
                  this.total1 = res.advData.docs.total
                  console.log(this.groupsList + this.total1)
                  this.groupsList.fo
              }
          })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

//   Like Unlike
  likeePage(value, evt){

    let data={

            "userId":localStorage.getItem('user_id'),
            "pageId":value._id,
            "like":JSON.parse(evt)
    }

    // this.server.postApi('user/pageLikeAndComment', data).subscribe((res)=>{
    //     console.log("l" ,res);
    //     this.discoverGroup()
        

    // })

    // if (navigator.onLine) {
        this.server.postApi('user/pageLikeAndComment', data).subscribe((res) => {
            console.log('res follow unfollow',res)
            if (res.responseCode == 200) {
                this.server.showSuccToast(res.responseMessage)
                // this.groups()
                this.discoverGroup()
            }
        })
    // }
    //  else {
    //     this.server.showWarnToast('Check internet connection!')
    // }
}

likePage(value,evt) {
    console.log(value)
    console.log(evt)


    this.groupId = value._id;
    let data = {
        // "follow":JSON.parse(evt),
        // "userId": localStorage.getItem('user_id'),   // value.pageAdminId
        // "pageId":value._id,
           userId:localStorage.getItem('user_id'),
            "pageId":value._id,
            "like":evt

           
    }
    console.log("h", data);
    
    
    if (navigator.onLine) {
        this.server.postApi('user/pageLikeAndComment', data).subscribe((res) => {
            console.log('res follow unfollow',res)
            if (res.responseCode == 200) {
                this.server.showSuccToast(res.responseMessage)
                // this.groups()
                this.discoverGroup()
            }
        })
    } else {
        this.server.showWarnToast('Check internet connection!')
    }
}

  // To join a group 
  joinGroup(value,evt) {
      console.log(value)
      console.log(evt)


      this.groupId = value._id;
      let data = {
          "follow":JSON.parse(evt),
          "userId": localStorage.getItem('user_id'),   // value.pageAdminId
          "pageId":value._id,
      }
      if (navigator.onLine) {
          this.server.postApi('user/followUnfollowPage', data).subscribe((res) => {
              console.log('res follow unfollow',res)
              if (res.responseCode == 200) {
                  this.server.showSuccToast(res.responseMessage)
                  // this.groups()
                  this.discoverGroup()
              }
          })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  // To Discover Group
  discoverGroup() {
      this.selected = 'discoverPage'
      let data = {
          //   "userId": localStorage.getItem('user_id'),
          //   "token": localStorage.getItem('token'),
          //   "pageNumber": this.page1,
          //   "limit": this.limit,
          //   "search": this.search
      }
      if (navigator.onLine) {
          this.server.postApi('user/getMyPage', data).subscribe((res) => {
              if (res.responseCode == 200) {
                  console.log(localStorage.getItem('user_id'))
                  //this.server.showSuccToast(res.responseMessage)


                  this.discoverGroupList = res.advData.docs
                  console.log("my", this.discoverGroupList);
                  
                  this.discoverGroupList.forEach(element => {
                      element.followers.forEach(items => {
                          console.log(items)
                          // this.follow.push(items._id)
                          if(items.followerId == localStorage.getItem('user_id'))
                          {
                              this.follow.push(items._id)
                          }
                          else(items.likeId==localStorage.getItem('user_id'))
                          {
                            this.like.push(items._id)
                          }
                      });
                  });
                  this.total = res.advData.docs
                  console.log(this.follow)
              }
              
          })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  //To create a Group
  createGroup() {
      this.selected = 'createPage'
      let data = {
          // "userId":"5d9b047e33bb604bdaed6d68",
          "userId": localStorage.getItem('user_id'),
          "description": this.createGroupForm.value.description,
          "pageName": this.createGroupForm.value.pageName,
          "websiteUrl": this.createGroupForm.value.websiteUrl,
          "pageImage": this.imageUpload ? this.imageUpload : '',
          //   "token": localStorage.getItem('token'),
          "category": !this.categoryname ? [] : [{ "categoryName": this.categoryname }],
          // "category": this.createGroupForm.value.category, 
          "coverPic": this.fileData != "assets/images/backmod.png" ? this.fileData : "",
          //   "members": this.friendArr
      }
      if (navigator.onLine) {
          this.server.postApi('user/createPage', data).subscribe((res) => {
              if (res.responseCode == 200) {
                  this.server.showSuccToast(res.responseMessage)
                  $('#myModal').modal('hide');
                  this.createGroupForm.reset();
                  this.friendArr = []
                  this.selected = "pages"

                  this.imageUpload = ''
                  this.createGroupForm.controls['pageImage'].reset()
                  this.fileName = ''
                  this.fileData = 'assets/images/backmod.png'
                  this.groups()
              } else
                  this.server.showErrToast(res.responseMessage);
          })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  //To get Category List
  async getCategoryList() {
      this.selected = "createPage"
      await this.callCategoryList();
      await this.callFriendList();
      $('#myModal').modal({ backdrop: 'static', keyboard: false })
  }

  // to call category list
  callCategoryList() {
      this.newArry = []
      let data = {
          "userId": localStorage.getItem('user_id'),
          "Limit": 5,
          "page": 1
      }
      if (navigator.onLine) {
          this.categoryArry = this.server.postApi('user/groupbycategory', data).subscribe((res) => {
              this.categoryArry.unsubscribe();
              if (res.responseCode == 200) {
                  this.categoryNameList = res.result.success.docs
                  this.categoryNameList.forEach((element, index) => {
                      element.category.forEach((obj) => {
                          this.newArry.push({
                              categoryName: obj.categoryName
                          })
                      })
                  })
              }
          })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  //to call friend list
  callFriendList() {
      // let data = {
      //     "_id": localStorage.getItem('user_id'),
      //     "token": localStorage.getItem('token'),
      // }
      if (navigator.onLine) {
          this.friendList = this.shared.allFriends;
          this.dropdownList = this.friendList
          this.dropdownSettings = {
              singleSelection: false,
              idField: '_id',
              textField: 'firstName',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 3,
              allowSearchFilter: true
          };
          // this.server.getFriend('user/getFriendList').subscribe(res => {
          //     if (res.responseCode == 200) {
          //         //this.server.showSuccToast(res.responseMessage)
          //         this.friendList = res.result.success2.docs
          //         this.dropdownList = this.friendList
          //         this.dropdownSettings = {
          //             singleSelection: false,
          //             idField: '_id',
          //             textField: 'firstName',
          //             selectAllText: 'Select All',
          //             unSelectAllText: 'UnSelect All',
          //             itemsShowLimit: 3,
          //             allowSearchFilter: true
          //         };
          //     }
          // })
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
  }

  //To select particular friend/member
  onItemSelect(item: any) {
      let obj = {
          "memberId": item['_id']
      }
      this.friendArr.push(obj)
      console.log(this.friendArr)
  }

  //To select all members/friends
  onSelectAll(items: any) {
      let obj = {}
      items.forEach((element) => {
          obj = {
              "memberId": element['_id']
          }
          this.friendArr.push(obj)
      })
  }

  //To unselect any particular friend/member
  onItemDeSelect(item: any) {
      let index = this.friendArr.findIndex(x => x == item)
      this.friendArr.splice(index, 1)
  }

  // to check category
  checkCat(val) {
      this.categoryname = val;
  }

  //To unselect all friends/members
  onDeSelectAll(items: any) {
      this.friendArr = []
      console.log(this.friendArr)
  }

  // for pagination
  pageChanged(page) {
      // console.log(page)
      this.page1 = page
      if (this.selected == 'pages') {
          this.groups()
      } else if (this.selected == 'discoverPage') {
          this.discoverGroup()
      }
  }

  // to search by name
  searchByName(val) {
      this.search = val
      this.total = 0
      if (this.search) {
          this.page = 1
      }
      if (navigator.onLine) {
          if (this.selected == 'pages') {
              this.groupsList = [];
              this.groups()
          } else if (this.selected == 'discoverPage') {
              this.discoverGroupList = [];
              this.discoverGroup()
          }
      } else {
          if (val.length == 1)
              this.server.showWarnToast('Check internet connection!')
      }
  }

  showDescription(item){
      // this.myPageName = item.pageName
      // this.PageimageUpload = item.imageUpload
      // this.createGroupForm.patchValue({
      //     'pageName' : item.pageName,
      //     'websiteUrl': item.websiteUrl,
      //     'description': item.description,,

      // })
      // $('#myModalOpen').modal({backdrop:'static', keyboard: false})
      
      // this.router.navigate(['/page-description'], { queryParams: { pageId: item._id, pageName :item.pageName } });
      this.router.navigate(['/page-descripton'], { queryParams: { pageId: item._id, pageName :item.pageName } });
  }

  upload(event) {
      var reader = new FileReader()
      reader.onload = (e) => {
          this.fileData = e.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
      this.fileName = event.target.files[0].name;
  }
  uploadImage(event) {
      var reader = new FileReader()
      reader.onload = (e) => {
          this.imageUpload = e.target['result'];
      }
      reader.readAsDataURL(event.target.files[0]);
      // this.imageUpload = event.target.files[0].name;
  }
}
