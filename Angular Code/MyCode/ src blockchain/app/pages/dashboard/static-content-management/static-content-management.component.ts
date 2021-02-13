import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {
  staticData:any=[]
  currTab: any='English';
  staticGermanData: any=[];
  staticSpanishData: any=[];
  
  constructor(public service: MainService, public router:Router) { }

  ngOnInit() {
    this.getEnglishStaticData()

  }

  // tab function
  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'English'){
      this.getEnglishStaticData()
    }
   else if(this.currTab === 'German'){
     console.log('hh', this.currTab);
     
     this.getGermanStaticData()
    
    }
    else if (this.currTab === 'Spanish'){
      this.getSpanishStaticData()
      
    }
    
  }
  // english static data
getEnglishStaticData(){
  this.service.get(`static/get-all-static-content-data`).subscribe((res:any)=>{
    if(res.status==200){
   this.staticData=res.data
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

// german static data
getGermanStaticData(){
  this.service.get(`static/get-all-german-static-content-data`).subscribe((res:any)=>{
    if(res.status==200){
      console.log('ggf', res);
   this.staticGermanData=res.data
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

// spanish static data
getSpanishStaticData(){
  this.service.get(`static/get-all-spanish-static-content-data`).subscribe((res:any)=>{
    if(res.status==200){
      console.log('ggf', res);
   this.staticSpanishData=res.data
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
// routing
  
germanAbout(page, tab){
   
  console.log('hgg', page);

  if(page=='Über uns'){
  this.router.navigate(['/About Us'],{queryParams:{tab:tab}})
  }
  else if(page=='Datenschutzbestimmungen'){
    this.router.navigate(['/Privacy Policy'],{queryParams:{tab:tab}})
    }

    else if(page=='Geschäftsbedingungen'){
      this.router.navigate(['/Terms And Condition'],{queryParams:{tab:tab}})
      }
}
englishAbout(page, tab){
  console.log('hgg', page);

  if(page=='About Us'){
    this.router.navigate(['/About Us'],{queryParams:{tab:tab}})
    }
    else if(page=='Privacy Policy'){
      this.router.navigate(['/Privacy Policy'],{queryParams:{tab:tab}})
      }
  
      else if(page=='Terms And Condition'){
        this.router.navigate(['/Terms And Condition'],{queryParams:{tab:tab}})
        }
}
spanishAbout(page, tab){
  console.log('hgg', page);
  
  if(page=='Acerca de nosotros'){
    this.router.navigate(['/About Us'],{queryParams:{tab:tab}})
    }
    else if(page=='política de privacidad'){
      this.router.navigate(['/Privacy Policy'],{queryParams:{tab:tab}})
      }
  
      else if(page=='términos y condiciones'){
        this.router.navigate(['/Terms And Condition'],{queryParams:{tab:tab}})
        }
}

}

