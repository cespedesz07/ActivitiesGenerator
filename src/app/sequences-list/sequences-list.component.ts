import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../services/sequence/sequence.service'
import { Observable } from 'rxjs/Observable';

import { SecuenciaActividades } from '../model/SecuenciaActividades'

@Component({
  selector: 'sequences-list',
  templateUrl: './Sequences-list.component.html',
  styleUrls: ['./Sequences-list.component.css']
})
export class SequencesListComponent implements OnInit {


  // Attributes
  activitiesSequence: Observable< SecuenciaActividades[] >;
  displayedColumns: String[] = ["fecha_generacion", "usuario_realizador", "nivel_idioma"]

  // Methods
  constructor( private sequenceService: SequenceService ) { }

  getSequencesList(): void {
  }

  ngOnInit() {
    this.getSequencesList()
  }

}
