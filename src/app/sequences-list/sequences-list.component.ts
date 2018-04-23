import { Component, OnInit } from '@angular/core';
import { SequenceService } from '../services/sequence/sequence.service'
import { Observable } from 'rxjs/Observable';

import { SecuenciaActividades } from '../model/SecuenciaActividades'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteSequenceModalComponent } from './delete-sequence-modal/delete-sequence-modal.component';
import { Route } from '@angular/compiler/src/core';
import { AppRoutingModule } from '../modules/app-routing/app-routing.module';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'sequences-list',
  templateUrl: './Sequences-list.component.html',
  styleUrls: ['./Sequences-list.component.css']
})
export class SequencesListComponent implements OnInit {


  // Attributes
  private sequencesList: Observable< SecuenciaActividades[] >;
  private displayedColumns: String[] = [
    "nombre", "fechaGeneracion", "idUsuarioRealizador", 
    "idNivel", "idNocion", "actions"
  ]

  private areSequencesLoaded: boolean;
  private dialogConfig: MatDialogConfig;
  private navigationExtras: NavigationExtras;


  // Methods
  constructor( private sequenceService: SequenceService, public dialog: MatDialog, private router: Router ) {
    this.areSequencesLoaded = false;
    this.dialogConfig = new MatDialogConfig();
  }

  getSequencesList(): void {
    this.sequencesList = this.sequenceService.getSequencesList();
    this.sequencesList.subscribe( (sequencesListArray) => {
      this.areSequencesLoaded = sequencesListArray.length > 0;
    });
  }

  ngOnInit() {
    this.getSequencesList();
  }

  openDeleteSequenceModal( secuenciaActividades: SecuenciaActividades ): void {
    this.dialogConfig.data = {
      secuenciaActividades: secuenciaActividades
    }
    let deleteSequenceModal = this.dialog.open( DeleteSequenceModalComponent, this.dialogConfig );

    deleteSequenceModal.afterClosed().subscribe( result => {
      this.getSequencesList();
    });
  }

  viewSequence( secuenciaActividades: SecuenciaActividades ) {
    this.router.navigate(['activities-viewer', secuenciaActividades.id]);
  }

}
