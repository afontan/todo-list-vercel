import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  user: User = {
    email: "",
    password: ""
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      await this.userService.signup(this.user).subscribe(resp => {
        this.router.navigate(['/login']);
      }, error => {
        this.loginInvalid = true;
      });
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
