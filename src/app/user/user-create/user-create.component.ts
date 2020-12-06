import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    //initial form setup
    this.form = new FormGroup({
      firstname: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[A-Za-z].*"),
        ],
      }),
      lastname: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[A-Za-z].*"),
        ],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phoneNumber: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("[6-9][0-9]{9}")],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  //picking image and checking it's type
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  //on Add user
  onAddUser() {
    if (this.form.invalid) {
      return;
    }
    this.userService.createUser(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.phoneNumber,
      this.form.value.image
    );
    this.router.navigate(["/"]);
    this.toastr.success("user created", "success", {
      timeOut: 2000,
    });
    this.form.reset();
  }
  //reset  handler
  onReset() {
    this.form.reset();
    this.toastr.success("form reset!", "success", {
      timeOut: 2000,
    });
  }
  onGoBack() {
    this.router.navigate(["/"]);
  }
}
