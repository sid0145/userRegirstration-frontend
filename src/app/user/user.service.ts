import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { User } from "./user";

const BACKEND_URL = environment.api_url;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private users: User[] = [];
  private userUpdated = new Subject<{ users: User[] }>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //creating new user
  createUser(
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: any,
    image: File
  ) {
    const userData = new FormData();
    userData.append("firstname", firstname);
    userData.append("lastname", lastname);
    userData.append("email", email);
    userData.append("phoneNumber", phoneNumber);
    userData.append("image", image, firstname);
    this.http
      .post<{ message: string; user: User }>(
        `${BACKEND_URL}/create-user`,
        userData
      )
      .subscribe(
        (data) => {
          // console.log(data);
          this.router.navigate(["/"]);
        },
        (err) => {
          this.toastr.error("something went wrong", "error", {
            timeOut: 2000,
          });
        }
      );
  }

  //*********getting all the users */

  getUsers() {
    this.http
      .get<{ message: string; users: User[] }>(`${BACKEND_URL}/get-users`)
      .subscribe(
        (userData) => {
          this.users = userData.users;
          this.userUpdated.next({ users: [...this.users] });
        },
        (err) => {
          let error;
          if (err.name === "HttpErrorResponse") {
            error = "check your connection";
          } else {
            error = "oop's something went wrong";
          }
          this.toastr.error(error, "error", {
            timeOut: 2000,
          });
        }
      );
  }

  //*******to get updated at every evnt */
  getUserUpdateListner() {
    return this.userUpdated.asObservable();
  }
}
