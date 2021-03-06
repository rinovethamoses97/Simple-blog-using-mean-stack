import { Component, OnInit } from '@angular/core';
import { RegisteruserService } from '../registeruser/registeruser.service';

@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class UploadphotoComponent implements OnInit {
  filetoupload:File;
  file:String;
  profile:File;
  linkedinid:String;
  constructor(private registeruserservice:RegisteruserService) { }

  ngOnInit() {
  }
  onfileadded(files: FileList){
    this.filetoupload=files.item(0);
    console.log(this.filetoupload);
  }
  upload(){
    const formData: FormData = new FormData();
    formData.append('file', this.filetoupload, localStorage.getItem('id'));
    this.registeruserservice.upload(formData).subscribe((data:any)=>{
        if(data.msg=="success"){
          alert("Profile photo updated");
          this.profile=null;
        }
        else{
          alert("Failed");
        }
    })
  }
  linkedinidupdate(){
     this.registeruserservice.updatelinkedinid(this.linkedinid).subscribe((data:any)=>{
      if(data.msg=="success"){
        alert("Linkedin ID updated");
        this.linkedinid=null;
      }
      else{
          alert("Failed");
      } 
     })
  }
}
