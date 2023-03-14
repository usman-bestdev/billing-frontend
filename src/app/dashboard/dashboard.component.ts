import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  form!: FormGroup;
  formErrors: any;

  constructor(
    private service: AppService,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}
  userData: any;
  loadNavbar: Boolean = false;
  ngOnInit(): void {
    this.getUserRecord();
  }
  getUserRecord() {
    this.service.getUserData().subscribe(
      (res) => {
        if (res) {
          this.userData = res;
          this.loadNavbar = true;
        }
      },
      (err) => {}
    );
  }

  setupform() {
    this.form = this.formBuilder.group({
      token: [null],
    });
  } // func

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
    }
  }
}
