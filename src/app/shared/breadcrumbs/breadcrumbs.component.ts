import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public tituloSubs: Subscription;

  constructor( private router: Router ) { 

    this.tituloSubs = this.getArgumentosRuta().subscribe( data =>{
      this.titulo = data.titulo;
      document.title = `Clientes Fire - ${data.titulo}`;
    })

  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }


  //Obtener argumentos de als rutas hijas
  public getArgumentosRuta = () =>{
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    );
  } 

}
