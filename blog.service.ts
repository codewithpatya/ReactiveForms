import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  // get Blog
  getBlog(){
    return this.http.get("http://localhost:5000/api/blog")
  }

  // post Blog
  postBlog(blog:any){
    return this.http.post("http://localhost:5000/api/blog",JSON.stringify(blog),{headers:{"Content-Type":"application/json"}})
  }

  // put Blog
  putBlog(blog:any){
    return this.http.put(`http://localhost:5000/api/blog/${blog._id}`,JSON.stringify(blog),{headers:{"Content-Type":"application/json"}})
  }

  // delete Blog
  deleteBlog(_id:any){
    return this.http.delete(`http://localhost:5000/api/blog/${_id}`)
  }
}
