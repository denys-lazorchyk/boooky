import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface validationMessagesInterface {
  [key: string]: { type: string; message: string }[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  constructor(public snackbar: MatSnackBar, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
