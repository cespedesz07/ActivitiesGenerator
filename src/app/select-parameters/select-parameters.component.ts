import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../services/parameters/parameters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Nivel } from '../model/Nivel';
import { Actividad } from '../model/Actividad';
import { SecuenciaActividades } from '../model/SecuenciaActividades';
import { Texto } from '../model/Texto';

@Component({
  selector: 'select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.css']
})
export class SelectParametersComponent implements OnInit {


  // Attributes
  levels: Observable< Nivel[] >;
  activities: Observable< Actividad[] >;
  texts: Observable< Texto[] >;

  secuenciaActividad: SecuenciaActividades;
  selectedActivities: number[] = [];

  // Methods
  constructor( private parametersService: ParametersService ) {
    this.secuenciaActividad = new SecuenciaActividades();
  }

  getLevelsParams(): void {
    this.levels = this.parametersService.getLevelsParams();
  }

  getActivities(): void {
    this.activities = this.parametersService.getActivities();
  }

  getTexts(): void {
    this.texts = this.parametersService.getTexts( this.secuenciaActividad.nivel_idioma );
  }

  ngOnInit() {
    this.getLevelsParams();
    this.getActivities();
  }

  checkActivity( activity: Actividad ) {
    if ( this.isActivitySelected(activity) ) {
      this.selectedActivities.splice( this.selectedActivities.indexOf(activity.id), 1 )
    }
    else{
      this.selectedActivities.push( activity.id );
    }    
  }

  isActivitySelected( activity: Actividad ) {
    return this.selectedActivities.indexOf( activity.id ) !== -1;
  }

  saveSequence() {
    this.secuenciaActividad.usuario_realizador = "scespedesz";
    this.secuenciaActividad.fecha_generacion = new Date().getTime().toString(); 
  }

  showObject() {
    console.log( this.secuenciaActividad );
  }

}
