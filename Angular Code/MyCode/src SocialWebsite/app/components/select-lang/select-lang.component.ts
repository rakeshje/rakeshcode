import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-lang',
    templateUrl: './select-lang.component.html',
    styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {
    obj:any={}
    constructor(private server:ServerService, private router:Router) { }

    ngOnInit() {
        this.getLang()
    }

    // to continue 
    continue() {
        let data = {
            "selectedLanguage":this.obj.radio1
        }
        if(navigator.onLine) {
            let api = this.server.postApi('user/selectLanguage', data).subscribe((res)=> {
                api.unsubscribe()
                if(res.responseCode == 200) {
                    this.router.navigateByUrl('settings')
                }
            })
        }else {
            this.server.showWarnToast('Check internet connection!')
        }
    }

    // to get selected lang
    getLang() {
        let api = this.server.getApi('user/getSelectedLanguage').subscribe((res)=> {
            api.unsubscribe()
            if(res.responseCode == 200) {
                this.obj.radio1 = res.result.selectedLanguage
            }
        })
    }

   

}
