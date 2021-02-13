import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainserviceService } from 'src/app/pages/provider/mainservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-static-page',
  templateUrl: './edit-static-page.component.html',
  styleUrls: ['./edit-static-page.component.css']
})
export class EditStaticPageComponent implements OnInit {
  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };
  form : FormGroup;
  editorValue;
  type: any;
  staticData: any;
  staticId: any;
  constructor(private mainService : MainserviceService , private router : Router,
    private activatedroute : ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'Title' : new FormControl('',[Validators.required,Validators.pattern(/^[^0-9!@#$%^*()_+|<>,;'"]*$/)]),
      'editorValue' : new FormControl('',Validators.compose([Validators.required]))
    });
    this.activatedroute.params.subscribe((res)=>{
      this.type = res.type;
      this.staticId = res.id
      console.log('type', this.type);

    })
    this.viewContentList();
  }

  viewContentList(){
    this.mainService.showSpinner();
    this.mainService.getApi('static/viewStaticPage/'+this.type ,1).subscribe((res)=>{
      this.mainService.hideSpinner();
      if(res.response_code == 200){
        this.staticData = res.result;
        this.form.patchValue({
          Title :  this.staticData.title,
          editorValue :  this.staticData.description
        })
        console.log('static content',this.staticData);
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })
  }

  editStaticcontent(){
    const data ={
      staticId :  this.staticId ,
      title : this.form.value.Title,
      description : this.form.value.editorValue
    }
    this.mainService.showSpinner()
    this.mainService.putApi('static/editStaticPage',data ,1).subscribe((res)=>{
      this.mainService.hideSpinner()
      if(res.response_code == 200){
        this.router.navigate(['static-page-management'])
        this.mainService.successToast(res.response_message)
      }
      else{
        this.mainService.errorToast(res.response_message)
      }
    })

  }

}
