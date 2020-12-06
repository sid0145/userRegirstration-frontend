import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserListComponent } from "./user/user-list/user-list.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "user-create", component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
