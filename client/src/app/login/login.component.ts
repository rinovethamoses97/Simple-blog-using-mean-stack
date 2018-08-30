import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup;
  email:FormControl;
  password:FormControl;
  constructor(private loginservice:LoginService,private route:Router) {
    var temp=this.loginservice.getId();
      if(temp.msg=="success"){
         this.route.navigate(['insertpost']);
      }
      else{
         //nothing
      }
   }
  createFormControl(){
    this.email=new FormControl('');
    this.password=new FormControl('');
  }
  createForm(){
    this.loginform=new FormGroup({
      email:this.email,
      password:this.password
    })
  }
  ngOnInit() {
      this.createFormControl();
      this.createForm();
  }
  login(){
    if(this.loginform.valid){
       this.loginservice.login(this.loginform.value).subscribe((data:any)=>{
           if(data.msg=="success"){
              alert("Login Success");
              
              this.loginservice.storeData(data.data);
              this.route.navigate(['insertpost']);
           }
           else{
              alert("Login Failed");
           }
       })
    }
  }
}
