import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { ResultsModalComponent } from '../results-modal/results-modal.component';

@Component({
  selector: 'app-completion-activity',
  templateUrl: './completion-activity.component.html',
  styleUrls: ['./completion-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompletionActivityComponent implements OnInit {

  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private XML: string;
  private parser: DOMParser;
  validWords: any;

  taggedHTML: string;
  resultsOK: boolean;

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute,
    private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog ) {
      this.parser = new DOMParser();
      this.validWords = [];
      this.taggedHTML = '';
      this.resultsOK = false;
      this.route.params.subscribe( params => {
        this.idSecuencia = params.id;
      });
  }

  ngOnInit() {
    this.getSequence();
  }

  getSequence(): void {
    this.activityGenerationService.getSequence( this.idSecuencia ).subscribe( (secuenciaActividades) => {
      this.secuenciaActividades = secuenciaActividades;
      this.getXML( this.secuenciaActividades.idTexto );
    });
  }

  getXML( idTexto: number ): void {
    this.activityGenerationService.getXML( idTexto ).subscribe( retrievedXMLString => {
      this.XML = retrievedXMLString;
      this.generateActivity();
    });
  }

  generateActivity() {
    this.activityGenerationService.getNotion( this.secuenciaActividades.idNocion ).subscribe( retrievedNotion => {
      const xmlCtagsArray = retrievedNotion.tagsNociones.map( tagsObject => tagsObject.tag );
      const xmlDoc = this.parser.parseFromString( this.XML, 'text/xml' );
      const sentences = xmlDoc.getElementsByTagName('sentence');
      for ( let i = 0; i < sentences.length; i++ ) {
        const tokens = sentences[i].getElementsByTagName('token');
        for ( let j = 0; j < tokens.length; j++ ) {
          if ( xmlCtagsArray.includes( tokens[j].getAttribute('ctag') ) ) {
            this.validWords.push({
              id: i + '' + j,
              correct: tokens[j].getAttribute('form')
            });
            this.taggedHTML += `<div class="input-word"><input id="${i + '' + j}" type="text"/></div>`;
          }
          else {
            this.taggedHTML += `<span (click)="addWord()"> ${tokens[j].getAttribute('form')} </span>`;
          }
        }
      }
      console.log( this.validWords );
    });
  }

  validateResults() {
    let i = 0;
    let foundWrongWord = false;
    while ( i < this.validWords.length && !foundWrongWord ) {
      const writtenWord: any = document.getElementById( this.validWords[i].id );
      console.log(  writtenWord.value );
      if ( !!writtenWord.value ) {
        if ( this.validWords[i].correct !== writtenWord.value ) {
          foundWrongWord = true;
        }
      }
      i++;
    }
    if ( !foundWrongWord ) {
      this.resultsOK = true;
      this.dialog.open( ResultsModalComponent );
    }
    else {
      this.resultsOK = false;
      this.snackBar.open( "There are words which doesn't belongs to the Category", "Close" );
    }
  }

  navigateToNextActivity() {
    this.router.navigate(['activities-viewer', this.idSecuencia, 'lecture']);
  }

}
