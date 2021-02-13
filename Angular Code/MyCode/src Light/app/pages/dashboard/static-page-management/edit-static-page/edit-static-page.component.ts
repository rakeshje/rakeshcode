import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-static-page',
  templateUrl: './edit-static-page.component.html',
  styleUrls: ['./edit-static-page.component.css']
})
export class EditStaticPageComponent implements OnInit {
  editstaticContentForm:FormGroup
  paramData: any;
  editUrl: any;
  apireq: any;
  permission: any = [];
  data: any;
  staticId: any;
  title: any;
  description: any;
  Title: any;
  Description: any;
  constructor(private service: MainService, public router:Router, private spinner: NgxSpinnerService, private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.data = JSON.parse(params.value)
      this.staticId = this.data._id;
      this.title = this.data.title;
      this.description = this.data.description;
      console.log("8888",this.title);
    })
  }

  ngOnInit() {
    this.editFormValidation();
    this.editStatic();
  }

  editFormValidation(){
    this.editstaticContentForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }
  editStatic() {
    if(this.title=='faqs'){
      this.router.navigate(['/faqs'])
    }
    else{
    let apireq = {
      staticId: this.staticId,
      title: this.title,
      description: this.description
    }
    console.log("gm",apireq);
    
    this.spinner.show();
    this.service.putApi('static/editStaticPage', apireq, 1).subscribe((success: any) => {
      console.log("ffgfg", success);

      if (success.responseCode == 200) {
        this.data = success.result;
        this.Title=success.result.title,
        this.Description=success.result.description
        // this.service.success(success.response_message)
        this.editstaticContentForm.patchValue({
          title:this.Title,
          description:this.Description
        })
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();

    });
  }
  }

  updateStatic(){
    let apireq = {
      staticId: this.staticId,
      title: this.editstaticContentForm.value.title,
      description: this.editstaticContentForm.value.description
    }
    console.log("gm",apireq);
    
    this.spinner.show();
    this.service.putApi('static/editStaticPage', apireq, 1).subscribe((success: any) => {
      console.log("ffgfg", success);

      if (success.responseCode == 200) {
        this.data = success.result;
        this.router.navigate(['/static-page-management'])
        // this.Title=success.result.title,
        // this.Description=success.result.description
        // this.service.success(success.response_message)
        // this.editstaticContentForm.patchValue({
        //   title:this.Title,
        //   description:this.Description
        // })
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();

    });
  }

}
