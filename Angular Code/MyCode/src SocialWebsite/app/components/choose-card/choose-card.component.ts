import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerService } from 'src/app/services/server.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

declare let $: any;

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss']
})
export class ChooseCardComponent implements OnInit {
  cards = [];
  editCard = {expiryDate: {}, cvv: ""};
  myOptions: INgxMyDpOptions = {
    dateFormat: 'd/m/yyyy',
    todayBtnTxt: 'Today',
    sunHighlight: true,
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
  };
  cardId: any;
  addProductData: any;
  testRegex = /^(?!0+$)[0-9]{3,4}$/;
  validateCvv: boolean = true;
  productId: any;
  type: any;
  cardNumber: any;

  constructor(public router: Router, public spinner: NgxSpinnerService, public server: ServerService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";    
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+      
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });
    this.type = localStorage.getItem("addType");
    if(this.type == "market") {
    this.addProductData = JSON.parse(localStorage.getItem("newProduct"));
    } else if(this.type == 'bidding'){
      this.addProductData = JSON.parse(localStorage.getItem("product_Details"));
    } else if(this.type == 'advertisement') {
      this.addProductData = this.server.addDetail
    }
    // if(this.activatedRoute.snapshot.queryParams.addproductForm)
    // this.addProductData = JSON.parse(this.activatedRoute.snapshot.queryParams.addproductForm[2]);
    this.viewCards();
  }

  addBank() {
    this.router.navigate(['bank/Add_Bank_Details'], { queryParams: { type: 'post-product' } });
  }

  viewCards() {
    let data = {
      "userId": localStorage.getItem("user_id")
    }
    this.spinner.show();
    this.server.postApi('user/viewCard', data).subscribe((res) => {
      this.spinner.hide();
      if(res.responseCode == 200) {
        this.cards = res.result;
        this.cards.forEach(obj => {
          obj.newNumber = obj.cardNumber.replace(/.(?=.{4})/g, 'x');
        })
      }
    }, (err) => {
      this.spinner.hide();
    })
  }

  chooseCard(event, card) {
    this.cardId = event.target.value;
    this.cardNumber = card.cardNumber;
    var ind = this.cards.findIndex(x => x._id == event.target.value);
    if(ind > -1) {
      var days = this.cards[ind].expiryDate.split("/");
      this.editCard.expiryDate = {date: { year: days[2], month: days[1], day: days[0] } };
      // this.editCard.cvv = this.cards[ind].cvvNumber;
    }
    this.editCard.cvv = "";
    $("#chooseCard").modal('show');
  }

  addCard() {
    if(this.type == "market") {
      this.marketProduct();
    } else if(this.type == 'bidding'){
      this.biddingProduct();
    } else if(this.type == 'advertisement') {
      this.addAdvertisement();
    }
  }

  addAdvertisement() {
    this.addProductData['cardId'] = this.cardId;
    this.addProductData['cvvNumber'] = this.editCard.cvv;
    this.addProductData['cardNumber'] = this.cardNumber;
    this.spinner.show();
    this.server.postApi('user/addAdv', this.addProductData).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        $("#chooseCard").modal('hide');
        $('#successModal').modal({backdrop: 'static', keyboard: false});
        localStorage.removeItem("addDetail");
        localStorage.removeItem("addType");
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  marketProduct() {
    this.addProductData['cardId'] = this.cardId;
    this.spinner.show();
    this.server.postApi('user/addProduct', this.addProductData).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        // this.server.showSuccToast(res.responseMessage);
        $("#chooseCard").modal('hide');
        $('#successModal').modal({backdrop: 'static', keyboard: false});
        this.productId = res.result._id;
        localStorage.removeItem("category");
        localStorage.removeItem("subCategory");
        localStorage.removeItem("newProduct");
        localStorage.removeItem("addType");
        // this.router.navigate(['/marketing-dashboard']);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  biddingProduct(){
    let data = {
      "userId": localStorage.getItem("user_id"),
      "categoryId": this.addProductData.categoryId,
      "subCategoryId": this.addProductData.subCategoryId,
      "productImages": this.addProductData.productImages,
      "auctionProductName": this.addProductData.auctionProductName,
      "auctionProductDescription": this.addProductData.auctionProductDescription,
      "productInitialCost": this.addProductData.productInitialCost,
      "country": this.addProductData.country,
      "state": this.addProductData.state,
      "location": this.addProductData.location,
      "cardId": this.cardId,
      "startTime": this.addProductData.startTime,
      "endTime": this.addProductData.endTime
    }
    // this.spinner.show();
    console.log("Bidding product apireq=-=--=->",data);
    this.server.postApi('user/sellOnAuction', data).subscribe((res) => {
      this.spinner.hide();
      if (res.responseCode == 200) {
        this.server.showSuccToast(res.responseMessage);
        $("#chooseCard").modal('hide');
        $("#successModal").modal('show');
        this.productId = res.biddingData._id;
        // this.router.navigate(['/bidding']);
      } else {
        this.server.showErrToast(res.responseMessage);
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  addNew() {
    $("#successModal").modal('hide');
    if(this.type == "market"){
    this.router.navigate(['/marketing-dashboard']);
  }
    else if(this.type == 'bidding'){
    this.router.navigate(['/bidding']);
  }
    else if(this.type == 'advertisement'){
    this.router.navigate(['/view-advertisement']);
  }
}

  navigate(){
    if(this.type == "market"){
    this.router.navigate(['/marketing-dashboard']);
  }
    else if(this.type == 'bidding'){
    this.router.navigate(['/bidding']);
    }
    else if(this.type == 'advertisement'){
    this.router.navigate(['/view-advertisement']);
  }
  }

  testCvv() {
    if(this.testRegex.test(this.editCard.cvv)) {
      this.validateCvv = true;
    } else {
      this.validateCvv = false;
    }
  }

  cancel(val) {
    var ele = document.getElementById(this.cardId);
    ele['checked'] = false;
    $(`#${val}`).modal('hide');
  }

}
