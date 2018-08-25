import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InsertpostService {

  constructor(private http:HttpClient) { }
  addPost(post){
    var headers=new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post("http://localhost:3000/api/insertpost",post,{headers:headers});
  }
}
