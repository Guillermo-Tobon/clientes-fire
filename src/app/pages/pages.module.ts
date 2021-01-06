import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ActualizacionClientesComponent } from './actualizacion-clientes/actualizacion-clientes.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    RegistroClienteComponent,
    ListaClientesComponent,
    ActualizacionClientesComponent,
    PerfilComponent,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    RegistroClienteComponent,
    ListaClientesComponent,
    ActualizacionClientesComponent,
    PerfilComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
