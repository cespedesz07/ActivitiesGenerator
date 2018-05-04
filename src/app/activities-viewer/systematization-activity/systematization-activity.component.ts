import { Component, OnInit, AfterViewInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { ResultsModalComponent } from '../results-modal/results-modal.component';

@Component({
  selector: 'app-systematization-activity',
  templateUrl: './systematization-activity.component.html',
  styleUrls: ['./systematization-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "(click)": "onClick($event)"
  }
})
export class SystematizationActivityComponent implements OnInit {

  private difficultLevels: number[];
  private parser: DOMParser;
  taggedHTML: string;
  private XML: string;
  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private validWords: string[];
  // private selectedWords: BehaviorSubject<string[]>;
  private addedWords: string;
  private resultsOK: boolean;
  private WORD_CLASS: string;

  private xmlCtagsArray: string[];
  private indexesArray: any;

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute, 
    private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog ) {
    // this.WORD_CLASS = "word-to-click";
    this.parser = new DOMParser();
    this.taggedHTML = "";
    this.XML = "";
    this.validWords = [];
    // this.selectedWords = new BehaviorSubject<string[]>([]);
    this.resultsOK = false;
    this.xmlCtagsArray = [];
    this.indexesArray = [];
    this.WORD_CLASS = "custom-options";
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
    console.log( idTexto, this.idSecuencia );
    this.activityGenerationService.getXML( idTexto ).subscribe( retrievedXMLString => {
      this.XML = retrievedXMLString;
      this.generateActivity();
    });
  }

  generateActivity() {
    this.activityGenerationService.getNotion( this.secuenciaActividades.idNocion ).subscribe( retrievedNotion => {
      this.xmlCtagsArray = retrievedNotion.xmlCtags.split(",");
      console.log( this.xmlCtagsArray );
      let xmlDoc = this.parser.parseFromString( this.XML, "text/xml" );  
      let sentences = xmlDoc.getElementsByTagName("sentence");
      for ( let i = 0; i < sentences.length; i++ ) {
        let tokens = sentences[i].getElementsByTagName("token")
        for ( let j = 0; j < tokens.length; j++ ) {
          if ( this.xmlCtagsArray.includes( tokens[j].getAttribute("ctag") ) ) {
            this.taggedHTML += `<div id="options${i + "" + j}">${ this.generateDropdown( tokens[j].getAttribute('form'), i + "" + j ) }</div>`;
          }
          else {
            this.taggedHTML += tokens[j].getAttribute('form') + " ";
          }
        }
      }
      console.log( this.indexesArray );
    });
  }

  onClick( event: any ):  void {
    let eventTarget = event.target.className;
    if ( eventTarget.split(" ").indexOf( this.WORD_CLASS ) !== -1 ) {
      let customObject = this.indexesArray.filter( item => {
        return item.id === event.target.id;
      })[0];
      if ( customObject.selected ) {
        customObject.selected = false;
        document.getElementById( customObject.id ).className = this.WORD_CLASS;
      }
      else {
        customObject.selected = true;
        document.getElementById( customObject.id ).className = this.WORD_CLASS + " active";
      }
      
      let selectedWord = event.target.innerHTML.trim();
      
    }
  }

  generateDropdown( mainWord: string, customIndex: string ): any {
    var customDropdown = `<ul><li><span>${mainWord}</span><ul class="dropdown-list">`
    this.xmlCtagsArray.forEach( (tag, index) => {
      let tagString = "";
      switch ( tag ) {
        case "JJ":
          tagString = "Adjective";
          break;
        case "JJR":
          tagString = "Adjective Comparative";
          break;
        case "JJS":
          tagString = "Adjective Superlative";
          break;
        case "RB":
          tagString = "Adverb";
          break;
        case "RBR":
          tagString = "Adverb Comparative";
          break;
        case "RBS":
          tagString = "Adverb Superlative";
          break;
        case "WRB":
          tagString = "Interrogative";
          break;
        default:
          break;
      }
      customDropdown += `<li id="${customIndex + index }" class="${this.WORD_CLASS}" (click)="selectOption()">${tagString}</li>`
      this.indexesArray.push({
        id: customIndex + index,
        selected: false,
        word: mainWord
      });
    });
    customDropdown += "</ul></li></ul>"
    return customDropdown;
  }

  ngOnInit() {
    this.getSequence();
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

}
