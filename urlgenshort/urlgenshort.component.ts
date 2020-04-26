import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UrlshortnerService } from '../urlshortner.service';

@Component({
  selector: 'app-urlgenshort',
  templateUrl: './urlgenshort.component.html',
  styleUrls: ['./urlgenshort.component.css']
})
export class UrlgenshortComponent implements OnInit {

  urlShortForm;
  getUrlData;
  listurl;

   constructor(private urlshortservice:UrlshortnerService) {
     this.urlShortForm = new FormGroup({
       'longurl': new FormControl('',Validators.required), 
      'shorturl':new FormControl(),
      
     }) 
 
   }
 
   ngOnInit(): void {
 
     this.getAllurls();
   }
   
 getAllurls()
 {
   this.urlshortservice.getAllUrlData().subscribe((data) => {
     this.listurl=data;
      
    })
 }
   sendData() {
     if (this.urlShortForm.valid) {
      
       this.urlshortservice.generateURLShortner(this.urlShortForm.value).subscribe((data) => {
 
         
         console.log(data.message);
         this.getUrlData=data;       
         this.getAllurls();
         
         
       })
 
       
     }
   
   }
 
  /* redirecturl(shorturlid)
   {
     this.urlshortservice.getURLShort(shorturlid).subscribe((data)=>{    
      this.getAllurls();
      window.location.href = data.longurl;
     })
   }
 */
   
}
