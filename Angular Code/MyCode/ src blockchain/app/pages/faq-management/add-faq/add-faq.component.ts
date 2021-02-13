import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {
  addFaqForm:FormGroup;
  pageNumber:number=1
  currTab: any;
  constructor(public route:Router,public service:MainService, public active:ActivatedRoute) 
  {
    this.active.queryParams.subscribe((params)=>{
      this.currTab=params.tab
      console.log('jjf', this.currTab);
      
    })
   }

  ngOnInit(): void {
    this.formValidation();
  }

  formValidation(){
    this.addFaqForm= new FormGroup({
      'title':new FormControl('', [Validators.required,Validators.pattern(/^[^0-9!@#$%^*()_+|<>,;'"]*$/)]),
      'description': new FormControl('', [Validators.required,Validators.pattern('')])
    })
  }
// add faq language

  addFaqLanguage(){
    console.log('d', 'ffhhfhf');
    
    if(this.currTab=='English'){
      this.addFaq();
    }
    else if(this.currTab=='German'){
      this.addFaqGerman();
    }
    else if(this.currTab=='Spanish'){
      this.addFaqSpanish();
    }
  }

  // add faq english
  addFaq(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
    console.log('f', 'jd');
    
   this.service.post(`static/add-new-faq?page="+(this.pageNumber-1)+ "&pageSize=10"`,request).subscribe((res:any)=>{
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

  // add faq german
  addFaqGerman(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
   this.service.post(`static/add-new-german-faq?page="+(this.pageNumber-1)+ "&pageSize=10"`,request).subscribe((res:any)=>{
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

  // add faq spanish
  addFaqSpanish(){
    let request = {
      'answer':this.addFaqForm.value.description,
      'question':this.addFaqForm.value.title,
      
    }
   this.service.post(`static/add-new-spanish-faq?page="+(this.pageNumber-1)+ "&pageSize=10"`,request).subscribe((res:any)=>{
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
