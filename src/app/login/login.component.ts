import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Subscriber } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  ERR_Email = 'Email is required!';
  ERR_PASSWORD = 'Password is required!';

  form!: FormGroup;
  formErrors: any;
  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setupform();
  }

  setupform() {
    this.formErrors = {
      email: {},
      password: {},
    };
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      type: ['user'],
    });

    // value change at form level
    this.form.valueChanges.subscribe(() => {
      for (const field in this.formErrors) {
        if (!this.formErrors.hasOwnProperty(field)) {
          continue;
        }

        // Clear previous errors
        this.formErrors[field] = {};

        // Get the control
        const control = this.form.get(field);
        if (control && !control.valid) {
          this.formErrors[field] = control.errors;
        }
      }
    });
  } // func

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.login.login(this.form.value).subscribe(
        (res: any) => {
          if (res) this._router.navigateByUrl('/dashboard');
        },
        (err) => {
          this._snackbar.open(err.message, '', {
            panelClass: ['snack_danger'],
          });
        }
      );
    }
  }
  typeArray = [
    { id: 1, value: 'user', display: 'User' },
    { id: 2, value: 'admin', display: 'Admin' },
  ];
}
