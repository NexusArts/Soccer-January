import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 user: any
 img: string
 imagePreview: any;
 connectedUser: any
 public sanitizedImageURL: any;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
     this.connectedUser = localStorage.getItem("connectedUserId")
    console.log("connected user",this.connectedUser)
    this.userService.connectedUser(this.connectedUser).subscribe((response) => {
      console.log(response.user)
this.user = response.user
console.log(this.user.avatar)
       });
}
goToEdit() {

  this.router.navigate([`/subscription/${this.connectedUser}`]);
}

}