import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
          if (res) {
            if (this.form.value.type == 'user')
              this._router.navigateByUrl('/dashboard');
            if (this.form.value.type == 'admin')
              this._router.navigateByUrl('/admin-dashboard');
          }
        },
        (err) => {}
      );
    }
  }
  typeArray = [
    { id: 1, value: 'user', display: 'User' },
    { id: 2, value: 'admin', display: 'Admin' },
  ];
}
