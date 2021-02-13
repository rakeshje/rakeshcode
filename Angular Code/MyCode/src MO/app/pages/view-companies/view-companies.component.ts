import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {
  searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.searchForm= new FormGroup({
      'search': new FormControl('')
    })
  }

}
