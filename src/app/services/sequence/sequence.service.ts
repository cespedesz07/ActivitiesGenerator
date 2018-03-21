import { Injectable } from '@angular/core';

import { Sequence } from '../../model/sequence';
import { SEQUENCES_LIST } from './mock-sequence';

@Injectable()
export class SequenceService {

  constructor() { }

  getSequencesList(): Promise< Array<Sequence> >{
    return new Promise( (resolve, reject) => {
      resolve( SEQUENCES_LIST );
    })
  }

}
