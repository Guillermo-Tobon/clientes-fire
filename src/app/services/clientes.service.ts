import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { FormCliente } from '../interfaces/clientes-form.interface';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public httpOptions:any = {}; 

  constructor( private http: HttpClient ) { 
    
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtZW1vQGhvdG1haWwuY29tIiwiaWF0IjoxNjEwMTIwNDA5LCJleHAiOjE2MTAxNjM2MDl9.zUjEEaCdqrAgBNs1OaGAY8WjA1eSsQHQxtyNCq614Ro'}) };

  }


  /**
   * Método de servicio para insertar el cliente
   * @param formData => datos del formulario
   */
  public registrarClienteService = ( formData:FormCliente ) =>{

    const json = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      fechanaci: formData.fechanaci,
      compania: formData.compania,
      estado: formData.estado == true? 1 : 0 
    }

    return this.http.post(`${BASE_URL}/insertCliente`, json, this.httpOptions).pipe(
      tap( ( resp:any ) =>{})
    )
  }


  /**
   * Método de servicio para obtener los cliente
   */
  public obtenerClientesService = () =>{

    return this.http.get<FormCliente>(`${BASE_URL}/clientes`, this.httpOptions ).pipe(
      map( ( (data) => data ) )
    )
  }






}
