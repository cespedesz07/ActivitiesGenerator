import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../services/sequence/sequence.service'

import { Sequence } from '../model/sequence'

@Component({
  selector: 'sequences-list',
  templateUrl: './Sequences-list.component.html',
  styleUrls: ['./Sequences-list.component.css']
})
export class SequencesListComponent implements OnInit {


  // Attributes
  sequencesList: Sequence[];
  displayedColumns: String[] = ["id", "date", "user", "level", "notion"]

  // Methods
  constructor( private sequenceService: SequenceService ) { }

  getSequencesList(): void {
    this.sequenceService.getSequencesList().
      then( sequencesList => this.sequencesList = sequencesList )
  }

  ngOnInit() {
    this.getSequencesList()
  }

}
