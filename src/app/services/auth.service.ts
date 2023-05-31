import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../models/CustomHttpResponse';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.apiUrl;
  public userActive = new BehaviorSubject<any>([]);  
  private token: any;
  public loggedInUsername : any = {};
  private jwtHelper = new JwtHelperService;

  constructor(private http: HttpClient) { }

  getUser() {
    return this.userActive.asObservable();
  }

  setUserActive(k: any) {
    this.loggedInUsername = k;
    this.userActive.next(this.loggedInUsername);
  }

  public login(user: any): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  public register(user: any): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  // * Recovery password
  public recoveryPassword(form: FormData): Observable<CustomHttpRespone> {
    return this.http.post<CustomHttpRespone>(`${this.host}/user/recovery-password`, form);
  }

  // * Reset password
  public resetPassword(form: FormData): Observable<CustomHttpRespone> {
    return this.http.post<CustomHttpRespone>(`${this.host}/user/reset-password`, form);
  }


  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("users");
  }

  public saveToken(token: string): void {

    this.token = token;
    localStorage.setItem("token", token);
  }

  public addUserToLocalCache(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    // Sintaxis para campos que pueden venir vacios
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public loadToken(): void {
    this.token = localStorage.getItem("token");
  }


  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      console.log(this.jwtHelper.decodeToken(this.token).sub);
      if (this.jwtHelper.decodeToken(this.token).sub != null) {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        } else {
          this.logOut();
          return false;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }




}
