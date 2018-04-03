import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { SecuenciaActividades } from '../../model/SecuenciaActividades';

@Injectable()
export class SequenceService {

  constructor() { }

  getSequencesList(): Observable< SecuenciaActividades[] >{
    return;  
  }

}
