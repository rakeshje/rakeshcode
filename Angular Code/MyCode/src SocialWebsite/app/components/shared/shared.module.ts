import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from 'src/app/services/server.service';
import * as moment from 'moment';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule
    ],
    exports: []
})

export class SharedModule {
    allFriends: any = [];
    total: any;
    fileData: any = "";
    fileName: any;
    typeMedia: any;
    limit: any;

    constructor(private server:ServerService) {
    }

    getFriends() {
        this.server.showSpinner();
        this.server.getFriend('user/getFriendList').subscribe(res => {
            this.server.hideSpinner();
            if(res.responseCode == 200) {
                console.log("friend", res);
                
                this.allFriends = res.allFriends
                this.total = res.allFriends.total;
                this.limit = res.allFriends.limit
            }
        }, (err) => {
            this.server.hideSpinner();
            console.log(err);
        })
    }

    getCreatedAtTime(time) {
       return moment(time).fromNow();
    }

    upload(event) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.fileData = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.fileName = event.target.files[0].name;
        this.typeMedia = event.target.files[0].type.split("/")[0];
      }
}