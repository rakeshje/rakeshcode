import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcontentpost',
  templateUrl: './addcontentpost.component.html',
  styleUrls: ['./addcontentpost.component.css']
})
export class AddcontentpostComponent implements OnInit {
  addSubadminForm: FormGroup;
  dataloop: any=[];
  loopdata: any=[];
  file: any;
  imageTypee: any;
  imageUrll: any;

  constructor(
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.form();
    this.categorylist();
  }

  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      imagee: new FormControl('', [Validators.required]),
      postedby : new FormControl('', [Validators.required])
      // balance: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(15)]),
      // city: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // state: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // kyc: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      // pincode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(10)]),
      // number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  addUser() {
    this.spinner.show();
    let data = {
      title: this.addSubadminForm.value.name,
      categoryName : this.addSubadminForm.value.category,
      content: this.addSubadminForm.value.description,
      postedBy: this.addSubadminForm.value.postedby,
      image: this.imageUrll,
    }
    console.log("gdfghfhjfhj",data);
    
    this.service.postApii('admin/addContent',data,1).subscribe(success=>{
      if(success.response_code == 200){
        this.spinner.hide();
        this.router.navigate(['/contentpost']);
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("dfghdfghdfh",error);
      
    }))
  }

  categorylist() {
    this.service.getApi('admin/listOfPublistCategory').subscribe(success=>{
      console.log("hgfhgf",success)
      this.dataloop = success.result[0];
      this.dataloop.forEach(element => {
        this.loopdata.push(element.categoryName);
      });
      console.log("fdgghdfghdfgh",this.loopdata)
    })
  }

  ValidateFileUploadd(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageTypee = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrll = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

}
