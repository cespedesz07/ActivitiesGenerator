import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';

@Component({
  selector: 'app-systematization-activity',
  templateUrl: './systematization-activity.component.html',
  styleUrls: ['./systematization-activity.component.css']
})
export class SystematizationActivityComponent implements OnInit {

  private difficultLevels: number[];
  private parser: DOMParser;
  private taggedHTML: string;
  private XML: string;
  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private validWords: string[];
  // private selectedWords: BehaviorSubject<string[]>;
  private addedWords: string;
  private resultsOK: boolean;

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute, 
    private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog ) {
    // this.WORD_CLASS = "word-to-click";
    this.parser = new DOMParser();
    this.taggedHTML = "";
    this.XML = "";
    this.validWords = [];
    //this.selectedWords = new BehaviorSubject<string[]>([]);
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
    let xmlDoc = this.parser.parseFromString( this.XML, "text/xml" );  
    let sentences = xmlDoc.getElementsByTagName("sentence");
    for ( let i = 0; i < sentences.length; i++ ) {
      let tokens = sentences[i].getElementsByTagName("token")
      for ( let j = 0; j < tokens.length; j++ ) {
        if ( tokens[j].getAttribute("pos") === "adjective" || 
             tokens[j].getAttribute("pos") === "adverb" ){
          this.validWords.push( tokens[j].getAttribute('form').trim() );
        }
        this.taggedHTML += `<span class="${this.WORD_CLASS}" (click)="addWord()"> ${tokens[j].getAttribute('form')} </span>`;        
      }
    }
  }

  ngOnInit() {
  }

}
