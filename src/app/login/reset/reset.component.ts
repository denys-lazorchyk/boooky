import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;

  constructor(private snackbar: MatSnackBar, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        login: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
            ),
          ])
        ),
        confirm_password: new FormControl('', Validators.required),
      },
      { validator: this.matchValidator('password', 'confirm_password') }
    );
  }

  ngOnInit(): void {}

  getErrorMessage() {
    return this.password?.hasError('required')
      ? 'Password is required.'
      : this.password?.hasError('minlength')
      ? 'Password should have at least 8 characters.'
      : this.password?.hasError('pattern')
      ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      : this.password?.hasError('maxlength')
      ? 'Password should have between 8 and 64 characters'
      : '';
  }

  matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      if (sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value) {
        this.confirm_password?.setErrors({ mismatch: true });
      }

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  resetPassword(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  showSnackbarMessage(message: string, className: string = 'error-snackbar') {
    this.snackbar.open(message, 'OK', {
      duration: 3000,
      panelClass: className,
    });
  }

  get login() {
    return this.form?.get('login');
  }

  get password() {
    return this.form?.get('password');
  }

  get confirm_password() {
    return this.form?.get('confirm_password');
  }
}
