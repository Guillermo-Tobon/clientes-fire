import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

import { ClientesService } from 'src/app/services/clientes.service';
import { FormCliente } from 'src/app/interfaces/clientes-form.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  public dataClientes:any[] = [];

  constructor(
              private clientesServ: ClientesService,
              private router: Router
  ) { }

  ngOnInit(): void {

    this.ontenerClientes();
  }


  /**
   * Método para obtener todos los clientes
   */
  public ontenerClientes = () =>{

    this.clientesServ.obtenerClientesService().subscribe( data =>{

      this.dataClientes = data['clientes'];
    
    }, (err:any) =>{
      //En caso de un error
      Swal.fire('Error', 'En este momento no podemos procesar los datos. Inténtelo más tarde', 'error');
    })

  }


  /**
   * Método para ver el detalle del cliente
   * @param cliente => Objeto con el detalle del cliente
   */
  public verDetalleCliente = (cliente:any) =>{

    const data = JSON.stringify(cliente);
    this.router.navigate(['dashboard/detalle-cliente', data])
  }


}
