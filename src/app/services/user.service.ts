import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string ="http://localhost:3000/api/users";
  constructor(private httpClient: HttpClient) { }
  
  login(user){
    return this.httpClient.post<{user:any}>(this.userURL + "/login", user);
  }

  signup(user: any, avatar: File){
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("img", avatar);
    return this.httpClient.post(this.userURL + "/signup", formData);
  }

  connectedUser(userId){
    return this.httpClient.get<{user:any }>(`${this.userURL}/${userId}` )
  }
}
