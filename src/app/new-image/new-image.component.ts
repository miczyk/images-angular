import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  selectedFile: File = null;
  msg = '';
  addedImage = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('picture', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/image', fd).subscribe(res => {
      this.msg = res['message'];
      console.log(res)
      this.addedImage = true
    }, err => {
      this.msg = err.error.message;
      this.addedImage = false;
    });
  }


}
