import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-admin-page',
  templateUrl: './dashboard-admin-page.component.html',
  styleUrls: ['./dashboard-admin-page.component.css']
})
export class DashboardAdminPageComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }


}
