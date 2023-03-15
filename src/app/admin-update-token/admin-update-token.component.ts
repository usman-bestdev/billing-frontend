import { Component } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard/admin-dashboard.service';
import { AdminUpdateTokenService } from './admin-update-token.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdminUpdateTokenDialogComponent } from '../admin-update-token-dialog/admin-update-token-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-update-token',
  templateUrl: './admin-update-token.component.html',
  styleUrls: ['./admin-update-token.component.scss'],
})
export class AdminUpdateTokenComponent {
  displayedColumns: string[] = ['title', 'cost', 'action'];
  dataSource: any;

  constructor(
    private service: AdminUpdateTokenService,
    private _router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getRecord();
  }
  getRecord() {
    this.service.getRoutesData().subscribe(
      (res) => {
        if (res) this.dataSource = res;
      },
      (err) => {}
    );
  }
  update(id: number) {
    const dialogRef = this.dialog.open(AdminUpdateTokenDialogComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getRecord();
    });
  }
  onBack() {
    this._router.navigateByUrl('admin-dashboard');
  }
}
