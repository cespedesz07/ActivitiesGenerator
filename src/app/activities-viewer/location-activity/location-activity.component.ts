import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit, ViewChild,
  OnChanges, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { ActivitiesViewerComponent } from '../activities-viewer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ResultsModalComponent } from '../results-modal/results-modal.component';

@Component({
  selector: 'app-location-activity',
  templateUrl: './location-activity.component.html',
  styleUrls: ['./location-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "(click)": "onClick($event)"
  }
})
export class LocationActivityComponent implements OnInit {

  private WORD_CLASS: string;

  private difficultLevels: number[];
  private parser: DOMParser;
  taggedHTML: string;
  private XML: string;
  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private validWords: string[];
  private selectedWords: BehaviorSubject<string[]>;
  addedWords: string;
  resultsOK: boolean;

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute, 
    private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.WORD_CLASS = "word-to-click";
    this.parser = new DOMParser();
    this.taggedHTML = "";
    this.XML = "";
    this.validWords = [];
    this.selectedWords = new BehaviorSubject<string[]>([]);
    this.resultsOK = false;
    this.route.params.subscribe( params => {
      this.idSecuencia = params.id;
    });
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
            this.validWords.push( tokens[j].getAttribute('form').trim() );
          }
          this.taggedHTML += `<span class="${this.WORD_CLASS}" (click)="addWord()"> ${tokens[j].getAttribute('form')} </span>`;        
        }
      }
      console.log( this.validWords );
    });
  }

  ngOnInit() {
    this.addedWords = "";
    this.getSequence();
    this.selectedWords.subscribe( selected => {
      this.addedWords += selected + "\n";
    });
  }

  onClick( event: any ): void {
    if ( event.target.className === this.WORD_CLASS ) {
      let selectedWord = event.target.innerHTML.trim();
      this.selectedWords.next( selectedWord );
    }
  }

  clearWords() {
    this.addedWords = "";
    this.resultsOK = false;
  }

  validateResults() {
    let addedWordsSplit = this.addedWords.trim().split("\n");
    let i = 0;
    let foundWrongWord = false;
    while ( i < addedWordsSplit.length && !foundWrongWord ) {
      if ( this.validWords.indexOf( addedWordsSplit[i] ) === -1 ){
        foundWrongWord = true;
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
    this.router.navigate(['activities-viewer', this.idSecuencia, 'systematization']);
  }

}
