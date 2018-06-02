import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../services/parameters/parameters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Nivel } from '../model/Nivel';
import { Actividad } from '../model/Actividad';
import { SecuenciaActividades } from '../model/SecuenciaActividades';
import { Texto } from '../model/Texto';
import { element } from 'protractor';
import { Nocion } from '../model/Nocion';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.css']
})
export class SelectParametersComponent implements OnInit {


  // Attributes
  sequenceCreationFromGroup: FormGroup;

  levels: Observable< Nivel[] >;
  notions: Nocion[];
  texts: Observable< Texto[] >;
  activities: Observable< Actividad[] >;

  secuenciaActividad: SecuenciaActividades;
  selectedActivities: number[] = [];

  // Methods
  constructor( private formBuilder: FormBuilder, public snackBar: MatSnackBar, private parametersService: ParametersService ) {
    this.secuenciaActividad = new SecuenciaActividades();
    this.sequenceCreationFromGroup = this.formBuilder.group({
      'nombre': new FormControl('', [Validators.required]),
      'nivel': new FormControl('', [Validators.required]),
      'nocion': new FormControl('', [Validators.required]),
      'texto': new FormControl('', [Validators.required]),
    });
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

  getNotions(): void {
    this.levels.subscribe( levelsArray => {
      if ( levelsArray.length > 0 ) {
        this.notions = levelsArray.filter( levelItem => {
          return levelItem.id === this.secuenciaActividad.idNivel;
        })[0].nociones;
      }
    });
  }

  ngOnInit() {
    this.getLevelsParams();
    this.getActivities();
  }

  saveSequence() {
    if ( this.sequenceCreationFromGroup.valid ){
      this.secuenciaActividad.idUsuarioRealizador = 1;
      this.secuenciaActividad.fechaGeneracion = new Date().getTime().toString(); 
      this.activities.subscribe( activitiesLoaded => { 
        this.secuenciaActividad.actividades = activitiesLoaded;
        this.parametersService.saveSequence( this.secuenciaActividad );
      });
    }
    else {
      this.snackBar.open("Please fill in all required fields", "Close");
    }
  }

}
