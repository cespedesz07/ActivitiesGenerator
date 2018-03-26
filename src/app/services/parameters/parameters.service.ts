import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Parameter } from '../../model/parameter';
import { LEVELS_PARAMS, NOTIONS_PARAMS } from './mock-parameters';

@Injectable()
export class ParametersService {

  constructor( /*private http: Http*/ private db: AngularFireDatabase ) {
    
  }

  getLevelsParams(): Observable< any[] > {
    return this.db.list('level').valueChanges();
  }

  getNotionsParams(): Promise< Array<Parameter> > {
    return new Promise( (resolve, reject) => {
      resolve(NOTIONS_PARAMS);
    });
  }

}
