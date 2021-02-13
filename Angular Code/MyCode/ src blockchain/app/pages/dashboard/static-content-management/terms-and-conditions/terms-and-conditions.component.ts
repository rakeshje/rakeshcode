import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  tandc:any
  description:string;
  currUrl: any;
  title: any;
  constructor(private active: ActivatedRoute, public service: MainService,  public router:Router) 
  { 
    this.active.queryParams.subscribe((params)=>{
      this.currUrl=params.tab
      console.log('jj', this.currUrl);
      
    })
  }

  ngOnInit() {
   this.LanguageData() 
  }

  // about language translator
  LanguageData(){
    if(this.currUrl=='English'){
      this.termsAndConditions()
    }
    else if(this.currUrl=='German'){
      this.termsAndConditionsGerman()
    }
    else if(this.currUrl=='Spanish'){
      this.termsAndConditionsSpanish()
    }

  }
  // english
termsAndConditions(){
   this.service.get(`static/get-static-page-data-by-page-key?pageKey=Terms And Condition`).subscribe((res:any)=>{
     this.tandc=res.data
     this.title=this.tandc.pageKey
   this.description=this.tandc.pageData
  },err=>{
    
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
 }

 // german
termsAndConditionsGerman(){
  this.service.get(`static/get-german-static-page-data-by-page-key?pageKey=Geschäftsbedingungen`).subscribe((res:any)=>{
    this.tandc=res.data
    this.title=this.tandc.pageKey
  this.description=this.tandc.pageData
 },err=>{
   
   this.service.hideSpinner();
   if(err['status']=='401'){
     this.service.onLogout();
     this.service.toasterErr('Unauthorized Access');
   }else{
   this.service.toasterErr('Something Went Wrong');
}
 })
}

// spanish
termsAndConditionsSpanish(){
  this.service.get(`static/get-spanish-static-page-data-by-page-key?pageKey=términos y condiciones`).subscribe((res:any)=>{
    this.tandc=res.data
    this.title=this.tandc.pageKey
  this.description=this.tandc.pageData
 },err=>{
   
   this.service.hideSpinner();
   if(err['status']=='401'){
     this.service.onLogout();
     this.service.toasterErr('Unauthorized Access');
   }else{
   this.service.toasterErr('Something Went Wrong');
}
 })
}

// update language
updateLanguageData(){
  if(this.currUrl=='English'){
    this.updateTAndC()
  }
  else if(this.currUrl=='German'){
    this.updateTAndCGerman()
  }
  else if(this.currUrl=='Spanish'){
    this.updateTAndCSpanish()
  }
}
  // english
  updateTAndC(){
    let request = {
      'pageData':this.description,
      'pageKey':this.title,
    }
   this.service.post(`static/update-static-content-data`,request).subscribe((res:any)=>{
     if (res.status=200) {
       this.service.toasterSucc(res.message)
       this.router.navigate(['/static-content-management'])
     }
    },err=>{
   
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    })
 }

 // german
 updateTAndCGerman(){
  let request = {
    'pageData':this.description,
    'pageKey':this.title,
  }
 this.service.post(`static/update-german-static-content-data`,request).subscribe((res:any)=>{
   if (res.status=200) {
     this.service.toasterSucc(res.message)
     this.router.navigate(['/static-content-management'])
   }
  },err=>{
 
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
}

// spanish
updateTAndCSpanish(){
  let request = {
    'pageData':this.description,
    'pageKey':this.title,
  }
 this.service.post(`static/update-spanish-static-content-data`,request).subscribe((res:any)=>{
   if (res.status=200) {
     this.service.toasterSucc(res.message)
     this.router.navigate(['/static-content-management'])
   }
  },err=>{
 
    this.service.hideSpinner();
    if(err['status']=='401'){
      this.service.onLogout();
      this.service.toasterErr('Unauthorized Access');
    }else{
    this.service.toasterErr('Something Went Wrong');
 }
  })
}
}
