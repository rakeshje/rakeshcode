import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})
export class AddTokenComponent implements OnInit {
  addForm:FormGroup;
  constructor(public route:Router) { }

  ngOnInit() {
    this.addForm= new FormGroup({
      'address': new FormControl('', Validators.required),
      'decimal': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
    })
  }
  addToken(){
    this.route.navigate(['/token-management'])
  }

}
