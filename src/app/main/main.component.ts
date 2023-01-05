import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  firstFormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(142)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.maxLength(142),
    ]),
  });
  secondFormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  thirdFormGroup = this.formBuilder.group({
    comment: new FormControl('', [
      Validators.required,
      Validators.maxLength(2700),
    ]),
  });

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('stepper') stepper!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  triggerResize() {
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  get name() {
    return this.firstFormGroup.get('name');
  }

  get surname() {
    return this.firstFormGroup.get('surname');
  }

  get email() {
    return this.secondFormGroup.get('email');
  }

  get comment() {
    return this.thirdFormGroup.get('comment');
  }

  submitForm() {
    this.snackBar.open('Message is being proceeded', 'OK', {
      duration: 3000,
    });
  }
}
