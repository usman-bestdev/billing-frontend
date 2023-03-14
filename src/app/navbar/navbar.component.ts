import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() userData: any;
  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private app: AppService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userData;
  }
}
