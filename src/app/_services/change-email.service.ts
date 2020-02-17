import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmailService {

  constructor(private http: HttpClient) { }


  public changeEmail(oldEmail:string, newEmail:string) : Observable<any> {
    const params = new HttpParams().set('newEmail', newEmail);
    return this.http.put("http://localhost:8080/email/" + oldEmail + "?newEmail="+newEmail, {},{ params });
  }
}
