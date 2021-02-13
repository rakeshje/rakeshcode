import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MainserviceService } from '../../provider/mainservice.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  loginForm:FormGroup
  currentUrl: string;
  code: any;
  data: string;

  constructor(public active:ActivatedRoute, public service:MainserviceService) {localStorage.setItem('success','success')
  this.active.queryParams.subscribe((params)=>{
    console.log("params", params);
    this.code=params.code;
    
  })
}

  ngOnInit() {
    this.success()
    this.formValidation()
    // this.currentUrl=window.location.href
   
  }

  formValidation(){
    this.loginForm= new FormGroup({

    })
  }

  success(){
    let data={
      'authorizeCode':this.code
    }
  this.service.postApi('user/getAuthorizationCode', data, 1).subscribe((res)=>{
    console.log("gg",res);
    if(res.response_code==200){
      this.data='successfully linked'
      this.service.successToast('successfully linked')
    }
  
  })
  }

}
