import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUs:any;
  description:any;
  currUrl: any;
  title: any;
  constructor( public service: MainService, public route:Router, public active:ActivatedRoute ) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.currUrl=params.tab
      console.log('jj', this.currUrl);
      
    })
    
   }

  ngOnInit() {
    this.LanguageData();
    
    
  }
  // about language translator
  LanguageData(){
    if(this.currUrl=='English'){
      this.aboutus()
    }
    else if(this.currUrl=='German'){
      this.aboutusGerman()
    }
    else if(this.currUrl=='Spanish'){
      this.aboutusSpanish()
    }

  }
// english about us
 aboutus(){
   this.service.get(`static/get-static-page-data-by-page-key?pageKey=About Us`).subscribe((res:any)=>{
     if(res.status==200){
     this.aboutUs=res.data
     this.title=this.aboutUs.pageKey
     this.description=this.aboutUs.pageData
     console.log( res)
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

 // german about us
 aboutusGerman(){
  this.service.get(`static/get-german-static-page-data-by-page-key?pageKey=Über uns`).subscribe((res:any)=>{
    if(res.status==200){
    this.aboutUs=res.data
    this.title=this.aboutUs.pageKey
    this.description=this.aboutUs.pageData
    console.log( res)
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
// german about us
aboutusSpanish(){
  this.service.get(`static/get-spanish-static-page-data-by-page-key?pageKey=Acerca de nosotros`).subscribe((res:any)=>{
    if(res.status==200){
    this.aboutUs=res.data
    this.title=this.aboutUs.pageKey
    this.description=this.aboutUs.pageData
    console.log( res)
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

// update language
updateLanguageData(){
  if(this.currUrl=='English'){
    this.updateEnglishAboutUs()
  }
  else if(this.currUrl=='German'){
    this.updateGermanAboutUs()
  }
  else if(this.currUrl=='Spanish'){
    this.updateSpanishAboutUs()
  }

}

// english
 updateEnglishAboutUs(){
    let request = {
      'pageData':this.description,
      'pageKey':this.title,
    }
   this.service.post(`static/update-static-content-data`,request).subscribe((res:any)=>{
     if (res.status=200) {
       this.service.toasterSucc(res.message)
       this.route.navigate(['/static-content-management'])
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
 updateGermanAboutUs(){
  let request = {
    'pageData':this.description,
    'pageKey':this.title,
  }
 this.service.post(`static/update-german-static-content-data`,request).subscribe((res:any)=>{
   if (res.status=200) {
     this.service.toasterSucc(res.message)
     this.route.navigate(['/static-content-management'])
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
updateSpanishAboutUs(){
  let request = {
    'pageData':this.description,
    'pageKey':this.title,
  }
 this.service.post(`static/update-spanish-static-content-data`,request).subscribe((res:any)=>{
   if (res.status=200) {
     this.service.toasterSucc(res.message)
     this.route.navigate(['/static-content-management'])
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
