import { Component, OnInit, AfterViewInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { ResultsModalComponent } from '../results-modal/results-modal.component';
import { Nocion } from '../../model/Nocion';
import { TagNocion } from '../../model/TagNocion';
import { TipoNocion } from '../../model/TipoNocion';

@Component({
  selector: 'app-systematization-activity',
  templateUrl: './systematization-activity.component.html',
  styleUrls: ['./systematization-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'onClick( $event )'
  }
})
export class SystematizationActivityComponent implements OnInit {

  private difficultLevels: number[];
  private parser: DOMParser;
  taggedHTML: string;
  htmlString: string;
  private XML: string;
  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private validWords: string[];
  // private selectedWords: BehaviorSubject<string[]>;
  private addedWords: string;
  private resultsOK: boolean;
  private WORD_CLASS: string;

  private wordsArray: any;

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute, 
    private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog ) {

    this.parser = new DOMParser();

    this.htmlString = '';
    this.taggedHTML = '';

    this.XML = '';
    this.validWords = [];
    // this.selectedWords = new BehaviorSubject<string[]>([]);
    this.resultsOK = false;
    this.wordsArray = [];
    this.WORD_CLASS = 'custom-options';
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
      switch ( this.secuenciaActividades.idNocion ) {
        case 2:
          this.generateActivityPresentPerfect();
          break;
        case 3:
          this.generateActivityPastSimple();
          break;
        default:  // 1, 4 (Modals, Adj/Adv)
          this.generateActivityModalsAdjAdv();
          break;
      }
    });
  }

  onClick( event: any ) {
    if ( event.target.className.split(' ').indexOf( this.WORD_CLASS ) !== -1 ) {
      const clickedWordObject = this.wordsArray.filter( wordInArray => {
        return wordInArray.id === event.target.id.split('_')[0];
      })[0];
      console.log( clickedWordObject );
      if ( !clickedWordObject.selected ) {
        document.getElementById( event.target.id ).className = this.WORD_CLASS + ' active';
        clickedWordObject.selected = event.target.innerText.trim();
      }
      else {
        if ( event.target.innerText.trim() !== clickedWordObject.selected.trim() ) {
          document.getElementById( event.target.id ).className = this.WORD_CLASS + ' active';
          clickedWordObject.selected = event.target.innerText.trim();
        }
        else {
          document.getElementById( event.target.id ).className = this.WORD_CLASS;
          clickedWordObject.selected = '';
        }
      }
      // console.log( this.wordsArray );
      console.log( clickedWordObject );
    }
  }

  // Past Simple activity
  generateActivityPastSimple() {
    this.activityGenerationService.getNotion( this.secuenciaActividades.idNocion ).subscribe( retrievedNotion => {
      const tagsNocionesArray = retrievedNotion.tagsNociones;
      const xmlDoc = this.parser.parseFromString( this.XML, 'text/xml' );
      const sentences = xmlDoc.getElementsByTagName('sentence');
      for ( let i = 0; i < sentences.length; i++ ) {
        const tokens = sentences[i].getElementsByTagName('token');
        for ( let j = 0; j < tokens.length; j++ ) {
          this.generateDropdownWithSingleTagAndExampleWords( tagsNocionesArray, tokens[j], i + '' + j, retrievedNotion );
        }
      }
      this.taggedHTML = this.htmlString;
    });
    console.log( this.wordsArray );
  }
  generateDropdownPastSimple( tagsNocionesArray: TagNocion[], currentToken: any,
    dropdownIndex: string, retrievedNotion: Nocion ) {
      const currentTagNocion = tagsNocionesArray.filter( (tagNocion: TagNocion) => {
        if ( currentToken.getAttribute('ctag') === tagNocion.tag ) {
          return tagNocion;
        }
      })[0];
      if ( !!currentTagNocion ) {
        this.htmlString += `
        <div class="main-word-container" id="options${dropdownIndex}">
          ${ this.generateHTMLDropdownSingleTag( currentToken.getAttribute('form'), dropdownIndex, tagsNocionesArray ) }
        </div> `;
        const correctOption = tagsNocionesArray[0].tiposNociones.filter( (tipoNocion: TipoNocion) => {
          if ( tipoNocion.palabrasEjemplo.indexOf( currentToken.getAttribute('form') ) !== -1 ) {
            return tipoNocion.tipo;
          }
        })[0];
        this.wordsArray.push({
          id: dropdownIndex,
          selected: '',
          word: currentToken.getAttribute('form'),
          correct: correctOption.tipo
        });
      }
      else {
        this.htmlString += currentToken.getAttribute('form') + ' ';
      }
  }

  // Present Perfect Activity
  generateActivityPresentPerfect() {
    this.activityGenerationService.getNotion( this.secuenciaActividades.idNocion ).subscribe( retrievedNotion => {
      const tagsNocionesArray = retrievedNotion.tagsNociones;
      const xmlDoc = this.parser.parseFromString( this.XML, 'text/xml' );
      const sentences = xmlDoc.getElementsByTagName('sentence');
      for ( let i = 0; i < sentences.length; i++ ) {
        const tokens = sentences[i].getElementsByTagName('token');
        for ( let j = 0; j < tokens.length - 1; j++ ) {
          this.generateDropdownPresentPerfect( tagsNocionesArray, tokens[j], tokens[j + 1], i + '' + j, retrievedNotion );
        }
      }
      this.taggedHTML = this.htmlString;
    });
    console.log( this.wordsArray );
  }
  generateDropdownPresentPerfect( tagsNocionesArray: TagNocion[], currentToken: any, nextToken: any,
    dropdownIndex: string, retrievedNotion: Nocion ) {
      const currentTagNocion = tagsNocionesArray.filter( (tagNocion: any) => {
        if ( currentToken.getAttribute('form') === 'has' || currentToken.getAttribute('form') === 'have' ) {
          if ( tagNocion.tag === nextToken.getAttribute('ctag') ) {
            return tagNocion;
          }
        }
      })[0];
      if ( !!currentTagNocion ) {
        const mainPhrase = currentToken.getAttribute('form') + ' ' + nextToken.getAttribute('form');
        this.htmlString += `
        <div class="main-word-container" id="options${dropdownIndex}">
          ${ this.generateHTMLDropdownPresentPerfect( mainPhrase, dropdownIndex, currentTagNocion.tiposNociones ) }
        </div> `;
        this.wordsArray.push({
          id: dropdownIndex,
          selected: '',
          word: mainPhrase,
          correct: currentTagNocion.tiposNociones[0].palabrasEjemplo.indexOf( nextToken.getAttribute('form') ) ?
            currentTagNocion.tiposNociones[1].tipo : currentTagNocion.tiposNociones[0].tipo

        });
      }
      else {
        this.htmlString += currentToken.getAttribute('form') + ' ';
      }
  }
  generateHTMLDropdownPresentPerfect( mainWord: string, customIndex: string, tiposNociones: TipoNocion[] ): any {
    let customDropdown = `
    <div class="dropdown-absolute">
      <ul>
        <li>
          <span class="main-word">${mainWord}</span>
            <ul class="dropdown-list">`;
    tiposNociones.forEach( (tipoNocion: TipoNocion, index) => {
      const tagType = tipoNocion.tipo;
      customDropdown += `
      <li id="${customIndex + '_' + index}" class="${this.WORD_CLASS}" (click)="onClick($event)">${tagType}</li>`;
    });
    customDropdown += '</ul></li></ul></div>';
    return customDropdown;
  }

  // Modals Activity
  generateActivityModalsAdjAdv() {
    this.activityGenerationService.getNotion( this.secuenciaActividades.idNocion ).subscribe( retrievedNotion => {
      const tagsNocionesArray = retrievedNotion.tagsNociones;
      const xmlDoc = this.parser.parseFromString( this.XML, 'text/xml' );
      const sentences = xmlDoc.getElementsByTagName('sentence');
      for ( let i = 0; i < sentences.length; i++ ) {
        const tokens = sentences[i].getElementsByTagName('token');
        for ( let j = 0; j < tokens.length; j++ ) {
          if ( this.secuenciaActividades.idNocion === 4 ) {
            this.generateDropdownWithMultipleTags( tagsNocionesArray, tokens[j], i + '' + j, retrievedNotion );
          }
          else {
            this.generateDropdownWithSingleTagAndExampleWords( tagsNocionesArray, tokens[j], i + '' + j, retrievedNotion );
          }
        }
      }
      this.taggedHTML = this.htmlString;
    });
    console.log( this.wordsArray );
  }
  generateDropdownWithSingleTagAndExampleWords( tagsNocionesArray: TagNocion[], currentToken: any,
    dropdownIndex: string, retrievedNotion: Nocion ) {
      const currentTagNocion = tagsNocionesArray.filter( (tagNocion: TagNocion) => {
        if ( currentToken.getAttribute('ctag') === tagNocion.tag ) {
          return tagNocion;
        }
      })[0];
      console.log( currentTagNocion );
      if ( !!currentTagNocion ) {
        this.htmlString += `
        <div class="main-word-container" id="options${dropdownIndex}">
          ${ this.generateHTMLDropdownSingleTag( currentToken.getAttribute('form'), dropdownIndex, tagsNocionesArray ) }
        </div> `;
        const correctOption = tagsNocionesArray[0].tiposNociones.filter( (tipoNocion: TipoNocion) => {
          console.log( tipoNocion, currentToken.getAttribute('form') );
          if ( tipoNocion.palabrasEjemplo.indexOf( currentToken.getAttribute('form') ) !== -1 ) {
            return tipoNocion.tipo;
          }
        })[0];
        console.log( correctOption );
        this.wordsArray.push({
          id: dropdownIndex,
          selected: '',
          word: currentToken.getAttribute('form'),
          correct: correctOption.tipo
        });
      }
      else {
        this.htmlString += currentToken.getAttribute('form') + ' ';
      }
  }
  generateHTMLDropdownSingleTag( mainWord: string, customIndex: string, tagsNociones: TagNocion[] ): any {
    let customDropdown = `
    <div class="dropdown-absolute">
      <ul>
        <li>
          <span class="main-word">${mainWord}</span>
            <ul class="dropdown-list">`;
    tagsNociones[0].tiposNociones.forEach( (tipoNocion: TipoNocion, index) => {
      customDropdown += `
      <li id="${customIndex + '_' + index}" class="${this.WORD_CLASS}" (click)="onClick($event)">${tipoNocion.tipo}</li>`;
    });
    customDropdown += '</ul></li></ul></div>';
    return customDropdown;
  }

  // Adjective, Adverbs
  generateDropdownWithMultipleTags( tagsNocionesArray: TagNocion[], currentToken: any,
    dropdownIndex: string, retrievedNotion: Nocion ) {
      const currentTagObject = tagsNocionesArray.filter( (tagObject: any) => {
        return currentToken.getAttribute('ctag') === tagObject.tag;
      })[0];
      if ( !!currentTagObject ) {
        this.htmlString += `
        <div class="main-word-container" id="options${dropdownIndex}">
          ${ this.generateHTMLDropdownMultipleTags( currentToken.getAttribute('form'), dropdownIndex, tagsNocionesArray ) }
        </div> `;
        this.wordsArray.push({
          id: dropdownIndex,
          selected: '',
          word: currentToken.getAttribute('form'),
          correct: currentTagObject.tiposNociones[0].tipo
        });
      }
      else {
        this.htmlString += currentToken.getAttribute('form') + ' ';
      }
  }

  generateHTMLDropdownMultipleTags( mainWord: string, customIndex: string, tagsNociones: TagNocion[] ): any {
    let customDropdown = `
    <div class="dropdown-absolute">
      <ul>
        <li>
          <span class="main-word">${mainWord}</span>
            <ul class="dropdown-list">`;
    tagsNociones.forEach( (tagNocion: TagNocion, index) => {
      const tagType = tagNocion.tiposNociones[0].tipo;
      customDropdown += `
      <li id="${customIndex + '_' + index}" class="${this.WORD_CLASS}" (click)="onClick($event)">${tagType}</li>`;
    });
    customDropdown += '</ul></li></ul></div>';
    return customDropdown;
  }


  ngOnInit() {
    this.getSequence();
  }

  validateResults() {
    let foundWrongWord = false;
    this.wordsArray.forEach( wordObject => {
      if ( wordObject.selected ) {
        if ( wordObject.selected !== wordObject.correct ) {
          foundWrongWord = true;
          return;
        }
      }
    });

    if ( foundWrongWord ) {
      this.resultsOK = false;
      this.snackBar.open( "There are mistakes in your selection. Please check them again", "Close" );
    }
    else {
      this.resultsOK = true;
      this.dialog.open( ResultsModalComponent );
    }
  }

  navigateToNextActivity() {
    this.router.navigate(['activities-viewer', this.idSecuencia, 'completion']);
  }

}
