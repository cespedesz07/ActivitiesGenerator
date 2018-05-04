import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SequenceService } from '../../services/sequence/sequence.service';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';

@Component({
  selector: 'app-delete-sequence-modal',
  templateUrl: './delete-sequence-modal.component.html',
  styleUrls: ['./delete-sequence-modal.component.css']
})
export class DeleteSequenceModalComponent implements OnInit {

  secuenciaActividades: SecuenciaActividades;

  constructor( private dialogRef: MatDialogRef<DeleteSequenceModalComponent>, 
               @Inject(MAT_DIALOG_DATA) private data: { secuenciaActividades: SecuenciaActividades }, 
               private sequenceService: SequenceService) { }

  ngOnInit() {
    this.secuenciaActividades = this.data.secuenciaActividades;
  }

  deleteSequence() {
    this.sequenceService.deleteSequence( this.secuenciaActividades.id );
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close()
  }
}
