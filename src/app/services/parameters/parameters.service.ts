import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { URL_LIST } from '../url-list'

import { Nivel } from '../../model/Nivel';
import { Actividad } from '../../model/Actividad';
import { Texto } from '../../model/Texto';


@Injectable()
export class ParametersService {

  constructor( private http: HttpClient /*private db: AngularFireDatabase*/ ) {
    
  }

  getLevelsParams(): Observable< Nivel[] > {
    // return this.db.list('level').valueChanges();
    return this.http.get<Nivel[]>( URL_LIST.nivelAll )
  }

  getActivities(): Observable< Actividad[] > {
    return this.http.get<Actividad[]>( URL_LIST.actividadAll );
  }

  getTexts( nivel: string ): Observable< Texto[] > {
    return this.http.get<Texto[]>( URL_LIST.textoByNivel.replace("{0}", nivel) );
  }

}
