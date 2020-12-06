import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  userSubscription: Subscription;
  isLoading: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers();
    this.userSubscription = this.userService
      .getUserUpdateListner()
      .subscribe((userData: { users: User[] }) => {
        this.isLoading = false;
        this.users = userData.users;
        this.users = [...this.users];
      });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
