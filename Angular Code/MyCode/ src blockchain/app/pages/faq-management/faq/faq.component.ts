import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

declare var $:any
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  currTab: any='English';
  faqData: any=[];
  pageNumber:number=1
  faqId: any;
  isPublished: any;
  lan: any;

  constructor(public route:Router, public service:MainService) { }

  ngOnInit(): void {
    this.faqList()
  }

  // tab function
  selectTab(tab){
    this.currTab = tab;
    if(this.currTab === 'English'){
      this.faqList()
    }
   else if(this.currTab === 'German'){
     this.faqListGerman()
     console.log('hh', this.currTab);
     
    
    }
    else if (this.currTab === 'Spanish'){
      this.faqListSpanish();
      
    }
    
  }
  // faq english
  faqList(){
    var url = "static/search-filter-faq-list?page="+(this.pageNumber-1)+ "&pageSize=10"  ;
    this.service.get(url).subscribe((res:any)=>{
      console.log("kyc", res);
      if(res.status==200){
        this.faqData=res.data;
        
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // faq german
  faqListGerman(){
    var url = "static/search-filter-german-faq-list?page="+(this.pageNumber-1)+ "&pageSize=10"  ;
    this.service.get(url).subscribe((res:any)=>{
      console.log("kyc", res);
      if(res.status==200){
        this.faqData=res.data;
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // faq spanish
  faqListSpanish(){
    var url = "static/search-filter-spanish-faq-list?page="+(this.pageNumber-1)+ "&pageSize=10"  ;
    this.service.get(url).subscribe((res:any)=>{
      console.log("kyc", res);
      if(res.status==200){
        this.faqData=res.data;
      }
      
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }
// add faq
  addFaq(tab){
    this.currTab=tab
    console.log('gf',this.currTab);
    
    this.route.navigate(['/add-faq'],{queryParams:{tab:tab}})
  }

  // edit faq
  editFaq(faqId, tab){
    this.route.navigate(['/edit-faq'],{queryParams:{faqId:faqId,lan:tab}})
  }
  // open modal
  delete(faqId, tab){
    this.faqId=faqId;
    this.lan=tab
    $('#deleteModal').modal('show')
  }

  // delete faq language
  deleteFaqLanguage(){
    if(this.lan === 'English'){
      this.deleteUser()
    }
   else if(this.lan === 'German'){
     this.deleteUserGerman()
     console.log('hh', this.lan);
     
    
    }
    else if (this.lan === 'Spanish'){
      this.deleteUserSpanish();
      
    }
  }

  // delete functionallity of faq english
  deleteUser(){
    let url="static/delete-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqList();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // delete functionallity of faq german
  deleteUserGerman(){
    let url="static/delete-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqListGerman();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // delete functionallity of faq spanish
  deleteUserSpanish(){
    let url="static/delete-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#deleteModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqListSpanish();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }
  // open modal
  publish(publish,faqId,tab){
    this.faqId=faqId;
    this.isPublished=publish;
    this.lan=tab
    console.log('gff', this.isPublished);
    
    $('#publishModal').modal('show')

  }

  // publish faq language
  publishFaqLanguage(){
    if(this.lan === 'English'){
      this.publishFaq()
    }
   else if(this.lan === 'German'){
     this.publishFaqGerman()
     console.log('hh', this.lan);
     
    
    }
    else if (this.lan === 'Spanish'){
      this.publishFaqSpanish();
      
    }
  }

  // publish faq english
  publishFaq(){
    let url="static/publish-unpuqblish-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#publishModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqList();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // publish faq german
  publishFaqGerman(){
    let url="static/publish-unpuqblish-german-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#publishModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqListGerman();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }

  // publish faq spanish
  publishFaqSpanish(){
    let url="static/publish-unpuqblish-spanish-faq?faqId="+this.faqId;
    let data={}
    this.service.showSpinner();
    this.service.post(url, data).subscribe((res:any)=>{
      if(res.status==200){
        this.service.hideSpinner();
        $('#publishModal').modal('hide')
        this.service.toasterSucc(res.message);
        this.faqListSpanish();
      }
    },(err)=>{
      if(err['status']==401){
        this.service.toasterErr('Unauthorized Access')
      }
      else{
        this.service.toasterErr('Something Went Wrong');
     }
    })
  }
  edit(){}
  view(){}
  
}
