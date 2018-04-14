import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../services/parameters/parameters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Nivel } from '../model/Nivel';
import { Actividad } from '../model/Actividad';
import { SecuenciaActividades } from '../model/SecuenciaActividades';
import { Texto } from '../model/Texto';
import { element } from 'protractor';

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
    this.texts = this.parametersService.getTexts( this.secuenciaActividad.idNivel );
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

  getActivitiesObjects( activitiesLoaded: Actividad[] ) {
    let activitiesToSave: Actividad[] = [];
    this.selectedActivities.forEach( index => {
      let activityToSave = activitiesLoaded.filter( (element) => {
        if (element.id === index) {
          return element;
        }
      });
      activitiesToSave.push( activityToSave[0] );
    });
    return activitiesToSave;
  }

  saveSequence() {
    this.secuenciaActividad.idUsuarioRealizador = 1;
    this.secuenciaActividad.fechaGeneracion = new Date().getTime().toString(); 
    this.activities.subscribe( activitiesLoaded => { 
      this.secuenciaActividad.actividades = this.getActivitiesObjects( activitiesLoaded );
      this.parametersService.saveSequence( this.secuenciaActividad );
    });
  }

}
