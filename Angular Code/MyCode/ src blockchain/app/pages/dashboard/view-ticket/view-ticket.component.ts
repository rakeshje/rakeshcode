import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  id: number;
  ticketDetail: any;

  constructor(private route: ActivatedRoute, private router: Router, public service: MainService) { }

  ngOnInit(): void {
    this.id= +this.route.snapshot.paramMap.get('id')
    this.viewTicket();
  }
viewTicket(){
  this.service.get(`static/view-ticket-detail?ticketId=${this.id}`).subscribe((res:any)=>{
    this.ticketDetail=res.data
  })
}
}