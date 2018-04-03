import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../services/parameters/parameters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Nivel } from '../model/Nivel';
import { Actividad } from '../model/Actividad';

@Component({
  selector: 'select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.css']
})
export class SelectParametersComponent implements OnInit {


  // Attributes
  levels: Observable< Nivel[] >;
  activities: Observable< Actividad[] >;


  // Methods
  constructor( private parametersService: ParametersService ) {
  }

  getLevelsParams(): void {
    this.levels = this.parametersService.getLevelsParams();
  }

  getActivities(): void {
    this.activities = this.parametersService.getActivities();
  }

  ngOnInit() {
    this.getLevelsParams();
    this.getActivities();
  }

  selectActivity( activity ) {
    console.log( activity );
  }

}
