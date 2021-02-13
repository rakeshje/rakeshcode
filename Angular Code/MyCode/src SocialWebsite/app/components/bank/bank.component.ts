import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';



@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
    currTab :string = 'Bank_Details'
    myOptions: INgxMyDpOptions = {
        dateFormat: 'd/m/yyyy',
        todayBtnTxt: 'Today',
        sunHighlight: true,
        disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
    };
    countryCodeArr: any=[];
    stateUnfilteredArr: any=[];
    cityUnfilteredArr: any=[];
    stateArr: any=[];
    cityArr: any=[];
    addBankDetailsForm: FormGroup;
    phoneCodeArr: any=[];
    addBank: any;
    disableCheck: boolean=false;
    page: number;
    total: number;
    bankDetailsArr: any=[];
    editBankDetails: any;
    editBankDetailsForm: FormGroup;
    viewDetails: boolean=false;
    updateBank: any;
    selectedData: any={};
    postProduct: boolean = false;
    config: {
      displayKey: string; //if objects array passed which key to be displayed defaults to description
        search: boolean; //true/false for the search functionlity defaults to false,
        //true/false for the search functionlity defaults to false,
        height: string; //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: string; // text to be displayed when no item is selected defaults to Select,
        // text to be displayed when no item is selected defaults to Select,
        customComparator: () => void; // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: any; // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: string; // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: string; // text to be displayed when no items are found while searching
        // text to be displayed when no items are found while searching
        searchPlaceholder: string; // label thats displayed in search input,
        // label thats displayed in search input,
        searchOnKey: string; // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      };
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
    constructor(public server:ServerService, private router:Router, public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if(this.activatedRoute.snapshot.params.id)
        this.currTab = this.activatedRoute.snapshot.params.id;
        if(this.activatedRoute.snapshot.queryParams.type == "post-product")
        this.postProduct = true;
        this.checkValidAddBankDetailsForm()
        this.checkValidEditBankDetailsForm()
        this.getCountryJson()
        this.getStateJson()
        this.getCityJson()
        this.getDialCodesJson()
        this.viewBankDetails()
        this.config = {
          displayKey:"name", //if objects array passed which key to be displayed defaults to description
          search:true ,//true/false for the search functionlity defaults to false,
          height: '292px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
          placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
          customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
          limitTo: this.countryCodeArr.length ,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
          moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
          noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
          searchPlaceholder:'Search' ,// label thats displayed in search input,
          searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
        }

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

    // to switch tab
    switchTab(tab) {
      this.router.navigateByUrl('bank/' + tab)
        this.currTab =tab
        this.page = 1
        this.total = 0
        if(tab== 'Bank_Details'){
          this.viewBankDetails();
        }
    }




    /** to check space */
    toCheckSpace(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode == 32) {
            evt.preventDefault()
        }else {
            return true;
        }
      }  

      /** to get state country list  */
    getCountryJson() {
      this.server.getCountryJson().subscribe((res)=>{
        res.forEach(element => {
          element['type']= 'country'
        });
        this.countryCodeArr = res
        //console.log("country list====>>>",this.countryCodeArr)
      })
    }

    // to get state json
    getStateJson() {
      this.server.getStateJson().subscribe((res)=>{
        res.forEach(element => {
          element['type']= 'state'
        });
        this.stateUnfilteredArr = res
        //console.log("state list====>>>",this.stateUnfilteredArr)
      })
    }

    // to get city json
    getCityJson() {
      this.server.getCityJson().subscribe((res)=>{
        res.forEach(element => {
          element['type']= 'city'
        });
        this.cityUnfilteredArr = res
        //console.log("city list====>>>",this.cityUnfilteredArr)
      })
    }

    selectionChanged(event){
      console.log(this.addBankDetailsForm.value)
      // console.log(event)
      // when wrong event
      if(event.isTrusted) {
        return;
      }
      if(event){
        if(event.value.type == 'country') {
          this.stateArr=[]
          this.stateUnfilteredArr.forEach(element => {
            if(element['country_id'] == event.value.id) {
              console.log('called')
              this.stateArr.push(element)
            }
          });
        }else if(event.value.type == 'state') {
          this.cityArr=[]
          this.cityUnfilteredArr.forEach(element => {
            if(element['state_id']== event.value.id){
              this.cityArr.push(element)
            }
          });
        }
  
      }
      
      console.log(this.stateArr)
      
    }

      /** to get phone dial codes  */
      getDialCodesJson() {
      this.server.getDialCodesJson().subscribe((res)=>{
        this.phoneCodeArr = res
       //console.log("code list====>>>",this.phoneCodeArr)
      })
    }



      // to get Selected State
    getSelectedState(event) {
        console.log(event.target.value)
        let name =  event.target.value
        if(name) {
          let index = this.countryCodeArr.findIndex(x=>x.name == name)
          let id = this.countryCodeArr[index]['id'];
  
          this.stateUnfilteredArr.forEach(element => {
            if(element['country_id'] == id) {
              this.stateArr.push(element)
                }
             });
          }else {
            this.stateArr = []
          }
        }
  
        // To get Selected City
        getSelectedCity(event){
          console.log(event.target.value)
          let cityName = event.target.value
          if(cityName){
            let index = this.stateArr.findIndex(x=>x.name == cityName)
            let id = this.stateArr[index] ['id'];
            this.cityUnfilteredArr.forEach(element => {
              if(element['state_id']== id){
                this.cityArr.push(element)
              }
              
            });
          }else{
            this.cityArr=[]
          }
        }

        // to Check valid add bank details form
    checkValidAddBankDetailsForm() {
        this.addBankDetailsForm = new FormGroup({
            accountHolderFirstName: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
            accountHolderLastName: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
            accountHolderBankName: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
            accountHolderZipCode: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/)]),
            accountHolderEmail: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
            //accountHolderAccNumber: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern(/^[0-9]*$/)]),
            accountHolderCvvNumber: new FormControl('', [Validators.required,Validators.pattern(/^(?!0+$)[0-9]{3,4}$/)]),
            accountHolderCountry: new FormControl('',),
            accountHolderState: new FormControl('',),
            accountHolderCity: new FormControl('',),
            accountHolderAddress: new FormControl('',[Validators.required]),
            accountHolderContact: new FormControl('',[Validators.required, Validators.minLength(5),Validators.pattern(/^[0-9]*$/)]),
            accountHolderCountryCode:new FormControl('',[Validators.required]),
            accountHolderExpiryDate:new FormControl('',[Validators.required]),
            accountHolderCardNumber:new FormControl('',[Validators.required, Validators.minLength(16),Validators.maxLength(16),Validators.pattern(/^[0-9]*$/)]),
    
          
        })
      }

      /** to get the value of add bank details form field  */

    get accountHolderFirstName(): any {
        return this.addBankDetailsForm.get('accountHolderFirstName');
      }
      get accountHolderLastName(): any {
        return this.addBankDetailsForm.get('accountHolderLastName');
      }
      get accountHolderBankName(): any {
        return this.addBankDetailsForm.get('accountHolderBankName');
      }
      get accountHolderZipCode(): any {
        return this.addBankDetailsForm.get('accountHolderZipCode');
      }
      get accountHolderEmail(): any {
        return this.addBankDetailsForm.get('accountHolderEmail');
      }
      get accountHolderCvvNumber(): any {
        return this.addBankDetailsForm.get('accountHolderCvvNumber');
      }
      get accountHolderCountry(): any {
        return this.addBankDetailsForm.get('accountHolderCountry');
      }
      get accountHolderState(): any {
        return this.addBankDetailsForm.get('accountHolderState');
      }
      get accountHolderCity(): any {
        return this.addBankDetailsForm.get('accountHolderCity');
      }
      get accountHolderAddress(): any {
        return this.addBankDetailsForm.get('accountHolderAddress');
      }
      get accountHolderContact(): any {
        return this.addBankDetailsForm.get('accountHolderContact');
      }
      get accountHolderCountryCode(): any {
        return this.addBankDetailsForm.get('accountHolderCountryCode');
      }
      get accountHolderExpiryDate(): any {
        return this.addBankDetailsForm.get('accountHolderExpiryDate');
      }
      get accountHolderCardNumber(): any {
        return this.addBankDetailsForm.get('accountHolderCardNumber');
      }


      //To Add Bank Details
    addBankDetails(){
      
      if(this.addBankDetailsForm.valid) {

      let data ={
          "userId": localStorage.getItem('user_id'),
          "firstName": this.addBankDetailsForm.value.accountHolderFirstName,
          "lastName": this.addBankDetailsForm.value.accountHolderLastName,
          "email": this.addBankDetailsForm.value.accountHolderEmail,
          "phoneNumber": this.addBankDetailsForm.value.accountHolderContact,
          "countryCode": this.addBankDetailsForm.value.accountHolderCountryCode.dial_code,
          "bankName": this.addBankDetailsForm.value.accountHolderBankName,
          
          "cardNumber": this.addBankDetailsForm.value.accountHolderCardNumber,
          "expiryDate": this.addBankDetailsForm.value.accountHolderExpiryDate.formatted,
          "cvvNumber": this.addBankDetailsForm.value.accountHolderCvvNumber,
          "country": this.addBankDetailsForm.value.accountHolderCountry.name,
          "address": this.addBankDetailsForm.value.accountHolderAddress,
          "city": this.addBankDetailsForm.value.accountHolderCity.name,
          "state": this.addBankDetailsForm.value.accountHolderState.name,
          "zipCode": this.addBankDetailsForm.value.accountHolderZipCode,
          
      }     
      if(navigator.onLine) {
          this.addBank = this.server.postApi('user/addcard', data).subscribe((res)=> {
              this.addBank.unsubscribe()
              if(res.responseCode == 200) {
                if(localStorage.getItem('bank')) {
                  this.router.navigateByUrl('jobs/addJob') 
                }
                  this.server.showSuccToast('Bank Added Successfully')
                  this.addBankDetailsForm.reset()
                  //this.router.navigate(['/bank/Bank_Details'])
                  //this.currTab == 'Bank_Details'
                  console.log(this.postProduct)
                  if(this.postProduct) {
                    this.router.navigate(['/choose-card']);
                  } else {
                    this.switchTab('Bank_Details')
                  }
              }
          })    
        } else {
            this.server.showWarnToast('Check internet connection!')
        }
      }
      
    }

    //To reset Add bank details form
    addBankDetailsFormReset(){
      this.addBankDetailsForm.reset()
    }
     
    //To reset Update Bank Details Form
    resetUpdateBankDetailsForm(){
      this.editBankDetailsForm.reset()
    }

    //To view bank details
    viewBankDetails(){
      let data={
        "userId": localStorage.getItem('user_id'),
      }
      if(navigator.onLine) {
        this.addBank = this.server.postApi('user/viewcard', data).subscribe((res)=> {
            this.addBank.unsubscribe()
            if(res.responseCode == 200) {
              this.bankDetailsArr=res.result
              console.log("-------->>>>",this.bankDetailsArr)
                //this.server.showSuccToast('Added Successfully')
                
            
            }
        })    
      } else {
          this.server.showWarnToast('Check internet connection!')
      }
    }


     // to Check valid add bank details form
     checkValidEditBankDetailsForm() {
      this.editBankDetailsForm = new FormGroup({
          accountHolderFirstName1: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
          accountHolderLastName1: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
          accountHolderBankName1: new FormControl('', [Validators.required,Validators.pattern(/^[a-z ,.'-]+$/i)]),
          accountHolderZipCode1: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/)]),
          accountHolderEmail1: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i)]),
          //accountHolderAccNumber: new FormControl('',[Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern(/^[0-9]*$/)]),
          //accountHolderCvvNumber1: new FormControl('', [Validators.required,Validators.pattern(/^\d{3}$/)]),
          accountHolderCountry1: new FormControl('',),
          accountHolderState1: new FormControl('',),
          accountHolderCity1: new FormControl('',),
          accountHolderAddress1: new FormControl('',[Validators.required]),
          accountHolderContact1: new FormControl('',[Validators.required, Validators.minLength(5),Validators.pattern(/^[0-9]*$/)]),
          accountHolderCountryCode1:new FormControl('',[Validators.required]),
          accountHolderExpiryDate1:new FormControl('',[Validators.required]),
          accountHolderCardNumber1:new FormControl('',[Validators.required, Validators.minLength(16),Validators.maxLength(16),Validators.pattern(/^[0-9]*$/)]),
        
      })
    }

    /** to get the value of add bank details form field  */

    get accountHolderFirstName1(): any {
      return this.editBankDetailsForm.get('accountHolderFirstName1');
    }
    get accountHolderLastName1(): any {
      return this.editBankDetailsForm.get('accountHolderLastName1');
    }
    get accountHolderBankName1(): any {
      return this.editBankDetailsForm.get('accountHolderBankName1');
    }
    get accountHolderZipCode1(): any {
      return this.editBankDetailsForm.get('accountHolderZipCode1');
    }
    get accountHolderEmail1(): any {
      return this.editBankDetailsForm.get('accountHolderEmail1');
    }
    // get accountHolderCvvNumber1(): any {
    //   return this.editBankDetailsForm.get('accountHolderCvvNumber1');
    // }
    get accountHolderCountry1(): any {
      return this.editBankDetailsForm.get('accountHolderCountry1');
    }
    get accountHolderState1(): any {
      return this.editBankDetailsForm.get('accountHolderState1');
    }
    get accountHolderCity1(): any {
      return this.editBankDetailsForm.get('accountHolderCity1');
    }
    get accountHolderAddress1(): any {
      return this.editBankDetailsForm.get('accountHolderAddress1');
    }
    get accountHolderContact1(): any {
      return this.editBankDetailsForm.get('accountHolderContact1');
    }
    get accountHolderCountryCode1(): any {
      return this.editBankDetailsForm.get('accountHolderCountryCode1');
    }
    get accountHolderExpiryDate1(): any {
      return this.editBankDetailsForm.get('accountHolderExpiryDate1');
    }
    get accountHolderCardNumber1(): any {
      return this.editBankDetailsForm.get('accountHolderCardNumber1');
    }


    //To search particular card
    editCard(result){
      this.viewDetails = true
      //console.log(this.editBankDetailsForm.value)
      //console.log(result.country)

      // to push state in arr for specific country
      let index = this.countryCodeArr.findIndex(x=>x.name == result.country)
      let id = this.countryCodeArr[index]['id'];
  
      this.stateUnfilteredArr.forEach(element => {
        if(element['country_id'] == id) {
          this.stateArr.push(element)
          }
        });   
        
        let index2 = this.stateArr.findIndex(x=>x.name == result.state)
        let id2= this.stateArr[index2]['id'];
  
        this.cityUnfilteredArr.forEach(element => {
          if(element['state_id'] == id2) {
            this.cityArr.push(element)
          }
        });
        
      // this.router.navigateByUrl('')
      let arr = result.expiryDate.split('/')
                    let val = arr[1]+ '/'+ arr[0]+ '/'+ arr[2]
                    let dob = new Date(val)
                    let mydate = {
                      date: {
                          year: dob.getFullYear(),
                          month: dob.getMonth() + 1,
                          day: dob.getDate()}
                      }
                      console.log("MY DAte======>>>>>>>>>>>"+mydate)
              this.editBankDetailsForm.patchValue({
                'accountHolderFirstName1':result.firstName,
                'accountHolderLastName1':result.lastName,
                'accountHolderEmail1':result.email,
                'accountHolderContact1':result.phoneNumber,
                'accountHolderCountryCode1':result.countryCode,
                'accountHolderBankName1':result.bankName,
                'accountHolderCardNumber1':result.cardNumber,
                //'accountHolderExpiryDate1':result.expiryDate.formatted,
                //'accountHolderCvvNumber1':result.cvvNumber,
                'accountHolderAddress1':result.address,
                'accountHolderZipCode1':result.zipCode,
                'accountHolderCity1':result.city,
                'accountHolderCountry1':result.country,
                'accountHolderState1':result.state,
              }),
              this.editBankDetailsForm.patchValue({"accountHolderExpiryDate1": mydate});
              this.selectedData = result
              console.log(this.selectedData)
              
    }

    //To reset editBankDetailsForm
    resetBankDetailsForm(){
      this.editBankDetailsForm.reset()
      this.router.navigate(['/bank'])
    }

    //To update bank details
      updateBankDetails(){
        if(this.editBankDetailsForm.valid) {

          let data ={
              "userId": localStorage.getItem('user_id'),
              "cardId": this.selectedData['_id'],
              "firstName": this.editBankDetailsForm.value.accountHolderFirstName1,
              "lastName": this.editBankDetailsForm.value.accountHolderLastName1,
              "email": this.editBankDetailsForm.value.accountHolderEmail1,
              "phoneNumber": this.editBankDetailsForm.value.accountHolderContact1,
              "countryCode": this.editBankDetailsForm.value.accountHolderCountryCode1.dial_code,
              "bankName": this.editBankDetailsForm.value.accountHolderBankName1,
              
              "cardNumber": this.editBankDetailsForm.value.accountHolderCardNumber1,
              "expiryDate": this.editBankDetailsForm.value.accountHolderExpiryDate1.formatted,
              //"cvvNumber": this.editBankDetailsForm.value.accountHolderCvvNumber1,
              "country": this.editBankDetailsForm.value.accountHolderCountry1.name,
              "address": this.editBankDetailsForm.value.accountHolderAddress1,
              "city": this.editBankDetailsForm.value.accountHolderCity1.name,
              "state": this.editBankDetailsForm.value.accountHolderState1.name,
              "zipCode": this.editBankDetailsForm.value.accountHolderZipCode1,
              
          }     
          if(navigator.onLine) {
              this.updateBank = this.server.postApi('user/editcard', data).subscribe((res)=> {
                  this.updateBank.unsubscribe()
                  if(res.responseCode == 200) {
                      this.server.showSuccToast('Updated Successfully')
                      this.editBankDetailsForm.reset()
                      this.viewDetails = false
                      this.switchTab('Bank_Details')
                    }
              })    
            } else {
                this.server.showWarnToast('Check internet connection!')
            }
          }
          
      }

      // To make payment
      openCheckout() {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_fTCoEtnBSWKv2vhxYaa3suSk0056yeisHR',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
          }
        });
    
        handler.open({
          name: 'Demo Site',
          description: '2 widgets',
          amount: 2000
        });
    
      }
    
}
