import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-addtoken',
  templateUrl: './addtoken.component.html',
  styleUrls: ['./addtoken.component.scss'],
})
export class AddtokenComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private appService: AppService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }
  setupForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
    });
  } // func

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.dashboardService.addToken(this.form.value).subscribe(
        (res) => {
          if (res) this.appService.navBarData.next(true);
        },
        (err) => {}
      );
    }
  }
  onBack() {}
}
