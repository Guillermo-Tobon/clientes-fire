import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-actualizacion-clientes',
  templateUrl: './actualizacion-clientes.component.html',
  styleUrls: ['./actualizacion-clientes.component.css']
})
export class ActualizacionClientesComponent implements OnInit {

  public cliente:any;
  public formSubmitted = false;
  public updateFormCliente:any;

  constructor(
              private routeActive: ActivatedRoute,
              private clienteServ: ClientesService,
              private fb: FormBuilder,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe( data => {
      this.cliente = JSON.parse( data['cliente'] ) || [];  

      this.iniciarFormulario(this.cliente);
    });
  }



  /**
   * Método para actualizar el cliente
   */
  public actualizarCliente = () =>{
    this.formSubmitted = true;

    if ( this.updateFormCliente.invalid ) {
      return; 
    }

    this.clienteServ.updateClienteService(this.updateFormCliente.value).subscribe( (resp:any) =>{

      if(resp.ok){
        Swal.fire('Bien Hecho!', `Cliente ${this.updateFormCliente.get('nombre').value } actualizado con éxito.`, 'error');
        setTimeout(() => { this.router.navigate(['dashboard/lista-clientes']) }, 2000);

      } else {
        Swal.fire('Error', 'En este momento no se puede actualizar el cliente. Inténtelo más tarde.', 'error');
      }
      
    }, (err) =>{
      //En caso de un error
      Swal.fire('Error', err.error.msg, 'error');
    })


  }



  /**
   * Método para cargar el formulario
   * @param cliente => Información del cliente
   */
  public iniciarFormulario = (cliente:any) =>{

    const cumple = cliente['fechanaci_cli'].split('T');
    
    this.updateFormCliente = this.fb.group({
      nombre: [cliente['nombre_cli'], [Validators.required, Validators.minLength(3)]],
      email: [cliente['email_cli'], [Validators.required, Validators.email, Validators.minLength(6)]],
      telefono: [cliente['telefono_cli'], [Validators.required, Validators.minLength(6)]],
      compania: [cliente['compania_cli'], [Validators.required, Validators.minLength(5)]],
      descripcion: [cliente['descripcion_cli'], [Validators.required, Validators.minLength(20)]],
      fechanaci: [cumple[0], [Validators.required]],
      estado: [cliente['estado_cli'] === 1? true : false, [Validators.required, Validators.minLength(5)]],
      id: [cliente['id_cli'], [Validators.required, Validators.minLength(5)]],
    });
  }


/**
 * Método para validar los campos del formulario
 * @param campo => Valor del campo
 */
  public campoNoValido = (campo:any): boolean =>{
    if ( this.updateFormCliente.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


  public volverListaClientes = () =>{
    this.router.navigate(['dashboard/lista-clientes'])
  }

}
