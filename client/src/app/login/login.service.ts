import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email:String;
  id:String;
  constructor(private http:HttpClient) { }

  login(user){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/login",user,{headers:headers});
  }
  storeData(user){
     localStorage.setItem("email",user.email);
     localStorage.setItem("id",user._id);
     this.email=user.email;
     this.id=user._id;
  }
  getId(){
     if(localStorage.getItem("id")==null){
       return {msg:"failed"}
     }
     else{
        return {id:localStorage.getItem("id"),msg:"success"};
     }
  }
  getUser(userid){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/getUser",{userid:userid},{headers:headers}); 
  }
  logout(){
    this.email=null;
    this.id=null;
    localStorage.clear();
  }
}
