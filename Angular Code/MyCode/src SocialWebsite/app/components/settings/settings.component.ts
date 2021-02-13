import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor(private router: Router, private header:HeaderComponent) { }

    ngOnInit() {
        window.scrollTo(0,0)
    }

    // to navigate
    navigateTo(path) {
        this.router.navigateByUrl(path)
    }

    // to call logout
    callHeader() {
        this.header.logout()
    }

}
