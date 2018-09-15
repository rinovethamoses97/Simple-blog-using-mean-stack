import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  constructor(private http:HttpClient) { }
  
  
  checkuser(email){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/checkuser",{email:email},{headers:headers}); 
  }
  createuser(user){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/createuser",user,{headers:headers}); 
  }
  upload(data){
    var headers=new HttpHeaders({
      'Content-Type':  'multipart/form-data',
    });
    return this.http.post("http://localhost:3000/api/upload",data); 
  }
  updatelinkedinid(linkedinid){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/updatelinkedinid",{userid:localStorage.getItem("id"),linkedinid:linkedinid},{headers:headers});
  }
}
