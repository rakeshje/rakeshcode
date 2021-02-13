import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  helpdata: any;

  constructor(public service:ServerService) { }

  ngOnInit() {
    this.help();
  }

  help(){
    let data ={
      "type":'HELP'
    }
    this.service.postApi('staticPage/staticApi', data).subscribe((res)=>{
      console.log("privacy", res)
      this.helpdata=res.success
      console.log("privacy", res)

    })
  }
}
