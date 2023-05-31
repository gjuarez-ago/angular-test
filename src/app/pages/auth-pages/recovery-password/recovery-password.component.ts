import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CustomHttpRespone } from 'src/app/models/CustomHttpResponse';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  public user!: User;
  public validateForm!: FormGroup;
  public subscriptions : Subscription[] = [];
  public isSpinning = false;

  placement = 'topRight';

  constructor(
    private ngxSpinner: NgxSpinnerService,
    private authenticationService : AuthService,
    private fb: FormBuilder, 
    private router: Router, 
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/admin/validate-elements');
    }
    
  }

  submitForm(): void {

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    
    if(!this.validateForm.valid) {
      return ; 
    }
    this.ngxSpinner.show();
    this.isSpinning = true;
    let user = this.validateForm.value;
    this.subscriptions.push(
      this.authenticationService.recoveryPassword(user).subscribe(
        (response: CustomHttpRespone) => {   
          this.isSpinning = false;
          this.router.navigateByUrl('/auth/login');
          this.createBasicNotification('topRight');
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.isSpinning = false;
          this.ngxSpinner.hide();
          this.createMessage("error",  errorResponse.error.message);
        }
      )
    );

    if(!this.validateForm.valid) {
      this.createMessage("warning", "¡Es necesario llenar todos los campos!");
      return ; 
    }
  }

  
  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Hemos encontrado tu correo, casi listo!',
      'En estos momentos es necesario que revises tu bandeja de correo principal o spam para continuar con el proceso de recuperación de contraseña 😀',
      { nzPlacement: position, nzDuration: 12000 }
    );
    }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

}