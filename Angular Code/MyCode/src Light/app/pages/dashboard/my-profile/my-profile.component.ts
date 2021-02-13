import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myProfileForm:FormGroup;
  dialCodeArr: any=[];
  dial: any=[];
  config: {
    displayKey: string, //if objects array passed which key to be displayed defaults to description
        search: true ,//true/false for the search functionlity defaults to false,
        height: string, //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: string, // text to be displayed when no item is selected defaults to Select,
        customComparator: () => void, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: any, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: string, // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: string, // text to be displayed when no items are found while searching
        searchPlaceholder: string, // label thats displayed in search input,
        searchOnKey: string,
        clearOnSelection: true
    };
  getDialcodeArr: any=[];
  searchForm: FormGroup;
  twoFaData: any;
  twoFaInputFieldData: any;
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.myProfileFormValidation();
    this.config={
      displayKey: "dial_code", //if objects array passed which key to be displayed defaults to description
          search: true ,//true/false for the search functionlity defaults to false,
          height: "200px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
          placeholder: "search", // text to be displayed when no item is selected defaults to Select,
          customComparator:()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
          limitTo: this.getDialcodeArr, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
          moreText: "string", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
          noResultsFound: "string", // text to be displayed when no items are found while searching
          searchPlaceholder: "Dial code", // label thats displayed in search input,
          searchOnKey: "dial_code",
          clearOnSelection: true
      };
  //-----country json data retrieve-------//
  this.service.countryJson().subscribe((res)=>{
    setTimeout(()=>{
    this.getDialcodeArr = res;
      console.log("fn", this.getDialcodeArr);
      
    this.getDialcodeArr.sort((a, b)=>{
      if((a.dial_code - b.dial_code)!=0){
         return a.dial_code - b.dial_code;
      }
     
  });
  },0)
  })
  this.getData();
}
  myProfileFormValidation(){
    this.myProfileForm= new FormGroup({
      name:new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/),Validators.minLength(2), Validators.maxLength(50)]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i),Validators.maxLength(64)]),
      switch:new FormControl(''),
      number:new FormControl('',[Validators.required, Validators.pattern(/^[0-9]$/), Validators.maxLength(13), Validators.minLength(8)]),
    })

    this.searchForm = new FormGroup({
      comment : new FormControl('')
    })
  }

  //--------Two factor Authentication----//
  authentication(){
    // this.service.showSpinner()
    let data = {
      // twoFAEnable : this.myProfileForm.value.switch,
      mobileNumber : this.myProfileForm.value.number,
      name : this.myProfileForm.value.name
    }
    console.log("fdgs98f7gsbfgk234g8jsf",data)
    this.service.postApi('admin/2fa',data, 1).subscribe((res)=>{
      console.log("11",res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        localStorage.setItem('twoFAEnable',this.myProfileForm.value.switch)
        this.service.successToast(res.responseMessage)
        this.router.navigate(['/otp-profile']);
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }

  //------Routing----//
  getData() {
    this.service.getApi('admin/getProfile',1).subscribe((res)=>{
      console.log("11",res);
      if(res.responseCode==200){
        this.twoFaData = res.result;
        this.myProfileForm.patchValue({
          name : this.twoFaData.firstName,
          email : this.twoFaData.email,
          switch : this.twoFaData.twoFAEnable,
          number : this.twoFaData.mobileNumber
        })
        this.service.hideSpinner()
        // this.router.navigate(['/otp-profile']);
      }
      
    },(error)=>{
      this.service.errorToast("something went wrong")
    })
  }

  twoFaInputField(data) {
    this.twoFaInputFieldData = data;
    console.log("twoFaInputFieldData",this.twoFaInputFieldData)
  }

}
