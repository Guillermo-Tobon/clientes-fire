import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ActualizacionClientesComponent } from './actualizacion-clientes/actualizacion-clientes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { 
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'} },
      { path: 'registro-cliente', component: RegistroClienteComponent, data: {titulo: 'Registro de Clientes'} },
      { path: 'lista-clientes', component: ListaClientesComponent, data: {titulo: 'Lista de Clientes'} },
      { path: 'actualizacion-clientes/:cliente', component: ActualizacionClientesComponent, data: {titulo: 'Actualización Clientes'} },
      { path: 'detalle-cliente/:cliente', component: DetalleClienteComponent, data: {titulo: 'Detalle de Cliente'} },
    ]
  },  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
