import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_LIST } from '../url-list';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { DataSource } from '@angular/cdk/table';
import { tap } from 'rxjs/operators';
import { Actividad } from '../../model/Actividad';
import { Nocion } from '../../model/Nocion';

@Injectable()
export class ActivityGenerationService {

  private headers: HttpHeaders;

  constructor( private http: HttpClient ) {
    this.headers = new HttpHeaders().set("Content-type", "text/plain")
  }

  getSequence( idSecuencia: number ): Observable<SecuenciaActividades> {
    return this.http.get<SecuenciaActividades>( URL_LIST.secuenciaOne.replace("{0}", String(idSecuencia)) );
  }

  getXML( idTexto: number ): Observable<string> {
    let URL = URL_LIST.contenidoTexto.replace( "{0}", String(idTexto) );
    return this.http.get( URL, { responseType: 'text' })
      .pipe( tap( retrievedXMLString => retrievedXMLString) );
  }

  getSequenceActivities( idSecuencia: number ): Observable<Actividad[]> {
    return this.http.get<Actividad[]>( URL_LIST.actividadesOfSecuencia.replace( "{0}", String(idSecuencia) ) );
  }

  getNotion( idNocion: number ): Observable<Nocion> {
    return this.http.get<Nocion>( URL_LIST.nocionOne.replace( "{0}", String(idNocion) ) );
  }

}
