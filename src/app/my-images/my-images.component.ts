import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../_services/images.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.css']
})
export class MyImagesComponent implements OnInit {

  pageNumber;
  numberOfImages;
  sortingType:SortingType;
  images: any = [];
  byNameAsc = SortingType.BY_NAME_ASC;
  byNameDesc = SortingType.BY_NAME_DESC;
  byDateAsc = SortingType.BY_DATE_ASC;
  byDateDesc = SortingType.BY_DATE_DESC;
 

  constructor(private imageServ: ImagesService, private http: HttpClient) { }

  ngOnInit() {
      this.sortingType = SortingType.BY_NAME_ASC;
      this.imageServ.getImages(1, this.sortingType).subscribe(response => {
        this.images = response.images;
        this.numberOfImages = response.countOfAllImages;
        this.pageNumber = 1;
      });
  }

  removeImage(image:any) {
    this.http.delete("http://localhost:8080/image/" + image.id).subscribe(result => {
      console.log(result)
      this.imageServ.getImages(this.pageNumber, this.sortingType).subscribe(response => {
        this.images = response.images;
        this.numberOfImages = response.countOfAllImages;
      });
    }, err => {
      console.error(err)
    });
  }

  sortBy(sortingType: SortingType) {
    this.sortingType = sortingType;
    this.imageServ.getImages(this.pageNumber, this.sortingType).subscribe(response => {
      this.images = response.images;
      this.numberOfImages = response.countOfAllImages;
    });
  }

  goToNext() {
    const last = Math.ceil(this.numberOfImages / 8);
    if (this.pageNumber < last) {
      this.pageNumber++;
      this.getImagesWhenPageNumberIsChanged();
    }
  }
  goToLast() {
    const last = Math.ceil(this.numberOfImages / 8);
    if (this.pageNumber < last) {
      this.pageNumber = last;
      this.getImagesWhenPageNumberIsChanged();
    }
    
  }
  goToFirst() {
    if (this.pageNumber > 1) {
      this.pageNumber = 1;
      this.getImagesWhenPageNumberIsChanged();
    }
  }
  goToPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getImagesWhenPageNumberIsChanged();
    }
  }


  getImagesWhenPageNumberIsChanged () {
    this.imageServ.getImages(this.pageNumber, this.sortingType).subscribe(response => {
      this.images = response.images;
      this.numberOfImages = response.countOfAllImages;
    });
  }

}
export enum SortingType {
  BY_NAME_ASC="BY_NAME_ASC",
  BY_NAME_DESC="BY_NAME_DESC",
  BY_DATE_ASC="BY_DATE_ASC",
  BY_DATE_DESC="BY_DATE_DESC"
}