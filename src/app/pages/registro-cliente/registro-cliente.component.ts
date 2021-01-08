import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public formSubmitted = false;

  public regisFormCliente = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    compania: ['', [Validators.required, Validators.minLength(5)]],
    fechanaci: ['', [Validators.required]],
    estado: [true, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private clientesServ: ClientesService
  ) { }

  ngOnInit(): void {
  }


  /**
   * Método para registrar nuevos clientes
   */
  public registrarCliente = () =>{
    this.formSubmitted = true;

    if ( this.regisFormCliente.invalid ) {
      return; 
    }

    this.clientesServ.registrarClienteService( this.regisFormCliente.value ).subscribe( resp =>{

      if ( resp.ok ) {
        Swal.fire('Bien hecho!', resp.msg, 'success');
        this.recargaPagina();
      } else {
        Swal.fire('Error', 'En este momento no podemos procesar los datos. Inténtelo más tarde', 'error');
        this.recargaPagina();
      }
      
    }, (err:any) =>{
      //En caso de un error
      Swal.fire('Error', err.error.msg, 'error');
      this.recargaPagina();
    })
    
  }




  public campoNoValido = (campo:any): boolean =>{
    if ( this.regisFormCliente.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


  public recargaPagina = () =>{
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

}
