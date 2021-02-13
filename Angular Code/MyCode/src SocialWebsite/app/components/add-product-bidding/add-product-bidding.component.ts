import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ServerService } from 'src/app/services/server.service';

declare let $: any;
declare var google: any;

@Component({
  selector: 'app-add-product-bidding',
  templateUrl: './add-product-bidding.component.html',
  styleUrls: ['./add-product-bidding.component.scss']
})
export class AddProductBiddingComponent implements OnInit {

  newProductForm: FormGroup;
  fileData: any = "assets/images/Layer 139.png";
  fileName: any;
  file: any;
  countryList = [];
  stateList = [];
  showSize: boolean = false;
  selectedSize = [];
  files = [];
  currentTime : any;
  startTime:any;
  endTime:any
  currentDate:any=new Date();

  constructor(public activatedRoute: ActivatedRoute, public server: ServerService, public spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.initFields();
    this.getCountry();
    this.currentTime = new Date().getTime();
    console.log("current Time -: ", this.currentTime);
  }

  initFields() {
    this.newProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      // quantity: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      cost: new FormControl('', [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      // city: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      startTime: new FormControl('',[Validators.required]),
      endTime: new FormControl('',[Validators.required])
    },{ validators : this.dateTimeValidation('startTime','endTime')})
  }


  //end date validation
  dateTimeValidation(startTime,endTime){
    return (group: FormGroup): {[key: string]: any} => {
      let st = group.controls[startTime];
      let et = group.controls[endTime];
      if (st.value > et.value) {
        return {
          dates: "Start date time should be less then the end date time"
        };
      }
      return {};
    }
  }


  get name(): any {
    return this.newProductForm.get('name');
  }
  get image(): any {
    return this.newProductForm.get('image');
  }
  get description(): any {
    return this.newProductForm.get('description');
  }
  get quantity(): any {
    return this.newProductForm.get('quantity');
  }
  get cost(): any {
    return this.newProductForm.get('cost');
  }
  get country(): any {
    return this.newProductForm.get('country');
  }
  get state(): any {
    return this.newProductForm.get('state');
  }
  // get city(): any {
  //   return this.newProductForm.get('city');
  // }
  get location(): any {
    return this.newProductForm.get('location');
  }
  get size(): any {
    return this.newProductForm.get('size');
  }

  handleAddressChange(location: Address) {
    this.newProductForm.controls['location'].setValue(location.formatted_address);
  }

  upload(event) {
    this.file = event.target.files[0];
    var reader = new FileReader()
    reader.onload = (e) => {
      this.files.push(e.target['result']);
      this.fileData = e.target['result'];
      this.newProductForm.controls['image'].setValue(this.files);
    }
    reader.readAsDataURL(event.target.files[0]);
    this.fileName = event.target.files[0].name;
  }

  postProduct() {
    $('#postNewProduct').modal('show');
  }

  getCountry() {
    this.spinner.show();
    this.server.getApi('user/getAllCountries').subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.countryList = res.result;
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  selectState(event) {
    let data = {
      "countryId": event.target.value
    }
    this.spinner.show();
    this.server.postApi('user/getStateCountriesWise', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.stateList = res.result.states;
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  chooseSize(event) {
    this.showSize = event.target.checked;
    if (event.target.checked) {
      this.newProductForm.get('size').setValidators(Validators.required);
      this.newProductForm.get('size').updateValueAndValidity();
    } else {
      this.newProductForm.get('size').clearValidators();
      this.newProductForm.get('size').updateValueAndValidity();
    }
  }

  chooseProductSize(event) {
    if (event.target.checked)
      this.selectedSize.push(event.target.value);
    else {
      var ind = this.selectedSize.findIndex(x => x == event.target.value);
      if (ind > -1) {
        this.selectedSize.splice(ind, 1);
      }
    }
    this.newProductForm.controls['size'].setValue(this.selectedSize);
  }

  submitCard() {
    $('#postNewProduct').modal('hide');
    let obj ={
      "subCategoryId" : this.activatedRoute.snapshot.queryParams.ids[0],
      "categoryId" : this.activatedRoute.snapshot.queryParams.ids[1],
      "productImages": this.newProductForm.value.image,
      "auctionProductName":this.newProductForm.value.name,
      "auctionProductDescription": this.newProductForm.value.description,
      "productInitialCost":this.newProductForm.value.cost,
      "country": this.newProductForm.value.country,
      "state": this.newProductForm.value.state,
      "location": this.newProductForm.value.location,
      "startTime":this.newProductForm.value.startTime ,
      "endTime": this.newProductForm.value.endTime
    }
    localStorage.setItem('product_Details',JSON.stringify(obj));
    localStorage.setItem("addType", "bidding");
    // this.router.navigate(['/choose-card'], {queryParams: {addproductForm: [this.activatedRoute.snapshot.queryParams.ids[1],this.activatedRoute.snapshot.queryParams.ids[0], JSON.stringify(this.newProductForm.value)]}});
    this.router.navigate(['/choose-card'])
  }

  addProductFinal() {
  //   let data = {
  //     "userId":"5ddf59467468b84c413615a6",
  //     "categoryId":"5d9c189aad76494bf5ee2935",
  //     "subCategoryId":"5da6f900622c6e3c0f1342f8",
  //     "auctionProductName":"pen",
  //     "auctionProductDescription":"nice product",
  //     "productImages":["data:image/png;base64,"],
  //     "cardId":"5dedf47b02e2fc029ade392b",
  //     "productInitialCost":4000,
  //     "country":"india",
  //     "state":"bihar",
  //     "city":"katihar",
  //     "location":"amdabad",
  //     "startTime":1575526830708,
  //     "endTime":1575958723245
  //   }
    
  //   this.spinner.show();
  //   this.server.postApi('user/addProduct', data).subscribe((res) => {
  //     this.spinner.hide();
  //     if (res.responseCode == 200) {
  //       this.server.showSuccToast(res.responseMessage);
  //       this.router.navigate(['/bidding']);
  //     } else {
  //       this.server.showErrToast(res.responseMessage);
  //     }
  //   }, (err) => {
  //     this.spinner.hide();
  //     console.log(err);
  //   });
  // }

  // removeImage(file) {
  //   var ind = this.files.findIndex(x => x == file);
  //   if (ind > -1) {
  //     this.files.splice(ind, 1);
  //     this.newProductForm.controls['image'].setValue(this.files);
  //     if (this.files.length == 0)
  //       this.fileData = "assets/images/Layer 139.png";
  //   }
  }

}
