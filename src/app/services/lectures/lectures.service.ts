import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_LIST } from '../url-list';
import { Lectura } from '../../model/Lectura';
import { Observable } from 'rxjs/Observable';
import { IEstructuraEmail } from '../../model/IEstructuraEmail';

@Injectable()
export class LecturesService {

  private headers: HttpHeaders;

  constructor( private http: HttpClient /*private db: AngularFireDatabase*/ ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getLecturesByNotion(nocion: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>( URL_LIST.lecturaByNocion.replace('{0}', String(nocion)) );
  }

  getLecturePath( idLectura: string ): String {
    return URL_LIST.lecturaPath.replace( '{0}', idLectura );
  }

  sendTextToProfessor( estructuraEmail: IEstructuraEmail ) {
    return this.http.post( URL_LIST.enviarEmail, estructuraEmail, {headers: this.headers} ).subscribe( response => {
      console.log( response );
    });
  }

}
