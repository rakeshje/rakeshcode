import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  address = [];
  changedAddress = [];

  constructor(public server: ServerService, public spinner: NgxSpinnerService, public router: Router, public header: HeaderComponent) { }

  ngOnInit() {
    this.getAddress();
  }

  getAddress() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/getAddress', data).subscribe((res) => {
      this.spinner.hide();
      this.address = res.data.address;
      res.data.address.forEach(obj => {
        if(obj.addressType) {
          this.changedAddress = obj;
          this.changedAddress['personalId'] = this.changedAddress['_id'];
          delete this.changedAddress['_id'];
        }
      });
    }, (err) => {
      this.spinner.hide();
    });
  }

  editAddress(data) {
    this.router.navigate(['/edit-address'], {queryParams: {id:  data.personalId?data.personalId:data._id}});
  }

  changeAddress() {
    this.spinner.show();
    this.server.postApi('user/editAddress', this.changedAddress).subscribe((res) => {
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

  setDefault(data) {
    data.addressType = true;
    data.personalId = data._id;
    delete data._id;
    this.changedAddress = data;
  }

}
