import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortingType } from '../my-images/my-images.component';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }


  public getImages(pageNumber:number, sortingType: SortingType) : Observable<any> {
    return this.http.get("http://localhost:8080/image?page=" + pageNumber + "&sorting=" + sortingType);
  }

}
