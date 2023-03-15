import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private service: DashboardService,
    private appService: AppService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}
  displayedColumns: string[] = ['title', 'cost', 'action'];
  dataSource: any;
  routeInvoke: any;
  ngOnInit(): void {
    this.getRecord();
    this.getUserTokenRecord();
  }

  getRecord() {
    this.service.getAllRoutes().subscribe(
      (res) => {
        if (res) {
          this.dataSource = res;
        }
      },
      (err) => {}
    );
  }

  getUserTokenRecord() {
    this.service.getUserTokenRecord().subscribe(
      (res) => {
        if (res) {
          this.routeInvoke = res;
        }
      },
      (err) => {}
    );
  }

  hitRoute(id: number) {
    this.service.invokeToken(id).subscribe(
      (res) => {
        if (res) {
          this.appService.navBarData.next(true);
          this.getUserTokenRecord();
        }
      },
      (err) => {}
    );
  }
  addToken() {
    this._router.navigateByUrl('/token');
  }
  // setupform() {
  //   this.form = this.formBuilder.group({
  //     token: [null],
  //   });
  // } // func

  // onSubmit() {
  //   this.form.markAllAsTouched();
  //   this.form.markAsDirty();
  //   this.form.updateValueAndValidity();

  //   if (this.form.valid) {
  //   }
  // }
}
