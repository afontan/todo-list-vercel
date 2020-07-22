import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid: boolean = false;
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
      await this.userService.login(this.user).subscribe(resp => {
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('userId', resp['user']['id']);
        this.router.navigate(['/home']);
      }, error => {
        this.loginInvalid = true;
    });
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
