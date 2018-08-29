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
  styleUrls: ['./insertpost.component.css']
})
export class InsertpostComponent implements OnInit {

  postform:FormGroup;
  title:FormControl;
  content:FormControl
  constructor(private insertpostservice:InsertpostService,private loginservice:LoginService,private route:Router) {
      var temp=this.loginservice.getId();
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
  }
  createForm(){
    this.postform=new FormGroup({
      title:this.title,
      content:this.content,
    });
  }
  submitpost(){
    if(this.postform.valid){
      if(this.postform.value.title=="" || this.postform.value.content==""){
        alert("Fields Cannot be Empty");
        return;
      }
      this.insertpostservice.addPost(this.postform.value)
      .subscribe((data:any) => {
         if(data.msg=="success"){
            alert("Inserted");
            this.postform.reset();
         }
         else{
            alert("Failed");
         }
      });
    }    
  }
  logout(){
     this.loginservice.logout();
     this.route.navigate(['login']);
  }
}
