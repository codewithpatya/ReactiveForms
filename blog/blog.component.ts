import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  fb = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    slug: new FormControl(''),
    _id: new FormControl(''),
  })

 data:any=[]
 btn_value:any='save'

  handleSave(myform: FormGroup) {
    if (this.fb.value._id) {
      this.bs.putBlog(this.fb.value).subscribe((data: any) => {
        console.log(data);
        this.getData()
      })
    } else {
      console.log(this.fb.value);
      this.bs.postBlog({ title: this.fb.value.title, content: this.fb.value.content, slug: this.fb.value.slug }).subscribe((data: any) => {
        console.log(data);
        this.getData()

      })
    }
    this.cls()
  }

  constructor(private bs: BlogService,) { }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.bs.getBlog().subscribe((data: any) => {
      console.log(data);
this.data = data.data
    })
  }

  // edit data
  editData(el:any){
    this.fb.patchValue({
    _id:el._id,
    title:el.title,
    content:el.content,
    slug:el.slug});
    
    this.btn_value = 'Update';
  }

  cls(){
    this.fb.patchValue({
      _id:'',
      title:'',
      content:'',
      slug:''
    })
    this.btn_value = 'save'
  }

  deleteData(_id:any){
    this.bs.deleteBlog(_id).subscribe((data:any)=>{
      console.log(data);
      this.getData()
    })
  }
}
