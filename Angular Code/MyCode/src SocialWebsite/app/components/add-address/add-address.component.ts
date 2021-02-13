import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addAddressForm: FormGroup;

  constructor(public spinner: NgxSpinnerService, public server: ServerService, public router: Router, public header: HeaderComponent) { }

  ngOnInit() {
    this.initFields();
  }

  initFields() {
    this.addAddressForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      contactNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]),
      landmark: new FormControl(''),
      alternateNumber: new FormControl('')
    })
  }

  get name(): any {
    return this.addAddressForm.get('name');
  }
  get contactNumber(): any {
    return this.addAddressForm.get('contactNumber');
  }
  get address(): any {
    return this.addAddressForm.get('address');
  }
  get city(): any {
    return this.addAddressForm.get('city');
  }
  get pincode(): any {
    return this.addAddressForm.get('pincode');
  }
  get landmark(): any {
    return this.addAddressForm.get('landmark');
  }
  get alternateNumber(): any {
    return this.addAddressForm.get('alternateNumber');
  }

  addAddress() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "name": this.addAddressForm.value.name,
      "contactNumber": this.addAddressForm.value.contactNumber,
      "addressDetail": this.addAddressForm.value.address,
      "city": this.addAddressForm.value.city,
      "pinCode": this.addAddressForm.value.pincode,
      "landMark": this.addAddressForm.value.landMark,
      "alternatePhoneNumber": this.addAddressForm.value.alternateNumber
    }
    this.spinner.show();
    this.server.postApi('user/addAddress', data).subscribe((res) => {
      this.spinner.hide();
      if(res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        this.router.navigate(['/order-review']);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  cancel() {
    this.router.navigate(['/order-review']);
  }

}
