import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivitiesViewerComponent } from '../activities-viewer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';

@Component({
  selector: 'app-location-activity',
  templateUrl: './location-activity.component.html',
  styleUrls: ['./location-activity.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationActivityComponent implements OnInit {

  private difficultLevels: number[];
  private parser: DOMParser;
  private taggedHTML: string;
  private XML: string;
  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;
  private validWords: string[];
  private selectedWords: string[];

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute, 
    private router: Router) {
    this.parser = new DOMParser();
    this.taggedHTML = "";
    this.XML = "";
    this.validWords = [];
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

  generateActivity(): void {
    let xmlDoc = this.parser.parseFromString( this.XML, "text/xml" );  
    let sentences = xmlDoc.getElementsByTagName("sentence");
    for ( let i = 0; i < sentences.length; i++ ) {
      let tokens = sentences[i].getElementsByTagName("token")
      for ( let j = 0; j < tokens.length; j++ ) {
        if ( tokens[j].getAttribute("pos") === "adjective" || 
             tokens[j].getAttribute("pos") === "adverb" ){
          this.validWords.push( tokens[j].getAttribute('form') );
        }
        this.taggedHTML += `<span class="word-to-click" onclick="addWord(word)"> ${tokens[j].getAttribute('form')} </span>`;        
      }
    }
    console.log( this.validWords );
  }

  ngOnInit() {
    this.getSequence();
  }

  addWord( word: string ): void {
    console.log( word );
    this.selectedWords.push( word );
    console.log( this.selectedWords );
  }

}
