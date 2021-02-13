import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

declare var $: any;

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  total: any;
  page: number = 1;
  page1: number = 1;
  total1: any;
  limit: any = 5;
  search: any = '';
  classroomSuggestion: any;
  classroomSuggestionList: any = [];
  selected: string = "classroom";

  classroomList: any = [];
  discoverClassroomList: any = [];
  createClassroomForm: FormGroup;
  friendArr: any = [];
  categoryArry: any;
  newArry: any = []
  categoryNameList: any = [];
  categoryname: any;
  friendList: any = [];
  dropdownList: any = [];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  classId: any;
  categoryName: any;
  searchChange = new Subject<string>();
  fileData: any = "assets/images/backmod.png";
  fileName: any;

  constructor(public server: ServerService, private router: Router, public shared: SharedModule) {
    this.searchChange.debounceTime(800).distinctUntilChanged().subscribe(val => {
      this.search = val
      this.total = 0
      if (this.search) {
        this.page = 1
      }
      if (navigator.onLine) {
        if (this.selected == 'groups') {
          this.classroomList = [];
          this.classroom()
        } else if (this.selected == 'discoverClassroom') {
          this.discoverClassroomList = [];
          this.discoverClassroom()
        }
      } else {
        if (val.length == 1)
          this.server.showWarnToast('Check internet connection!')
      }
    })
  }

  ngOnInit() {
    this.createClassroomValidateForm()
    this.classroom()
    this.selectTab('classroom')
  }

  // to validate create classroom form
  createClassroomValidateForm() {
    this.createClassroomForm = new FormGroup({
      'classroomName': new FormControl('', [Validators.required]),
      'category': new FormControl(''),
      'welcomePost': new FormControl(''),
      'description': new FormControl(''),
      'dropdown_friendlist': new FormControl('', [Validators.required])
    })
  }
  /** to get the value of field  */
  get classroomName(): any {
    return this.createClassroomForm.get('classroomName');
  }

  /** to get the value of field  */
  get category(): any {
    return this.createClassroomForm.get('category');
  }

  /** to get the value of field  */
  get welcomePost(): any {
    return this.createClassroomForm.get('welcomePost');
  }

  /** to get the value of field  */
  get description(): any {
    return this.createClassroomForm.get('description');
  }

  /** to get the value of field  */
  get dropdown_friendlist(): any {
    return this.createClassroomForm.get('dropdown_friendlist');
  }



  // to check tab
  selectTab(path) {
    this.router.navigateByUrl('classroom/' + path)
    this.selected = path
    this.page = 1
    this.total = 0
    if (path == 'classroom') {
      this.classroomList = [];
      this.classroom()
    } else if (path == 'discoverClassroom') {
      this.discoverClassroomList = [];
      this.discoverClassroom()
    } else if (path == 'createClassroom') {
      // this.contactList=[];
      this.getCategoryList()
    }
  }

  // to search by name
  // searchByName(val) {
  //   this.search = val
  //   this.total = 0
  //   if (this.search) {
  //     this.page = 1
  //   }
  //   if (navigator.onLine) {
  //     if (this.selected == 'groups') {
  //       this.classroomList = [];
  //       this.classroom()
  //     } else if (this.selected == 'discoverClassroom') {
  //       this.discoverClassroomList = [];
  //       this.discoverClassroom()
  //     }
  //   } else {
  //     if (val.length == 1)
  //       this.server.showWarnToast('Check internet connection!')
  //   }

  // }
  // to get classroom list
  classroom() {
    this.selected = 'classroom'
    let data = {
      "userId": localStorage.getItem('user_id'),
      "pageNumber": this.page1,
      "limit": this.limit,
      "search": this.search

    }
    if (navigator.onLine) {
      this.server.postApi('user/recentlyVisitedClass', data).subscribe((res) => {
        if (res.responseCode == 200) {
          this.classroomList = res.result.success2.docs,
          console.log("my class data", this.classroomList)
          this.total = res.result.success2.total
          //console.log(this.classroomList)         
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // To join a classroom
  joinClassroom(classId) {
    this.classId = classId;
    let data = {
      "userId": localStorage.getItem('user_id'),
      "classId": this.classId
    }
    if (navigator.onLine) {
      this.server.postApi('user/joinClass', data).subscribe((res) => {
        if (res.responseCode == 200) {
          this.server.showSuccToast(res.responseMessage)
        } else {
          this.server.showErrToast(res.responseMessage);
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // To Discover classroom
  discoverClassroom() {
    this.selected = 'discoverClassroom'
    let data = {
      "userId": localStorage.getItem('user_id'),
      //"token": localStorage.getItem('token'),
      "pageNumber": this.page1,
      "limit": this.limit,
      "search": this.search
    }
    if (navigator.onLine) {
      this.server.postApi('user/discoverclass', data).subscribe((res) => {
        if (res.responseCode == 200) {
          //this.server.showSuccToast(res.responseMessage)
          this.discoverClassroomList = res.result.success.docs
          this.total1 = res.result.success.total
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  //To create a classroom
  createClassroom() {
    this.selected = 'createClassroom'
    let data = {
      "userId": localStorage.getItem('user_id'),
      "token": localStorage.getItem('token'),
      "category": !this.categoryname ? [] : [{ "categoryName": this.categoryname }],
      "classRoomName": this.createClassroomForm.value.classroomName,
      "welcomePost": this.createClassroomForm.value.welcomePost,
      "description": this.createClassroomForm.value.description,
      "image": this.fileData != "assets/images/backmod.png" ? this.fileData : "",
      "members": this.friendArr
    }
    if (navigator.onLine) {
      this.server.postApi('user/createClass', data).subscribe((res) => {
        if (res.responseCode == 200) {
          this.server.showSuccToast("Classroom created");
          $('#myModal').modal('hide');
          this.createClassroomForm.reset();
          this.friendArr = []
          this.selected = "classroom";
          this.classroom();
        } else
        this.server.showErrToast(res.responseMessage);
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  //To get Category List
  async getCategoryList() {
    this.selected = "createClassroom"
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
      "pageNumber": 1
    }
    if (navigator.onLine) {
      this.categoryArry = this.server.postApi('user/classByCategory', data).subscribe((res) => {
        this.categoryArry.unsubscribe();
        if (res.responseCode == 200) {
          this.categoryNameList = res.result.success.docs
          console.log("class category===>>" + this.categoryNameList)
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

  //to call friend list/member list
  callFriendList() {
    // let data = {
    //   "_id": localStorage.getItem('user_id'),
    //   "token": localStorage.getItem('token'),
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
      //   if (res.responseCode == 200) {
      //     //this.server.showSuccToast(res.responseMessage)
      //     this.friendList = res.result.success2.docs
      //     this.dropdownList = this.friendList
      //     this.dropdownSettings = {
      //       singleSelection: false,
      //       idField: '_id',
      //       textField: 'firstName',
      //       selectAllText: 'Select All',
      //       unSelectAllText: 'UnSelect All',
      //       itemsShowLimit: 3,
      //       allowSearchFilter: true
      //     };
      //   }
      // })
    }
    else {
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
    console.log(this.friendArr)
  }
  //To unselect any particular friend/member
  onItemDeSelect(item: any) {
    let index = this.friendArr.findIndex(x => x == item)
    this.friendArr.splice(index, 1)
    console.log(this.friendArr)
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


  //To Reset Createclassroom form
  createClassroomFormReset() {
    this.createClassroomForm.reset();
    this.selected = "classroom"
  }
  // For pagination
  pageChanged(page) {
    this.page1 = page
    if (this.selected == 'classroom') {
      this.classroom()
    } else if (this.selected == 'discoverClassroom') {
      this.discoverClassroom()
    }
  }

  showDescription(item) {
    this.router.navigate(['/classroom-description'], { queryParams: { class: item._id } });
  }

  upload(event) {
    var reader = new FileReader()
    reader.onload = (e) => {
      this.fileData = e.target['result'];
    }
    reader.readAsDataURL(event.target.files[0]);
    this.fileName = event.target.files[0].name;
}
}
