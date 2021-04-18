import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:5000/api/user/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login() {

  }

  register() {

  }

  loggedin() {

  }

}
