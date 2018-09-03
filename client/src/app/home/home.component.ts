import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { user } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../postwall/vendor/bootstrap/css/bootstrap.min.css','../postwall/css/blog-home.css']
})
export class HomeComponent implements OnInit {
  useremail:FormControl;
  users:user[];
  login_status:boolean;
  name:String;
  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit() {
    this.useremail=new FormControl('');
     var temp=this.loginservice.getId();
     if(temp.msg=="success"){
        this.login_status=true;
        this.loginservice.getUser(temp.id).subscribe((data:any)=>{
           this.name=data[0].name;
        })

     }
     else{
        this.login_status=false;
     }
  }
  fetchuser(){
       
       if(this.useremail.value!=""){
          this.loginservice.finduser(this.useremail.value).subscribe((data:any)=>{
             this.users=data;
          })
       }
       else{
         this.users=null;
       }
  }
  finduser(){
    if(this.useremail.value!=""){
      this.loginservice.finduser(this.useremail.value).subscribe((data:any)=>{
          this.users=data;
          if(this.users.length==1){
            //user exist/forward to the post page
             if(this.useremail.value==this.users[0].email){
                this.router.navigateByUrl('/home/'+this.users[0]._id);
             }
             else{
                alert("No user exist");
             }
          }
          else{
            //no user exist
            alert("No user exist");
          }
      })
   }
   else{
     this.users=null;
   }
  }
}
