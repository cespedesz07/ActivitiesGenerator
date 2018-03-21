import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Parameter } from '../../model/parameter';
import { LEVELS_PARAMS, NOTIONS_PARAMS } from './mock-parameters';

@Injectable()
export class ParametersService {

  constructor( private http: Http ) { }

  getLevelsParams(): Promise< Array<Parameter> > {
    return new Promise( (resolve, reject) => {
      resolve(LEVELS_PARAMS);
    });
    
  }

  getNotionsParams(): Promise< Array<Parameter> > {
    return new Promise( (resolve, reject) => {
      resolve(NOTIONS_PARAMS);
    });
  }

}
