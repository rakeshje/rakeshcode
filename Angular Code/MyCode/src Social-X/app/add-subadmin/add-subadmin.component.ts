import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-add-subadmin',
  templateUrl: './add-subadmin.component.html',
  styleUrls: ['./add-subadmin.component.css']
})
export class AddSubadminComponent implements OnInit {

  imageUrl = 'assets/img/profile-img.jpg';
  file: any = [];
  imageType: any = '';
  addSubadminForm: FormGroup;
  masterRoleList: any = [];
  permission: any = [];
  countryList: any=[];
  isValidNumbers: any;
  myCode: string;
  isValidNumber: any;
  permisstionErrorMessage: Boolean = false;
  kycUrl: any;
  eventdata: any;
  boolData: boolean = false;

  constructor(
    // public http: HttpClient,
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
    // if (!this.permission.includes('addSubadmin')) {
    //   this.router.navigate(['/pageNotFound']);
    // }
  }

  ngOnInit() {
 
    // this.phoneCheckCountry();
    // this.phoneCheckCountrys();
    // this.http.get('/assets/json/countries.json').subscribe(list =>{
    //   this.countryList = list 
    // });

    this.form();
    
    // this.getMasterRoleList();
   
  }

  form() {
    this.addSubadminForm = new FormGroup({
      name             : new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(30)]),
      password         : new FormControl('', [Validators.required, Validators.pattern(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,30}$/) ,Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword  : new FormControl('', [Validators.required]),
      // subAdminID       : new FormControl('', [Validators.required]),
      email            : new FormControl('', [Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i)]),
      number           : new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/),Validators.maxLength(15)]),
      dashboard : new FormControl(),
      subadmin : new FormControl(),
      user : new FormControl(),
      event : new FormControl(),
      report : new FormControl(),
      community : new FormControl(),
      category : new FormControl(),
      transaction : new FormControl(),
      static : new FormControl(),
      content : new FormControl(),
    
    });
  }

  
//--------permissions check----//

  checkboxPermission(e) {
    this.eventdata = e.target.checked;
    console.log("sdfgsdfgsdf",this.eventdata)
  }

  getMasterRoleList() {
    this.spinner.show();
    this.service.getApi('/master-role').subscribe((success: any) => {
      if (success.statusCode === 200) {
        this.masterRoleList = success.data;
      } else {
        this.masterRoleList = [];
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.masterRoleList = [];
    })
  }
//------- add subadmin-------// 
  addSubadmin() {
    let data = {
      name : this.addSubadminForm.value.name,
      password : this.addSubadminForm.value.password,
      confirmPassword : this.addSubadminForm.value.confirmPassword,
      // kycImage: this.imageUrl,
      email: this.addSubadminForm.value.email,
      mobileNumber: this.addSubadminForm.value.number,
      image:this.imageUrl,
      dashboard : this.addSubadminForm.value.dashboard || this.boolData,
      subAdminManagement : this.addSubadminForm.value.subadmin || this.boolData,
      userManagement : this.addSubadminForm.value.user || this.boolData,
      eventManagement : this.addSubadminForm.value.event || this.boolData,
      reportManagement : this.addSubadminForm.value.report || this.boolData,
      communityManagement : this.addSubadminForm.value.community || this.boolData,
      categoryManagement : this.addSubadminForm.value.category || this.boolData,
      transactionManagement : this.addSubadminForm.value.transaction || this.boolData,
      staticContentManagement : this.addSubadminForm.value.static || this.boolData,
      contentPostManagement : this.addSubadminForm.value.content || this.boolData,
      
    }
    console.log("hgfhjgfhngfhjgfhjngfhngf",data);
    
    this.service.postApii('admin/addSubAdmin', data,  1).subscribe(success => {
      if(success.response_code == 200) {
        if(success.response_message == "This email already exists.") {
          this.service.error(success.response_message)
        }
        // 
        this.router.navigate(['/sub-admin'])
      }
      else {
        this.service.error(success.response_message)
        this.spinner.hide();
      }
    },(error)=>{
      this.spinner.hide();
      this.service.error('something went wrong')
    })
  }

  

  signUp(apireq) {
    this.service.signUp(apireq).then(success => {
      // this.service.success(this.addSubAdmin.value.name + ' added successfully');
      this.service.success('Sub admin have been added successfully.');
      this.router.navigate(['subadmin-management']);
      this.spinner.hide();
    }).catch(error => {
      this.service.error(error.message);
      this.spinner.hide();
    });
  }
//-------- file upload---//

  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }
  ValidateFileUploadkyc(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.kycUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'in',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChar() {
    this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode

  }

//------phone check country---//
  phoneCheckCountrys() {
    $("#loginPhoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      // autoHideDialCode: false,
    initialCountry: 'in',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChars() {
    this.isValidNumbers = $('#loginPhoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#loginPhoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
 console.log('check vent -=-=-', this.isValidNumbers)
  }

}
