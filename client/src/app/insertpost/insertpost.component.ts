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
@Component({
  selector: 'app-insertpost',
  templateUrl: './insertpost.component.html',
  styleUrls: ['./insertpost.component.css']
})
export class InsertpostComponent implements OnInit {

  postform:FormGroup;
  title:FormControl;
  content:FormControl
  constructor(private insertpostservice:InsertpostService) { }

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
}
