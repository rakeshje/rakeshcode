import { Component, OnInit, HostListener } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Observable, Subject } from 'rxjs';



declare var $: any
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  selected: string = "job";
  payForm: FormGroup;
  page: number = 1;
  total: any;
  jobList: any = [];
  appliedJobList: any = [];
  applyJobForm: FormGroup;
  countryCodeArr: any = [];
  dropDownForm: FormGroup;
  addJobForm: FormGroup;
  type: any;
  base64Image: any;
  upload: any;
  profileImage: any;
  disableCheck: boolean = false;
  addJobs: any;
  stateArr: any = [];
  cityArr: any = [];
  stateUnfilteredArr: any = [];
  cityUnfilteredArr: any = [];
  profileImageDocument1: any;
  profileImageDocument2: any;
  industryArr: any = [];
  categoryArry: any;
  industryTypeList: any = [];
  industryCategoryname: any;
  profileImageDocumentAddressProof: any;
  profileImageDocumentPhotoProof: any;
  profileImageDocumentResume: any;
  bankList: any = [];
  pageNo: any = 1;
  limit: any = 10;
  scrollJobListen: boolean = false;
  apiHit: boolean = true;
  user_id = localStorage.getItem('user_id')

  // DATE PICKER
  myOptions: INgxMyDpOptions = {
    dateFormat: 'd/m/yyyy',
    todayBtnTxt: 'Today',
    sunHighlight: true,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  selectedCardDetails: any = {};
  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true,//true/false for the search functionlity defaults to false,
    height: '292px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: this.countryCodeArr.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search',// label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }
  // config: {
  // displayKey: string; //if objects array passed which key to be displayed defaults to description
  //   search: boolean; //true/false for the search functionlity defaults to false,
  //   //true/false for the search functionlity defaults to false,
  //   height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  //   //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  //   placeholder: string; // text to be displayed when no item is selected defaults to Select,
  //   // text to be displayed when no item is selected defaults to Select,
  //   customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
  //   // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
  //   limitTo: any; // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
  //   // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
  //   moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
  //   // text to be displayed whenmore than one items are selected like Option 1 + 5 more
  //   noResultsFound: string; // text to be displayed when no items are found while searching
  //   // text to be displayed when no items are found while searching
  //   searchPlaceholder: string; // label thats displayed in search input,
  //   // label thats displayed in search input,
  //   searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  // };
  // config: {
  // displayKey: string; //if objects array passed which key to be displayed defaults to description
  //   search: boolean; //true/false for the search functionlity defaults to false,
  //   //true/false for the search functionlity defaults to false,
  //   height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  //   //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  //   placeholder: string; // text to be displayed when no item is selected defaults to Select,
  //   // text to be displayed when no item is selected defaults to Select,
  //   customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
  //   // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
  //   limitTo: any; // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
  //   // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
  //   moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
  //   // text to be displayed whenmore than one items are selected like Option 1 + 5 more
  //   noResultsFound: string; // text to be displayed when no items are found while searching
  //   // text to be displayed when no items are found while searching
  //   searchPlaceholder: string; // label thats displayed in search input,
  //   // label thats displayed in search input,
  //   searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  // };

  config1: {
    displayKey: string; //if objects array passed which key to be displayed defaults to description
    search: boolean; //true/false for the search functionlity defaults to false,
    height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    // width: string;
    placeholder: string; // text to be displayed when no item is selected defaults to Select,
    customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: any; // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: string; // text to be displayed when no items are found while searching
    searchPlaceholder: string; // label thats displayed in search input,
    searchOnKey: string;
  };
  job_id: any;
  job_details: any;
  job_pic: any;
  job_company: any;
  myPostedJobArr: any = [];
  myAppliedJobArr: any = [];
  price: any;
  totalAmount: any = 0;
  tokenId: any;
  token: any;
  phoneCodeArr: any=[];

  
  // stripe: any;
  // to get form value
  get bank(): any {
    return this.payForm.get('bank');
  }
  get expiry_year(): any {
    return this.payForm.get('expiry_date');
  }
  get expiry_month(): any {
    return this.payForm.get('expiry_month');
  }
  get cvv(): any {
    return this.payForm.get('cvv')
  }
  get days(): any {
    return this.payForm.get('days')
  }
  searchTerm$ = new Subject<string>();
  search: any = "";
  constructor(public server: ServerService, private router: Router) {
    window.scrollTo(0, 0)

    // to add search filter
    this.server.search(this.searchTerm$)
      .subscribe(results => {
        this.search = results;
        if (this.search) {
        } else {
          this.jobList = []
        }
        this.page = 1
        this.job();
      });

  }

  ngOnInit() {

    this.getBankList()
    this.job()
    this.checkValidApplyJobForm()
    this.checkValidAddJobForm()
    this.getCountryJson()
    this.getStateJson()
    this.getCityJson()
    this.getIndustryType()
    this.loadStripe()
    this.getDialCodesJson()
    // APi here to get price for posting job
    this.price = 10
    $('payModal').show();
    this.form();

    this.config1 = {
      displayKey:"dial_code", //if objects array passed which key to be displayed defaults to description
      search:true ,//true/false for the search functionlity defaults to false,
      height: '292px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      // width:'500px',
      placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: this.countryCodeArr.length ,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder:'Search' ,// label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }





  

  form() {
    // payment form
    this.payForm = new FormGroup({
      bank: new FormControl('', [Validators.required]),
      expiry_year: new FormControl('', [Validators.required]),
      expiry_month: new FormControl('', [Validators.required]),

      cvv: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      days: new FormControl(0, [Validators.required]),

    });

  }
  // to calculate total amount
  calculate(evt) {
    console.log(evt.target.value)
    if (evt.target.value) {
      this.totalAmount = Number(this.price) * Number(evt.target.value)
      console.log(this.payForm.value)
      console.log(this.totalAmount)
    } else {
      this.totalAmount = 0;
      // this.payForm.patchValue({'days':0})
    }

  }

  // to add bank 
  addBank() {
    localStorage.setItem('bank', JSON.stringify(this.addJobForm.value))
    this.router.navigateByUrl('bank/Add_Bank_Details')
  }

  // to get bank details
  getBankList() {
    if (navigator.onLine) {
      this.server.postApi('user/viewcard', { "userId": localStorage.getItem('user_id') }).subscribe((res) => {
        if (res.responseCode == 200) {
          this.bankList = res.result
          console.log("bank", this.bankList)
          this.callByUrl()
        }
      })
    }
  }

  // to check active tab using url
  async callByUrl() {

    let arr = window.location.href.split('/')
    let val = arr[arr.length - 1]
    this.selectTab(val)
  }

  // to check tab
  selectTab(path) {
    window.scrollTo(0, 0)
    this.router.navigateByUrl('jobs/' + path)
    this.selected = path
    this.scrollJobListen = false
    this.page = 1
    this.total = 0
    if (path == 'job') {
      this.jobList = [];
      this.job()
    } else if (path == 'addJob') {
      console.log("length of banklist", this.bankList.length)
      // if(this.bankList.length==0){
      //   this.router.navigate(['/bank/Add_Bank_Details'])
      // }

    } else if (path == 'appliedJobHistory') {
      this.appliedJobList = [];
      this.appliedJobHistory()
    } else if (path == 'viewPostedJob') {
      this.viewMyPostedJob();
    } else if (path == 'applyJob') {
      if (!this.job_pic) {
        this.selectTab('job')
      }
    }
  }

  /** to get state country list  */
  getCountryJson() {
    this.server.getCountryJson().subscribe((res) => {
      res.forEach(element => {
        element['type'] = 'country'
      });
      this.countryCodeArr = res
      //console.log("country list====>>>",this.countryCodeArr)
    })
  }

  // to get state json
  getStateJson() {
    this.server.getStateJson().subscribe((res) => {
      res.forEach(element => {
        element['type'] = 'state'
      });
      this.stateUnfilteredArr = res

      //console.log("state list====>>>",this.stateUnfilteredArr)
    })
  }

  // to get city json
  getCityJson() {
    this.server.getCityJson().subscribe((res) => {
      res.forEach(element => {
        element['type'] = 'city'
      });
      this.cityUnfilteredArr = res
      //console.log("city list====>>>",this.cityUnfilteredArr)
    })
  }

  //To check valid drop down form
  checkValidDropDownForm() {
    this.dropDownForm = new FormGroup({
      countryName: new FormControl(''),
      //last_name: new FormControl('', [Validators.pattern(/^[a-z ,.'-]+$/i)]),
      //email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),

    })
  }

  // to get joblist
  job() {
    this.selected = 'job'
    let data = {
      "userId": localStorage.getItem('user_id'),
      //"city":"delhi",
      "pageNumber": this.page,
      "search": this.search,
      "limit": this.limit,

    }

    if ((this.search && this.pageNo == 1)) {
      this.jobList = []
    }
    if (navigator.onLine) {
      let api = this.server.postApi('user/viewjob', data).subscribe((res) => {
        api.unsubscribe()
        if (res.responseCode == 200) {
          let result = res.result.docs
          if (result.length > 0) {
            result.forEach(element => {
              element['dynamicClass'] = "hide-clas none"
              this.jobList.push(element)
              // console.log("my joblist", this.jobList)
            });
            // to deactivate scroll event
            this.scrollJobListen = false
          } else {
            //to check if scroll event is called or not
            if (this.scrollJobListen) {
              this.pageNo = this.pageNo - 1;
            }
          }
          this.total = this.jobList.length
        }
      })
    }
  }



  //to view my posted job
  viewMyPostedJob() {
    // this.selected = 'viewPostedJob'
    let data = {
      "userId": localStorage.getItem('user_id'),
      "search": this.search,
      "limit": this.limit,
      "pageNumber": this.pageNo
    }

    if (navigator.onLine) {
      this.server.postApi('user/viewPostedJob', data).subscribe((res) => {
        if (res.responseCode == 200) {
          // this.myPostedJobArr=res.result.docs  
          // console.log(this.jobList) 
          if (res.responseCode == 200) {
            let result = res.result.docs
            if (result.length > 0) {
              result.forEach(element => {
                element['dynamicClass'] = "hide-clas none"
                this.myPostedJobArr.push(element)
              });
              console.log(this.myPostedJobArr)
              // to deactivate scroll event
              this.scrollJobListen = false
            } else {
              //to check if scroll event is called or not
              if (this.scrollJobListen) {
                this.pageNo = this.pageNo - 1;
              }
            }
            this.total = this.myPostedJobArr.length
          }
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // to open payment modal
  checkCompanyImage() {
    if (!this.profileImage || !this.profileImageDocumentAddressProof || !this.profileImageDocumentPhotoProof) {
      this.server.showErrToast('Please upload image')
      return;
    }
    else {
      this.openconfirmModal()
    }
  }


  openconfirmModal() {
    console.log('form ------>>', this.addJobForm.value)
    $('#confirmModal').modal({ backdrop: 'static', keyboard: false })
  }

  // to open payment modal
  openpayModal() {
    $('#payModal').modal({ backdrop: 'static', keyboard: false })
    // this.makePayment();
  }
  // to make payment through stripe api 
  // makePayment() {
  //   this.stripe.setPublishableKey('pk_test_CjmBCanngv0x5LK0eJ0C2FT7')
  //   let cardDetails={
  //     "bank":this.payForm.value.bank,
  //     "expiry_date":this.payForm.value.expiry_date,
  //     "cvv":this.payForm.value.cvv,
  //     "days":this.payForm.value.days
  //   }
  //   this.stripe.createCardToken(cardDetails).then(token=>{
  //     console.log("my token",token )
  //     this.tokenId=token.id
  //     console.log("my token", this.tokenId)
  //     this.addJob()
  //   })

  // }

  /** to get phone dial codes  */
  getDialCodesJson() {
    this.server.getDialCodesJson().subscribe((res)=>{
      this.phoneCodeArr = res
     //console.log("code list====>>>",this.phoneCodeArr)
    })
  }


  loadStripe() {

    if (!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-custom-form-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window['Stripe'].setPublishableKey('pk_test_CjmBCanngv0x5LK0eJ0C2FT7');
        // window['Stripe'].setPublishableKey('pk_test_YLtnsSgypp7wLASIUJsUD3zB');
        // window['Stripe'].setPublishableKey('pk_test_q5AJvE361kqGjfqDgVDBbg4R');
        // window['Stripe'].setPublishableKey('pk_test_nW7gBr2pu71SYZZ0sTL7Fxdt004nZzmahZ');
      }

      window.document.body.appendChild(s);
    }
  }


  //To Add Job
  payment() {
    console.log('form data', this.payForm.value)
    if (!window['Stripe']) {
      this.server.showErrToast('Oops! Stripe did not initialize properly.');
      return;
    }

    if (this.payForm.invalid) {
      return;
    }



    (<any>window).Stripe.createToken({
      number: this.payForm.value.bank,
      exp_month: this.payForm.value.expiry_month,
      exp_year: this.payForm.value.expiry_year,
      cvc: this.payForm.value.cvv,

    }, (status: number, response: any) => {
      console.log(status, response);
      if (status != 200) {
        this.server.showErrToast(response.error.message);
        return;
      }
      console.log('form data', this.payForm.value, response.id)

      this.addJob(response.id);

    });
  }
  addJob(tokenId) {


    let data = {
      "userId": localStorage.getItem('user_id'),
      "title": this.addJobForm.value.jobTitle,
      "addDetails": this.addJobForm.value.jobDetails,
      "email": this.addJobForm.value.jobEmail,
      "totalVacancy": this.addJobForm.value.jobVacancies,
      "pinCode": this.addJobForm.value.pinCode,
      "industryType": this.addJobForm.value.industryType,
      "phoneNumber": this.addJobForm.value.jobContact,
      "phoneCode": this.addJobForm.value.phoneCountryCode,
      "jobType": this.addJobForm.value.jobType,
      "company": this.addJobForm.value.jobCompany,
      "roleExperience": this.addJobForm.value.jobExperience,
      "languages": this.addJobForm.value.languageKnown,
      "gender": this.addJobForm.value.gender,
      "address": this.profileImageDocumentAddressProof,
      "photoId": this.profileImageDocumentPhotoProof,
      "country": this.addJobForm.value.country.name,
      "state": this.addJobForm.value.state.name,
      "city": this.addJobForm.value.city.name,
      "jobPic": this.profileImage,
      "id": tokenId

    }
    console.log("Add job form value", data, this.addJobForm.value)
    if (navigator.onLine) {
      this.addJobs = this.server.postApi('user/addjob', data).subscribe((res) => {

        // this.addJobs.unsubscribe()
        if (res.responseCode == 200) {
          $('#payModal').modal('hide');

          this.server.showSuccToast('Congratulations! you have successfully posted this job')
          this.profileImage="";
          this.base64Image=''
          this.addJobForm.reset();
          this.payForm.reset();
          this.selectTab('job')


        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }

  }


  // To Apply Job
  applyJob() {
    let data = {
      "userId": localStorage.getItem('user_id'),
      "jobId": this.job_id,
      "email": this.applyJobForm.value.applyJobEmail,
      "applicantName": this.applyJobForm.value.applyJobName,
      "country": this.applyJobForm.value.applyJobCountry.name,
      "state": this.applyJobForm.value.applyJobState.name,
      "city": this.applyJobForm.value.applyJobCity.name,
      "zipCode": this.applyJobForm.value.applyJobZipCode,
      "resume": this.profileImageDocumentResume,
      "mobile": this.applyJobForm.value.applyJobContact,
      "gender": this.applyJobForm.value.applyJobGender,
      "pay": 10
    }
    if (navigator.onLine) {
      this.addJobs = this.server.postApi('user/applyjob', data).subscribe((res) => {
        this.addJobs.unsubscribe()
        if (res.responseCode == 200) {
          this.server.showSuccToast('Congratulations! you have successfully applied to this job')
          this.myAppliedJobArr = res.result.docs
          $('#payModal').modal('hide');
          this.applyJobForm.reset()
          this.selectTab('job')
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // to view applied job history
  appliedJobHistory() {
    this.selected = 'appliedJobHistory'
    let data = {
      "userId": localStorage.getItem('user_id'),
    }
    if (navigator.onLine) {
      this.server.postApi('user/viewappliedjob', data).subscribe((res) => {
        if (res.responseCode == 200) {
          this.appliedJobList = res.result
          console.log("history", this.appliedJobList)
          //this.total1= res.result.success2.total  
          //console.log(this.classroomList)         
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  /** to check space */
  toCheckSpace(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode)
    if (charCode == 32) {
      evt.preventDefault()
    } else {
      return true;
    }
  }

  /** to check characters */
  toCheckSpaceChar(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode == 32) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
      evt.preventDefault()
    } else {
      return true;
    }
  }

  /** to check if number */
  toCheckIfNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 32 || charCode == 101) {
      evt.preventDefault()
    } else {
      return true;
    }
  }

  /** To upload cover picture of job */
  handleFileInput(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      if (this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {

        var reader = new FileReader()
        reader.onload = (e) => {
          this.base64Image = e.target['result']
          this.uploadFile()
        }
        reader.readAsDataURL(event.target.files[0]);

      } else {
        this.server.showErrToast("Select only jpg,jpeg and png file.");
      }
    }
  }

  /** To upload document Address Proof of job */
  handleFileInputDocumentAddressProof(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      if (this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.base64Image = e.target['result']
          this.uploadFileAddressProof()
        }
        reader.readAsDataURL(event.target.files[0]);

      } else {
        this.server.showErrToast("Select only jpg,jpeg and png file.");
      }
    }
  }

  /** To upload document Photo Proof of job */
  handleFileInputDocumentPhotoProof(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      if (this.type === 'image/png' || this.type === 'image/jpg' || this.type === 'image/jpeg') {

        var reader = new FileReader()
        reader.onload = (e) => {
          this.base64Image = e.target['result']
          this.uploadFilePhotoProof()
        }
        reader.readAsDataURL(event.target.files[0]);

      } else {
        this.server.showErrToast("Select only jpg,jpeg and png file.");
      }
    }
  }

  //To Upload document Resume
  handleFileInputDocumentResume(event) {
    var self = this;
    if (event.target.files && event.target.files[0]) {
      this.type = event.target.files[0].type;
      console.log(this.type)

      if (this.type === 'application/pdf' || this.type === 'application/msword') {

        var reader = new FileReader()
        reader.onload = (e) => {
          this.base64Image = e.target['result']
          this.uploadFileResume()
        }
        reader.readAsDataURL(event.target.files[0]);
        //this.server.showSuccToast("File Uploaded Successfully!!")
      } else {
        this.server.showErrToast("Select only .pdf or .doc file");
      }
    }
  }

  // to upload file
  uploadFile() {
    console.log('fadsf' + this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
      this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
      this.base64Image = this.base64Image.substring(23);
    }
    let data = {
      "profilePic": 'data:' + this.type + '/;base64,' + this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.server.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        this.profileImage = res.result
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  uploadFileAddressProof() {
    console.log('fadsf' + this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
      this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
      this.base64Image = this.base64Image.substring(23);
    }
    let data = {
      "profilePic": 'data:' + this.type + '/;base64,' + this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.server.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        this.profileImageDocumentAddressProof = res.result
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  uploadFilePhotoProof() {
    console.log('fadsf' + this.base64Image)
    if (this.type === 'image/png' || this.type === 'image/jpg') {
      this.base64Image = this.base64Image.substring(22);
    } else if (this.type === 'image/jpeg') {
      this.base64Image = this.base64Image.substring(23);
    }
    let data = {
      "profilePic": 'data:' + this.type + '/;base64,' + this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.server.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        this.profileImageDocumentPhotoProof = res.result
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // to upload resume
  uploadFileResume() {
    console.log('fadsf' + this.base64Image)
    if (this.type === 'application/pdf') {

    }
    if (this.type === 'application/msword') {
      this.base64Image = this.base64Image.replace("application/msword", "@file/msword")
    }
    let data = {
      "profilePic": this.base64Image
    }
    if (navigator.onLine) {
      this.upload = this.server.postApi('user/imageUpload/', data).subscribe((res) => {
        this.upload.unsubscribe()
        if (res.responseCode == 200) {
          this.profileImageDocumentResume = res.result
          if (this.type === 'application/msword') {
            this.profileImageDocumentResume = this.profileImageDocumentResume + '.docx'
          }
          this.server.showSuccToast("File Uploaded Successfully!!")
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // To Get Industry type Category
  getIndustryType() {
    this.industryArr = [];
    if (navigator.onLine) {
      this.categoryArry = this.server.getApi('user/getAllIndustry').subscribe((res) => {
        this.categoryArry.unsubscribe();
        if (res.responseCode == 200) {
          this.industryTypeList = res.result.docs
          console.log("industry type", this.industryTypeList)
          // this.categoryNameList.forEach((element,index)=>{
          //     element.category.forEach((obj)=>{
          //         this.industryArr.push({
          //             categoryName:obj.categoryName
          //         })
          //     })
          // })
        }
      })
    } else {
      this.server.showWarnToast('Check internet connection!')
    }
  }

  // To check industry category
  checkIndustryCategory(val) {
    this.industryCategoryname = val
    console.log('dropdown', this.industryCategoryname)
  }

  /** to check validity */
  checkValidApplyJobForm() {
    this.applyJobForm = new FormGroup({
      applyJobName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
      applyJobContact: new FormControl('', [Validators.required, Validators.minLength(5)]),
      applyJobEmail: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
      applyJobCountry: new FormControl(''),
      applyJobState: new FormControl(''),
      applyJobCity: new FormControl(''),
      applyJobGender: new FormControl(''),
      applyJobZipCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    })
  }

  /** to get the value of Apply job form field  */
  get applyJobName(): any {
    return this.applyJobForm.get('applyJobName');
  }
  get applyJobContact(): any {
    return this.applyJobForm.get('applyJobContact');
  }
  get applyJobEmail(): any {
    return this.applyJobForm.get('applyJobEmail');
  }
  get applyJobCountry(): any {
    return this.applyJobForm.get('applyJobCountry');
  }
  get applyJobState(): any {
    return this.applyJobForm.get('applyJobState');
  }
  get applyJobCity(): any {
    return this.applyJobForm.get('applyJobCity');
  }
  get applyJobZipCode(): any {
    return this.applyJobForm.get('applyJobZipCode');
  }
  get applyJobGender(): any {
    return this.applyJobForm.get('applyJobGender');
  }

  // to Check valid add job form
  checkValidAddJobForm() {
    this.addJobForm = new FormGroup({
      jobTitle: new FormControl('', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
      jobDetails: new FormControl('', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
      jobVacancies: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      pinCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      jobEmail: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
      jobContact: new FormControl('', [Validators.required, Validators.minLength(5)]),
      jobExperience: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      jobCity: new FormControl('', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
      jobCompany: new FormControl('', [Validators.required]),
      jobType: new FormControl(''),
      phoneCountryCode: new FormControl(''),
      gender: new FormControl(''),
      addressProof: new FormControl(''),
      photoIdProof: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      industryType: new FormControl(''),
      languageKnown: new FormControl('', [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]),
      //email: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),

    })

    // to fill pre filled details in form
    let obj = {}

    console.log(obj)
    if (localStorage.getItem('bank')) {
      obj = JSON.parse(localStorage.getItem('bank'))
      this.addJobForm.patchValue(obj)
      localStorage.removeItem('bank')
    }

  }

  selectionChanged(event) {
    // when wrong event
    if (event.isTrusted) {
      return;
    }
    if (event) {
      if (event.value.type == 'country') {
        this.stateArr = []
        this.stateUnfilteredArr.forEach(element => {
          if (element['country_id'] == event.value.id) {
            console.log('called')
            this.stateArr.push(element)
          }
        });
      } else if (event.value.type == 'state') {
        this.cityArr = []
        this.cityUnfilteredArr.forEach(element => {
          if (element['state_id'] == event.value.id) {
            this.cityArr.push(element)
          }
        });
      }

    }

    console.log(this.stateArr)

  }

  // to get Selected State
  getSelectedState(event) {
    console.log(event.target.value)
    let name = event.target.value
    if (name) {
      let index = this.countryCodeArr.findIndex(x => x.name == name)
      let id = this.countryCodeArr[index]['id'];

      this.stateUnfilteredArr.forEach(element => {
        if (element['country_id'] == id) {
          this.stateArr.push(element)
        }
      });
    } else {
      this.stateArr = []
    }
  }

  // To get Selected City
  getSelectedCity(event) {
    console.log(event.target.value)
    let cityName = event.target.value
    if (cityName) {
      let index = this.stateArr.findIndex(x => x.name == cityName)
      let id = this.stateArr[index]['id'];
      this.cityUnfilteredArr.forEach(element => {
        if (element['state_id'] == id) {
          this.cityArr.push(element)
        }

      });
    } else {
      this.cityArr = []
    }
  }

  /** to get the value of Add job form field  */
  get jobTitle(): any {
    return this.addJobForm.get('jobTitle');
  }
  get industryType(): any {
    return this.addJobForm.get('industryType')
  }
  get jobDetails(): any {
    return this.addJobForm.get('jobDetails');
  }
  get jobVacancies(): any {
    return this.addJobForm.get('jobVacancies');
  }
  get pinCode(): any {
    return this.addJobForm.get('pinCode');
  }
  get jobEmail(): any {
    return this.addJobForm.get('jobEmail');
  }
  get jobContact(): any {
    return this.addJobForm.get('jobContact');
  }
  get jobExperience(): any {
    return this.addJobForm.get('jobExperience');
  }
  get jobCity(): any {
    return this.addJobForm.get('jobCity');
  }
  get jobCompany(): any {
    return this.addJobForm.get('jobCompany');
  }
  get jobType(): any {
    return this.addJobForm.get('jobType');
  }
  get gender(): any {
    return this.addJobForm.get('gender');
  }
  get addressProof(): any {
    return this.addJobForm.get('addressProof');
  }
  get photoIdProof(): any {
    return this.addJobForm.get('photoIdProof');
  }
  get languageKnown(): any {
    return this.addJobForm.get('languageKnown');
  }
  get country(): any {
    return this.addJobForm.get('country');
  }
  get state(): any {
    return this.addJobForm.get('state');
  }
  get city(): any {
    return this.addJobForm.get('city');
  }



  // to get selected card data
  getCardData(bankName) {
    console.log('Get card data', bankName)
    let index = this.bankList.findIndex(x => x.bankName == bankName)
    this.selectedCardDetails = this.bankList[index]
    console.log(this.selectedCardDetails)
  }

  // to navigate and view selected Job
  selectedJob(job_id, job_details, job_pic, job_company) {
    this.job_id = job_id,
      this.job_details = job_details,
      this.job_pic = job_pic,
      this.job_company = job_company,

      this.selected = 'applyJob'
    this.router.navigateByUrl('jobs/' + this.selected)
    this.ViewJobApi()
  }

  // to 
  ViewJobApi() { }

  //to view applied job
  // viewAppliedJob(){
  //   if(navigator.onLine) {
  //     this.server.postApi('user/viewappliedjob',{"userId": localStorage.getItem('user_id')}).subscribe((res)=>{
  //       if(res.responseCode == 200) {

  //       }
  //     })
  //   }
  // }

  // to get event on scroll End(bottom of the page)
  @HostListener("window:scroll", [])
  onScroll(): void {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.scrollJobListen) {
      console.log('called')
      console.log('bottom reached!', window.innerHeight + window.scrollY + ' >= ' + (document.body.offsetHeight))
      // you're at the bottom of the page
      this.scrollJobListen = true
      //console.log('length of event Arr', this.eventList.length)
      this.callOnScroll()
    }
  }

  // to call on scroll
  callOnScroll() {
    this.page++;
    let arr = window.location.href.split('/')
    let path = arr[arr.length - 1]
    if (path != 'addJob') {
      if (path == 'job') {
        this.job();
      } else if (path == 'viewPostedJob') {
        // this.viewMyPostedJob()
      } else if (path == 'appliedJobHistory') {
        this.appliedJobHistory()
      }
    } else {
      return;
    }
  }

  // to toggle list
  showList(index) {
    console.log(this.myPostedJobArr[index]['dynamicClass'])
    if (this.myPostedJobArr[index]['dynamicClass'] == "hide-clas none") {
      this.myPostedJobArr[index]['dynamicClass'] = "hide-clas"
    } else if (this.myPostedJobArr[index]['dynamicClass'] == "hide-clas") {
      this.myPostedJobArr[index]['dynamicClass'] = "hide-clas none"
    }
  }

  // showHide(index) {
  //   if(this.myPostedJobArr[index]['dynamicClass'] == "hide-clas none") {
  //     this.myPostedJobArr[index]['dynamicClass']="hide-clas"
  //   }else if(this.myPostedJobArr[index]['dynamicClass'] == "hide-clas") {
  //     this.myPostedJobArr[index]['dynamicClass']="hide-clas none"
  //   }
  // }

  actionOnEventList(val, job_id, index) {
    let data = {
      "userId": localStorage.getItem('user_id'),
      "jobId": job_id,
      "type": val,
    }
    if (navigator.onLine) {
      this.server.postApi('user/hideAndDeletePostedJob', data).subscribe((res) => {

        if (res.responseCode == 200) {
          if (this.selected == 'viewPostedJob') {
            this.myPostedJobArr.splice(index, 1)
          }
          this.server.showSuccToast('Job Deleted Successfully.')
        }
      })
    }
  }




}
