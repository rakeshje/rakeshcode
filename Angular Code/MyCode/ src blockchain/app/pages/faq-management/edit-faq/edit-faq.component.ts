import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  addFaqForm:FormGroup;
  pageNumber:number=1
  faqId: any;
  editData: any;
  currTab: any;
  constructor(public route:Router,public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((res:any)=>{
      this.faqId=res.faqId;
      this.currTab=res.lan;
      console.log('fg', this.faqId);
      
    })
   }

  ngOnInit(): void {
    this.formValidation();
    this.editFaqLanguage()
  }

  formValidation(){
    this.addFaqForm= new FormGroup({
      'title':new FormControl('', [Validators.required,Validators.pattern(/^[^0-9!@#$%^*()_+|<>,;'"]*$/)]),
      'description': new FormControl('', [Validators.required,Validators.pattern('')])
    })
  }

  // edit faq language
  editFaqLanguage(){
    if(this.currTab=='English'){
      this.editFaq();
    }
    else if(this.currTab=='German'){
      this.editFaqGerman();
    }
    else if(this.currTab=='Spanish'){
      this.editFaqSpanish();
    }
  }
  
  // edit faq english
  editFaq(){
    
   this.service.get("static/get-faq-detail?faqId="+this.faqId).subscribe((res:any)=>{
     if (res.status=200) {
       console.log('jjh', res);
       this.editData=res.data;
       this.service.toasterSucc(res.message);
       this.addFaqForm.patchValue({
         'title':this.editData.question,
         'description':this.editData.answer
       })
      //  this.route.navigate(['/faq-management'])
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

  // edit faq german
  editFaqGerman(){
    
    this.service.get("static/get-german-faq-detail?faqId="+this.faqId).subscribe((res:any)=>{
      if (res.status=200) {
        console.log('jjh', res);
        this.editData=res.data;
        this.service.toasterSucc(res.message);
        this.addFaqForm.patchValue({
          'title':this.editData.question,
          'description':this.editData.answer
        })
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

   // edit faq spanish
  editFaqSpanish(){
    this.service.get("static/get-spanish-faq-detail?faqId="+this.faqId).subscribe((res:any)=>{
      if (res.status=200) {
        console.log('jjh', res);
        this.editData=res.data;
        this.service.toasterSucc(res.message);
        this.addFaqForm.patchValue({
          'title':this.editData.question,
          'description':this.editData.answer
        })
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

  //  update faq language
  updateFaqLanguage(){
    if(this.currTab=='English'){
      this.updateFaq();
    }
    else if(this.currTab=='German'){
      this.updateFaqGerman();
    }
    else if(this.currTab=='Spanish'){
      this.updateFaqSpanish();
    }
  }
  // update faq english
  updateFaq(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
   this.service.post("static/update-faq?faqId="+this.faqId,request).subscribe((res:any)=>{
     if (res.status=200) {
       console.log('jjh', res);
       
       this.service.toasterSucc(res.message)
       this.route.navigate(['/faq-management'])
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

  // update faq german
  updateFaqGerman(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
   this.service.post("static/update-german-faq?faqId="+this.faqId,request).subscribe((res:any)=>{
     if (res.status=200) {
       console.log('jjh', res);
       
       this.service.toasterSucc(res.message)
       this.route.navigate(['/faq-management'])
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

  // update faq spanish
  updateFaqSpanish(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
   this.service.post("static/update-spanish-faq?faqId="+this.faqId,request).subscribe((res:any)=>{
     if (res.status=200) {
       console.log('jjh', res);
       
       this.service.toasterSucc(res.message)
       this.route.navigate(['/faq-management'])
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
