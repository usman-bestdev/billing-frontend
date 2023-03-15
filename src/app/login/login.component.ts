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
  form!: FormGroup;
  formErrors: any;
  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      type: ['user'],
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
