import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

declare var $:any
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcementData: any=[];
  pageNumber:number=1;
  id: any;

  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.announcementList()
  }

  announcementList(){
    this.service.showSpinner();
    var url="notification/get-announcement-data";
    this.service.get(url).subscribe((res:any)=>{
      console.log('dfkjf', res);
      if(res.status==200){
        this.announcementData=res.data;
        this.service.hideSpinner();
      }
      
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  }
  delete(id){
    this.id=id;
    $('#deleteModal').modal('show')
  }
  deleteUser(){
    this.service.showSpinner();
    let data={}
    var url="notification/delete-announcement-data?announcementsId="+this.id;
    this.service.post(url, data).subscribe((res:any)=>{
      console.log('dff', res);
      if(res.status==200){
        this.service.hideSpinner();
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.announcementList();
        
      }
      
    }, err => {
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
      this.service.hideSpinner();
    })
  }

}
