import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Headers, Http, Response } from '@angular/http';

import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { URL_LIST } from '../url-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SequenceService {

  private headers: HttpHeaders;

  constructor( private http: HttpClient ) {
    this.headers = new HttpHeaders().set('Content-Type','application/json');
  }

  getSequencesList(): Observable< SecuenciaActividades[] >{
    return this.http.get<SecuenciaActividades[]>( URL_LIST.secuenciaAll );
  }

  deleteSequence( idSecuencia: number ) {
    return this.http.delete( URL_LIST.eliminarSecuencia.replace("{0}", String(idSecuencia)) ).subscribe( response => {
      console.log( response );
    });
  }

}
