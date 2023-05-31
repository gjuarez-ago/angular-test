import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  isCollapsed = false;
  public visible = false;

  
  constructor(
   
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.visible = false;
  }

  open() {
    this.visible = true;
  }

}
