import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
declare var $: any
@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {
  userForm: FormGroup;
  ticketList: any = [];
  page: number = 1;
  limit: number = 20;
  totalRecords: string;
  pageNumber:number=1;
  arr : any = ['RESOLVED','INPROGRESS','CLOSED','CANCELLED']
  updatestatus:string;
  constructor(
    private router: Router, public service: MainService
  ) {

  }

  ngOnInit() {
    this.userForm = new FormGroup({
      'startdate': new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
      'searchText': new FormControl(''),
      'status': new FormControl(''),

    })
    this.getTicketList(this.page);
  }

  getTicketList(page) {
    this.page = page
    let request = {
      'page': this.page-1,
      'pageSize': this.limit
    }
    this.service.post(`static/search-and-filter-ticket-list`, request).subscribe((res: any) => {
      this.ticketList = res.data.list
      this.totalRecords = res.data.size;
    })
  }
  filterTicketList() {
    let startdate = Date.parse(this.userForm.value.startdate)
    let enddate = Date.parse(this.userForm.value.enddate)
    let search = this.userForm.controls.searchText.value;
    let status = this.userForm.controls.status.value;
    if(startdate && enddate && search && status){
    var request = {
      'fromDate': startdate,
      'search': search,
      'ticketStatus':status ,
      'toDate': enddate,
      'page': this.pageNumber,
      'pageSize': this.limit
    }
  }
    
  else if(startdate && enddate){
    var request1={
      'fromDate': startdate,
      'toDate': enddate,
      'page': this.page-1,
      'pageSize': this.limit
      
    }
  }
  else if(search){
   var request2={
    'search': search,
    'page': this.page-1,
      'pageSize': this.limit
   }
   
  }

  else if(status){
   var request3={
    'ticketStatus':this.userForm.controls.status.value,
    'page': this.page-1,
      'pageSize': this.limit
   }
   
   
  }
  console.log('j', request, request1,request2,request3);
    this.service.post(`static/search-and-filter-ticket-list`, request || request1 || request2 || request3).subscribe((res: any) => {
      this.ticketList = res.data.list
      console.log('hh', this.ticketList);
      
      this.totalRecords = res.data.size;
    })
    console.log('hitted');
    console.log(status);
  }

  updateTicketStatus(e ,id:number){
  status=e.target.value
   id =id
   let data={}
    this.service.post(`static/change-ticket-status?ticketId=${id}&ticketStatus=${status}`,data).subscribe((res:any)=>{
if(res.status=200){
this.service.toasterSucc(res.message)
}      
    })
  }

  // reset
  reset(){
    this.userForm.reset()
    this.getTicketList(this.page)
  }

  replyTicket() {
    this.router.navigate(['/reply-ticket'])
  }
  viewTicket() {
    this.router.navigate(['/view-ticket'])
  }

  //export User
  exportAsXLSX() {
    let dataArr = [];
    this.ticketList.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "Ticket ID": element.ticketId ? element.ticketId : '',
        "Customer Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Date": element.createdAt ? element.createdAt.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Ticket Management');
  }
}
