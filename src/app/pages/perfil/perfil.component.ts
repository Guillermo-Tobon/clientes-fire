import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfil:any[] = [];

  constructor(
              private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.perfil = this.authServ.usuario;
    console.log(this.perfil)
  }

}
