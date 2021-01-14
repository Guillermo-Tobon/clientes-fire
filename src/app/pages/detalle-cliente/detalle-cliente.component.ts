import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  public cliente:any;
  public estado:string;
  public mensajeCumple:string = '';
  public timeElapsed = Date.now();
  public today = new Date(this.timeElapsed).toJSON();

  constructor(
              private routeActive: ActivatedRoute,
              private router: Router
  ) { }

  async ngOnInit() {

    await this.routeActive.params.subscribe( data => {
      this.cliente = JSON.parse( data['cliente'] );  

      if (this.cliente.estado_cli === 1) {
        this.estado = 'Activo';
      } else {
        this.estado = 'Inactivo';        
      }
    });


    this.validarCumpleanos(this.cliente.fechanaci_cli, this.today);

  }


  /**
   * Método para validar el cumpleaños del cliente
   * @param fechaNaci => Fecha de nac/to del cliente
   * @param fechaHoy => Fecha de hoy
   */
  public validarCumpleanos = (fechaNaci:any, fechaHoy:any) =>{
    fechaNaci = fechaNaci.split('T');
    let fechaNaciNew = fechaNaci[0].split('-')
    fechaNaciNew = `${fechaNaciNew[1]}-${fechaNaciNew[2]}`;
    
    fechaHoy = fechaHoy.split('T');
    let fechaHoyNew = fechaHoy[0].split('-');
    fechaHoyNew = `${fechaHoyNew[1]}-${fechaHoyNew[2]}`;

    if ( fechaNaciNew === fechaHoyNew ) {
      this.mensajeCumple = 'Hoy es su cumpleaños!!'; 
    }
  }



  public volverListaClientes = () =>{
    this.router.navigate(['dashboard/lista-clientes'])
  }


  public irActualizarCliente = (cliente:any) =>{
    const data = JSON.stringify(cliente);
    this.router.navigate(['dashboard/actualizacion-clientes', data])
  }





}
