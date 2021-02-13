import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  id: any;
  userAddress: any;
  editAddressForm: FormGroup;

  constructor(public server: ServerService, public activatedRoute: ActivatedRoute, public spinner: NgxSpinnerService, public router: Router, public header: HeaderComponent) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.initFields();
    this.getAddress();
  }

  getAddress() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/getAddress', data).subscribe((res) => {
      this.spinner.hide();
      res.data.address.forEach(obj => {
        if(obj._id == this.id) {
          this.userAddress = obj;
          this.patchValue();
        }
      });
    }, (err) => {
      this.spinner.hide();
    });
  }

  initFields() {
    this.editAddressForm = new FormGroup({
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
    return this.editAddressForm.get('name');
  }
  get contactNumber(): any {
    return this.editAddressForm.get('contactNumber');
  }
  get address(): any {
    return this.editAddressForm.get('address');
  }
  get city(): any {
    return this.editAddressForm.get('city');
  }
  get pincode(): any {
    return this.editAddressForm.get('pincode');
  }
  get landmark(): any {
    return this.editAddressForm.get('landmark');
  }
  get alternateNumber(): any {
    return this.editAddressForm.get('alternateNumber');
  }

  patchValue() {
    this.editAddressForm.patchValue({
      name: this.userAddress.name,
      contactNumber: this.userAddress.contactNumber,
      address: this.userAddress.addressDetail,
      city: this.userAddress.city,
      pincode: this.userAddress.pinCode,
      landmark: this.userAddress.landMark,
      alternateNumber: this.userAddress.alternatePhoneNumber
    })
  }

  editAddress() {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "personalId": this.id,
      "name": this.editAddressForm.value.name,
      "contactNumber": this.editAddressForm.value.contactNumber,
      "addressDetail": this.editAddressForm.value.address,
      "city": this.editAddressForm.value.city,
      "pinCode": this.editAddressForm.value.pincode,
      "landMark": this.editAddressForm.value.landmark,
      "alternatePhoneNumber": this.editAddressForm.value.alternateNumber
    }
    this.spinner.show();
    this.server.postApi('user/editAddress', data).subscribe((res) => {
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
    this.router.navigate(['/change-address']);
  }

}
