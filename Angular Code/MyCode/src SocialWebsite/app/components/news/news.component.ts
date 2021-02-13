import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  pageNo: any= 1;
  limit: any=10;
  constructor(public server:ServerService, private router:Router) { }

  ngOnInit() {
    this.getNews('Today');
    this.getNews('Tommorow');
    this.getNews('Week');
  }

  getNews(val){
    let data={
      "pageNumber": this.pageNo,
      "limit": this.limit,
       "newsDay": val,
      "userId": localStorage.getItem('user_id')
    }
    if(navigator.onLine) {
      let news = this.server.postApi('user/getallnews',data).subscribe((res)=> {
        news.unsubscribe()
          if(res.responseCode == 200) {
             //this.server.showSuccToast('Gaming video uploaded successfully!!')
             
          }
      })
  }else {
      this.server.showWarnToast('Check internet connection!')
  }

  }
}
