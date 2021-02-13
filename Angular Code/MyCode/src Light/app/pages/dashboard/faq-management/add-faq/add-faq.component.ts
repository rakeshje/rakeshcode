import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {
  addFaqForm:FormGroup
  constructor(public router:Router, public service:MainService) { }

  ngOnInit() {
    this.addFaqFormValidation()
  }


  addFaqFormValidation(){
    this.addFaqForm= new FormGroup({
      topic: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    })
  }
  // Add Faq
  addfaq(){
    this.service.showSpinner()
    let data={
      topic:this.addFaqForm.value.topic,
      question:this.addFaqForm.value.question,
      answer:this.addFaqForm.value.answer
    }
    console.log("rggj", data);
    
    this.service.postApi('faq/faqs', data, 1).subscribe((res)=>{
      console.log("eh", res);
      if(res.responseCode==200){
        this.service.hideSpinner()
        this.router.navigate(['faq-management'])
      }
      
    })

  }

}
