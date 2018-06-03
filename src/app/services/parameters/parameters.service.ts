import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { URL_LIST } from '../url-list';

import { Nivel } from '../../model/Nivel';
import { Actividad } from '../../model/Actividad';
import { Texto } from '../../model/Texto';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';


@Injectable()
export class ParametersService {

  private headers: HttpHeaders;

  constructor( private http: HttpClient /*private db: AngularFireDatabase*/ ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getLevelsParams(): Observable< Nivel[] > {
    // return this.db.list('level').valueChanges();
    return this.http.get<Nivel[]>( URL_LIST.nivelAll );
  }

  getActivities(): Observable< Actividad[] > {
    return this.http.get<Actividad[]>( URL_LIST.actividadAll );
  }

  getTexts( nivel: number ): Observable< Texto[] > {
    return this.http.get<Texto[]>( URL_LIST.textoByNivel.replace("{0}", String(nivel)) );
  }

  saveSequence( secuenciaActividades: SecuenciaActividades ) {
    return this.http.post( URL_LIST.registrarSecuencia, secuenciaActividades, {headers: this.headers} ).subscribe( response => {
      console.log( response );
    });
  }

}
