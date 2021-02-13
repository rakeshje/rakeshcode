import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
    selected: any;

    constructor(public server: ServerService, private router: Router) {
        window.scrollTo(0,0)
     }

    ngOnInit() {
        let url = this.router.url
        url = url.replace('/', '')
        this.selected = url
        if (url == 'profile') {
            this.selected = 'settings'
        }
        if (url == 'events/All_Events' || url == 'events/Add_Events' || url == 'events/View_My_Posted_Events') {
            this.selected = 'events'
        }
        if (url == 'friendlist/suggestion' || url == 'friendlist/request' || url == 'friendlist/contacts') {
            this.selected = 'friendlist'
        }
        if (url == 'classroom/classroom' || url == 'classroom/discoverClassroom' || url == 'classroom/createClassroom') {
            this.selected = 'classroom'
        }
        if (url == 'non-profit-group/nonProfitGroup' || url == 'non-profit-group/createNonProfitGroup') {
            this.selected = 'non-profit-group'
        }
        if (url == 'marketing') {
            this.selected = 'marketing'
        }
    }

    // to navigate 
    navigateTo(path) {
        this.selected = path
        if (path == 'events') {
            this.router.navigateByUrl('events/All_Events')
        } else {
            this.router.navigateByUrl(path)
        }
    }

}
