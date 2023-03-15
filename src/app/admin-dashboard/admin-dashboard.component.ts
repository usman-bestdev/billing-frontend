import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  form!: FormGroup;
  formErrors: any;
  data: any = [];
  obj: any;
  displayedColumns: string[] = ['title', 'cost', 'invoke', 'total'];
  dataSource: any;

  constructor(
    private service: AdminDashboardService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getRecord();
  }

  getRecord() {
    this.service.getUsersData().subscribe(
      (res: any) => {
        if (res) {
          if (res?.length) {
            res.forEach((val: any) => {
              // let obj: any
              this.obj = { email: val?.email, detail: [] };
              if (val.userTokens.length) {
                val.userTokens.forEach((val1: any) => {
                  let innerObj = {
                    invoke: null,
                    cost: null,
                    title: '',
                    total: 0,
                  };
                  innerObj.invoke = val1?.invoke;
                  innerObj.title = val1?.route?.title;
                  innerObj.cost = val1?.route?.cost;
                  innerObj.total = val1?.route?.cost * val1?.invoke;
                  this.obj.detail.push(innerObj);
                });
              }
              this.data.push(this.obj);
            });
          }
        }
      },
      (err) => {}
    );
  }
  updateRoute() {
    this._router.navigateByUrl('/admin-token');
  }
}
