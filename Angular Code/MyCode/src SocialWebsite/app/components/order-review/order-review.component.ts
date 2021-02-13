import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  total = 0;
  address: any;
  customStripeForm: FormGroup;
  products: any;

  constructor(public activatedRoute: ActivatedRoute, public router: Router, public spinner: NgxSpinnerService, public server: ServerService) { }

  handler: any = null;

  ngOnInit() {
    this.total = JSON.parse(localStorage.getItem("cartTotal"));
    this.getAddress();
    this.loadStripe();
    this.initFields();
    this.products = JSON.parse(localStorage.getItem("products"));
  }

  openPay() {
    $('#changeStatus').modal('show');
  }

  initFields() {
    this.customStripeForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^(?!0+$)[0-9]{3,4}$/)]),
    })
  }

  get cardNumber(): any {
    return this.customStripeForm.get('cardNumber');
  }
  get expMonth(): any {
    return this.customStripeForm.get('expMonth');
  }
  get expYear(): any {
    return this.customStripeForm.get('expYear');
  }
  get cvv(): any {
    return this.customStripeForm.get('cvv');
  }

  changeAddress() {
    this.router.navigate(['/change-address']);
  }

  newAddress() {
    this.router.navigate(['/add-address']);
  }

  getAddress() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/getAddress', data).subscribe((res) => {
      this.spinner.hide();
      res.data.address.forEach(obj => {
        if (obj.addressType) {
          this.address = obj;
        }
      });
      if (!this.address)
        this.address = res.data.address[0];
    }, (err) => {
      this.spinner.hide();
    });
  }

  loadStripe() {

    if (!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-custom-form-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window['Stripe'].setPublishableKey('pk_test_CjmBCanngv0x5LK0eJ0C2FT7');
      }

      window.document.body.appendChild(s);
    }
  }

  pay(form) {

    if (!window['Stripe']) {
      this.server.showErrToast('Oops! Stripe did not initialize properly.');
      return;
    }

    // this.submitted = true;

    if (this.customStripeForm.invalid) {
      return;
    }

    // this.formProcess = true;
    if (!window['Stripe']) {
      this.server.showErrToast('Oops! Stripe did not initialize properly.');
      return;
    }
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber,
      exp_month: form.expMonth,
      exp_year: form.expYear,
      cvc: form.cvc
    }, (status: number, response: any) => {
      console.log(status, response);
      if (status != 200) {
        this.server.showErrToast(response.error.message);
        return;
      }
      this.createOrder(response.id, response.card.id);
      // this.submitted = false;
      // this.formProcess = false;
      // if (status === 200) {
      //   this.message = `Success! Card token ${response.card.id}.`;
      // } else {
      //   this.message = response.error.message;
      // }
    });
  }

  createOrder(token, cardId) {
    let data = {
      "userId": localStorage.getItem("user_id"),
      "product": this.products,
      // "cardId": cardId,
      // "cardNumber": this.customStripeForm.value.cardNumber,
      // "expMonth": this.customStripeForm.value.expMonth,
      // "expYear": this.customStripeForm.value.expYear,
      // "cvc": this.customStripeForm.value.cvv,
      "id": token,
      "totalCost": this.total
    }
    this.spinner.show();
    this.server.postApi('user/createOrder', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        $('#changeStatus').modal('hide');
        this.router.navigate(['/marketing-dashboard']);
        this.server.showSuccToast(res.responseMessage);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

}
