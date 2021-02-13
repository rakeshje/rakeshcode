import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  success: string;
  showLoginHeader: boolean;

  constructor() { this.success=localStorage.getItem('success' )}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.showLoginHeader = true
    }
    else{
    if (localStorage.getItem('success')) {
      this.showLoginHeader = false
    }
  }
  }

}
