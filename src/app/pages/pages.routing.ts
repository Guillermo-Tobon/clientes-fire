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
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'registro-cliente', component: RegistroClienteComponent },
      { path: 'lista-clientes', component: ListaClientesComponent },
      { path: 'actualizacion-clientes/:cliente', component: ActualizacionClientesComponent },
      { path: 'detalle-cliente/:cliente', component: DetalleClienteComponent },
    ]
  },  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
