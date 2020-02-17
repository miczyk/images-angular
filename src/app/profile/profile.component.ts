import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { ChangeEmailService } from '../_services/change-email.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  msg: String = "";
  error = false;

  constructor(private token: TokenStorageService, private srvChangeEmail: ChangeEmailService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }

  changeEmail(input: HTMLInputElement) {
    let value = input.value;
    console.log(value);
    if (!value) {
      this.error = true;
      this.msg = "Please, type the email!";
      return;
    } else if (value.length < 5 || value.length > 20) {
      this.error = true;
      this.msg = "The length of email should be beetwen 5 and 20 characters!";
      return;
    } else if (value == this.currentUser.email) {
      this.error = true;
      this.msg = "Value of old email and new email are the same!";
      return;
    }
      this.srvChangeEmail.changeEmail(this.currentUser.email, value).subscribe(
      data => {
        this.error = false;
        this.currentUser.email = value;
        this.msg = data['message'];
      },
      err => {
        this.error=true;
        this.msg = err.error.message;
      }
    );  
  }

}
