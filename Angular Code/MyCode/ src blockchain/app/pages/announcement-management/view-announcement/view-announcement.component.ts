import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewAnnouncementComponent implements OnInit {
  id: any;
  editData: any;
  editImage: any;

  constructor(public route:Router, public service:MainService, public active:ActivatedRoute) 
  {
    this.active.params.subscribe((params)=>{
      this.id=params.id
    })
   }
  ngOnInit(): void {
    this.viewAnnouncement()
  }

  viewAnnouncement(){
    this.service.showSpinner();
    var url="notification/get-announcement-data?announcementsId="+this.id;
    this.service.get(url).subscribe((res:any)=>{
      console.log('dff', res);
      if(res.status==200){
        this.service.hideSpinner();
        this.editData=res.data[0],
        this.editImage=res.data[0].imageUrl
        
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
