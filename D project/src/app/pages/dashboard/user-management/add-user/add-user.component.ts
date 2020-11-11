import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  customerData: any;
  customerLength: any;
  status: any;
  currentPage: any;
  itemPerPage: any;

  constructor(public mainService:MainService) { }

  ngOnInit() {
  }

  // get customer
  getCustomer(){
    this.mainService.showSpinner();
    let data ={
      'page':this.currentPage,
      'limit':this.itemPerPage,
    }
    this.mainService.postApi('admin/listUsers',data, 1).subscribe((res:any)=>{
      
      if(res.responseCode==200){
        this.mainService.hideSpinner();
        this.customerData=res.result.docs;
        this.customerLength=res.result.total;
        this.status=res.result.docs[0].status;
        console.log("f", this.customerLength);
        
      }
      
    },(error)=>{
      this.mainService.hideSpinner();
      this.mainService.errorToast('something went wrong')
    })
  }


}
