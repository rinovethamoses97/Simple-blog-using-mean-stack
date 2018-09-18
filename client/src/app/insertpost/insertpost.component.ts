import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {InsertpostService} from './insertpost.service';
import {LoginService} from '../login/login.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-insertpost',
  templateUrl: './insertpost.component.html',
  styleUrls: ['./insertpost.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class InsertpostComponent implements OnInit {

  postform:FormGroup;
  title:FormControl;
  content:FormControl;
  category:FormControl;
  userid:String;
  filetoupload:File=null;
  postimage:File;
  constructor(private insertpostservice:InsertpostService,private loginservice:LoginService,private route:Router) {
      var temp=this.loginservice.getId();
      this.userid=temp.id;
      if(temp.msg=="success"){
        //nothing
      }
      else{
         this.route.navigate(['login']);
      }
   }

  ngOnInit() {
    
    this.createFormControls();
    this.createForm();
  }
  createFormControls(){
    this.title=new FormControl('');
    this.content=new FormControl('');
    this.category=new FormControl('');
  }
  createForm(){
    this.postform=new FormGroup({
      title:this.title,
      content:this.content,
      category:this.category,
    });
  }
  onfileadded(files: FileList){
    this.filetoupload=files.item(0);
    console.log(this.filetoupload);
  }
  submitpost(){
    if(this.postform.valid){
      if(this.postform.value.title=="" || this.postform.value.content=="" ||this.postform.value.category==""){
        alert("Fields Cannot be Empty");
        return;
      }
      const formData: FormData = new FormData();
      if(this.filetoupload==null){
        formData.append('filefound',"false");
      }
      else{
        formData.append('file',this.filetoupload,localStorage.getItem('id'));
        formData.append('filefound',"true");
      }
      formData.append('category',this.postform.value.category);
      formData.append('title',this.postform.value.title);
      formData.append('content',this.postform.value.content);
      formData.append('userid',""+this.userid);

      var temp_postform={
        category:this.postform.value.category,
        title:this.postform.value.title,
        content:this.postform.value.content,
        userid:this.userid,
      }
      this.insertpostservice.addPost(formData)
      .subscribe((data:any) => {
         if(data.msg=="success"){
            alert("Inserted");
            this.postform.reset();
            this.postimage=null;
         }
         else{
            alert("Failed");
         }
      });
    }    
  }
  logout(){
     event.preventDefault();
     this.loginservice.logout();
     this.route.navigate(['login']);
  }
}
