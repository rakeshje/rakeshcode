import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';

@Component({
  selector: 'app-static-page-management',
  templateUrl: './static-page-management.component.html',
  styleUrls: ['./static-page-management.component.css']
})
export class StaticPageManagementComponent implements OnInit {
  staticData: any = [];

  constructor(private router : Router , private mainService : MainserviceService) { }

  ngOnInit() {
   this.viewContentList();
  }
  viewContentList(){
    this.mainService.showSpinner()
    this.mainService.getApi('static/staticList' ,1).subscribe((res)=>{
      console.log('response of user', res);
      this.mainService.hideSpinner()
      if(res.response_code == 200){
        this.staticData = res.result;
        console.log('static content',this.staticData);
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

  viewContent(type){
   this.router.navigateByUrl('/view-static-page/'+type)
  }

  editContent(id,type){
    this.router.navigateByUrl('/edit-static-page/'+id +'/'+type)
   }

}
