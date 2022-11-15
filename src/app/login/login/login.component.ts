import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MockLoginService } from 'src/app/services/mock-login.service';

export interface validationMessagesInterface {
  [key: string]: { type: string; message: string }[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSub!: Subscription;
  form: FormGroup;
  validationMessages: validationMessagesInterface = {
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: "Login can't be shorter than 5 characters",
      },
    ],
  };

  constructor(
    public snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private loginService: MockLoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.loginSub = this.loginService
      .checkAuthentication(this.username?.value, this.password?.value)
      .subscribe((res: any) => {
        if (res?.responseCode === 200) {
          this.authService.setToken(res?.jwt);
          this.router.navigate(['/app']);
        } else {
          this.snackbar.open(
            'Unable to authenticate user. Please try again!',
            'OK',
            {
              duration: 3000,
            }
          );
        }
      });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
