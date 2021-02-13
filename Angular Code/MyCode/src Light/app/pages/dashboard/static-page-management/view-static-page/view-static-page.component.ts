import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-static-page',
  templateUrl: './view-static-page.component.html',
  styleUrls: ['./view-static-page.component.css']
})
export class ViewStaticPageComponent implements OnInit {
  paramData: any;
  data: any;
  editUrl: any;
  id: any;
  staticId: any;
  title: this;
  description: any;
  constructor(private service: MainService, public router:Router, private spinner: NgxSpinnerService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getParamData();
    console.log("df", this.paramData);
    
  }

  getParamData() {
    this.activatedRoute.params.subscribe(success => {

      this.paramData = success.title;
      this.id=success.id
      console.log("fdfgdfgdfgdfgdfgdfsgdsfgfg",this.paramData,this.id);
      
      // let url;
      // if(this.paramData=='Faqs'){
      //   this.router.navigate(['/faqs'])
      // }
      // else if(this.paramData!='') {
      //   url = 'static/viewStaticPage';
      // }
      this.getData();
    });
  }

  getData() {
    let apireq = {
      staticId : this.id
    };
    this.spinner.show();
    this.service.getApi('static/viewStaticPage/'+apireq, 1).subscribe((success: any) => {
      console.log("ffgfg",success);
      
      if (success.responseCode == 200) {
        this.data = success.result;
        this.spinner.hide();
      }
      
    }, error => {
      this.spinner.hide();

    });
  }
  editParamdata(data){
    // let editUrl = '/static/editStaticPage';
    // this.staticId = data._id;
    // this.title=data.title;
    // this.description=data.description;
    // this.editGetData(editUrl),
    this.router.navigate(['/edit-static-content'],{queryParams:{value:JSON.stringify(data)}})
  }


}
