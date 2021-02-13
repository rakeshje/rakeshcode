import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../components/shared/shared.module';

declare var $: any;

@Component({
    selector: 'app-creategroup',
    templateUrl: './creategroup.component.html',
    styleUrls: ['./creategroup.component.scss']
})
export class CreategroupComponent implements OnInit {

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
    selected: string = "groups";
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
    fileName: any;

    constructor(public server: ServerService, private router: Router, public shared: SharedModule) { }


    ngOnInit() {
        this.validateForm()
        this.groups()
    }

    // to validate Creategroup form
    validateForm() {
        this.createGroupForm = new FormGroup({
            'groupName': new FormControl('', [Validators.required]),
            'category': new FormControl('', [Validators.required]),
            'welcomePost': new FormControl('', [Validators.required]),
            'description': new FormControl('', [Validators.required]),
            'dropdown_friendlist': new FormControl('', [Validators.required])
        })
    }

    //To Reset createGroupForm
    createGroupFormReset() {
        this.createGroupForm.reset();
        this.selected = "groups"
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
        this.selected = 'groups'
        let data = {
            "userId": localStorage.getItem('user_id'),
            "pageNumber": this.page1,
            "limit": this.limit,
            "search": this.search

        }
        if (navigator.onLine) {
            this.server.postApi('user/recentlyVisited', data).subscribe((res) => {
                if (res.responseCode == 200) {
                    this.groupsList = res.result.success2.docs
                    this.total1 = res.result.success2.total
                    //console.log(this.groupsList)         
                }
            })
        } else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // To join a group 
    joinGroup(groupId) {
        this.groupId = groupId;
        let data = {
            "userId": localStorage.getItem('user_id'),
            "groupId": this.groupId
        }
        if (navigator.onLine) {
            this.server.postApi('user/joingroup', data).subscribe((res) => {
                if (res.responseCode == 200) {
                    this.server.showSuccToast(res.responseMessage)
                }
            })
        } else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // To Discover Group
    discoverGroup() {
        this.selected = 'discoverGroup'
        let data = {
            "userId": localStorage.getItem('user_id'),
            "token": localStorage.getItem('token'),
            "pageNumber": this.page1,
            "limit": this.limit,
            "search": this.search
        }
        if (navigator.onLine) {
            this.server.postApi('user/groupSuggestionList', data).subscribe((res) => {
                if (res.responseCode == 200) {
                    //this.server.showSuccToast(res.responseMessage)
                    this.discoverGroupList = res.result.success2.docs
                    this.total = res.result.success2.total
                }
            })
        } else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    //To create a Group
    createGroup() {
        this.selected = 'createGroup'
        let data = {
            "userId": localStorage.getItem('user_id'),
            "token": localStorage.getItem('token'),
            "category": !this.categoryname ? [] : [{ "categoryName": this.categoryname }],
            "groupName": this.createGroupForm.value.groupName,
            "welcomePost": this.createGroupForm.value.welcomePost,
            "description": this.createGroupForm.value.description,
            "image": this.fileData != "assets/images/backmod.png" ? this.fileData : "",
            "members": this.friendArr
        }
        if (navigator.onLine) {
            this.server.postApi('user/createGroup', data).subscribe((res) => {
                if (res.responseCode == 200) {
                    this.server.showSuccToast(res.responseMessage)
                    $('#myModal').modal('hide');
                    // this.fileData=''
                    this.createGroupForm.reset();
                    this.friendArr = []
                    this.selected = "groups"
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
        this.selected = "createGroup"
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
        if (this.selected == 'groups') {
            this.groups()
        } else if (this.selected == 'discoverGroup') {
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
            if (this.selected == 'groups') {
                this.groupsList = [];
                this.groups()
            } else if (this.selected == 'discoverGroup') {
                this.discoverGroupList = [];
                this.discoverGroup()
            }
        } else {
            if (val.length == 1)
                this.server.showWarnToast('Check internet connection!')
        }
    }

    showDescription(item) {
        this.router.navigate(['/group-description'], { queryParams: { group: item._id } });
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
