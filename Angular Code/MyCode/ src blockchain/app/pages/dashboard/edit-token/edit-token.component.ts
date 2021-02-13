import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-token',
  templateUrl: './edit-token.component.html',
  styleUrls: ['./edit-token.component.css']
})
export class EditTokenComponent implements OnInit {
  addForm:FormGroup;
  constructor(public route:Router) { }

  ngOnInit() {
    this.addForm= new FormGroup({
      'token': new FormControl('', Validators.required),
      
    })
  }
  editToken(){
    this.route.navigate(['/token-management'])
  }

}
