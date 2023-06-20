import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // Form Id
  loginForm: FormGroup;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pwd: ["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]]
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe((response) => {
      console.log(response.user);
      
      localStorage.setItem("connectedUserId", response.user.userId);
    }
    )
  }
  //   let user = this.loginForm.value;
  //   let users = JSON.parse(localStorage.getItem("users") || "[]");
  //   let foundUser;
  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].email == user.email && users[i].pwd == user.pwd) {
  //       //success
  //       localStorage.setItem("connectedUserId", users[i].id);
  //       foundUser = users[i];
  //       break;
  //     }
  //   }

  //   if (foundUser) {
  //     if (foundUser.role == "admin") {
  //       this.router.navigate(["admin"]);
  //     } else {
  //       this.router.navigate([""]);
  //     }
  //   } else {
  //     this.errorMsg = "Please check Email/Password";
  //   }
  // }
}

