import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisteruserService } from './registeruser.service';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class RegisteruserComponent implements OnInit {

  registerform:FormGroup;
  email:FormControl;
  name:FormControl;
  password:FormControl;
  repassword:FormControl;
  phone:FormControl;
  constructor(private registeruserservice:RegisteruserService) { }
  createformelements(){
    this.email=new FormControl('');
    this.name=new FormControl('');
    this.password=new FormControl('');
    this.repassword=new FormControl('');
    this.phone=new FormControl('');
  }
  createform(){
    this.registerform=new FormGroup({
      name:this.name,
      email:this.email,
      password:this.password,
      repassword:this.repassword,
      phone:this.phone,
    })
  }
  ngOnInit() {
    this.createformelements();
    this.createform();
  }
  registerformsubmit(){
    if(this.registerform.valid){
       if(this.registerform.value.name==""||this.registerform.value.email==""||this.registerform.value.phone==""||this.registerform.value.password==""){
         alert("Fields cannot be empty");
         return;
       }
       if(this.registerform.value.password!=this.registerform.value.repassword){
         alert("Passwords Doesnot Match");
         return;
        } 
        this.registeruserservice.checkuser(this.email.value).subscribe((data:any)=>{
          if(data.length==0){
             //no user with the same email exist
             this.registeruserservice.createuser(this.registerform.value).subscribe((data:any)=>{
                 if(data.msg=="success"){
                   alert("User Succesfully registered");
                   this.registerform.reset();
                 }
             })
          }
          else{
            //users with the same email exist
            alert("User with the same email exist");
          }
        });
    }
  }
  
}
