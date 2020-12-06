import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserListComponent } from "./user/user-list/user-list.component";

//material module config
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
} from "@angular/material";

//toastr-config
import { ToastrModule } from "ngx-toastr";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
