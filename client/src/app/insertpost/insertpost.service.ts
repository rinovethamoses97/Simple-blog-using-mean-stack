import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InsertpostService {

  constructor(private http:HttpClient) { }
  addPost(formdata){
    return this.http.post("http://localhost:3000/api/insertpost",formdata);
  }
  updatepost(id,title,content){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/updatepost",{id:id,title:title,content:content},{headers:headers});
  }
}
