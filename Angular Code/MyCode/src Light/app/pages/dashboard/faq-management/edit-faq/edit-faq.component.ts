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
  editFaqForm:FormGroup
  id: any;
  editData: any;
  constructor(public route: Router, public service:MainService, public active:ActivatedRoute) { 
    this.active.params.subscribe((params)=>{
      this.id=params.id
      console.log("dfj",this.id);
    })
  }

  ngOnInit() {
    this.ediFaqValidation()
    this.editFaq()
  }
  // form validation

  ediFaqValidation(){
    this.editFaqForm=new FormGroup({
      topic: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    })
  }

  // edit faq
  editFaq(){
    this.service.showSpinner()
    this.service.putApi('faq/faqs', {faqId:this.id},1).subscribe((res)=>{
      console.log("f",res);
      if(res.responseCode=200){
        this.service.hideSpinner()
        this.editData=res.result
        this.editFaqForm.patchValue({
          topic:this.editData.topic,
          question:this.editData.question,
          answer:this.editData.answer
        })
      }
      
    })

  }

  // update faq
  updateFaq(){
    this.service.showSpinner()
    let data={
      faqId:this.id,
      topic:this.editFaqForm.value.topic,
      question:this.editFaqForm.value.question,
      answer:this.editFaqForm.value.answer
    }
    this.service.putApi('faq/faqs',data,1).subscribe((res)=>{
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.route.navigate(['/faq-management'])
      }
    })


  }

}
