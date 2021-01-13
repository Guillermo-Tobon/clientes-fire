import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public usuario:any[] = [];

  constructor(
              private authServ: AuthService    
  ) { }

  ngOnInit(): void {
    this.usuario = this.authServ.usuario;

  }

}
