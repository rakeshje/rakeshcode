import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-static-page',
  templateUrl: './view-static-page.component.html',
  styleUrls: ['./view-static-page.component.css']
})
export class ViewStaticPageComponent implements OnInit {
  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };
  form : FormGroup;
  editorValue;
  type: any;
  staticData: any;
  constructor(private mainService : MainserviceService , private activatedroute : ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.params.subscribe((res)=>{
      this.type = res.type;
      console.log('type', this.type);

    })
    this.viewContentList();
   }
   viewContentList(){
    this.mainService.showSpinner()
     this.mainService.getApi('static/viewStaticPage/'+this.type ,1).subscribe((res)=>{
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

}
