import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdminUpdateTokenComponent } from '../admin-update-token/admin-update-token.component';
import { AdminUpdateTokenService } from '../admin-update-token/admin-update-token.service';
@Component({
  selector: 'app-admin-update-token-dialog',
  templateUrl: './admin-update-token-dialog.component.html',
  styleUrls: ['./admin-update-token-dialog.component.scss'],
})
export class AdminUpdateTokenDialogComponent {
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminUpdateTokenService,
    private dialogRef: MatDialogRef<AdminUpdateTokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.setupForm();
  }
  setupForm() {
    this.form = this.formBuilder.group({
      cost: [null, [Validators.required]],
    });
  } // func

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      console.log(this.form.value, this.data.id);
      this.service
        .updateRouteCost(this.data.id, this.form.value.cost)
        .subscribe(
          (res) => {
            if (res) this.dialogRef.close();
          },
          (err) => {}
        );
    }
  }
}
