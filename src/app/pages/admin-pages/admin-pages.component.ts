import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  
  visible = false;
  public isLoadingGeneral = false;
  public idUser !: any;
  public user: User | undefined;

  
  constructor( private authenticationService: AuthService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()) {
      this.user = this.authenticationService.getUserFromLocalCache();
      this.idUser=this.user.id;
     } else {
       this.router.navigateByUrl("/auth/login");
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  info(): void {
    this.modal.warning({
      nzTitle: '¿Seguro que deseas cerrar sesión?',
      // nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancelar',
      nzOnOk: () => { this.onLogOut() }
    });
  }

  public getInitials() {
    let nameString = this.user?.nombre + ' ' + this.user?.amaterno + ' ' + this.user?.apaterno
    const fullName = nameString.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['auth/login']);
    this.createMessage('success', 'Has cerrado sesión exitosamente 😀');
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }


}
