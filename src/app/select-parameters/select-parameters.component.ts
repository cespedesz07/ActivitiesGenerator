import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../services/parameters/parameters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Parameter } from '../model/parameter';

@Component({
  selector: 'select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.css']
})
export class SelectParametersComponent implements OnInit {


  // Attributes
  levels: Observable< Parameter[] >;
  notions: Parameter[];


  // Methods
  constructor( private parametersService: ParametersService ) {
  }

  getLevelsParams(): void {
    this.levels = this.parametersService.getLevelsParams();
    console.log( this.levels );
  }

  getNotionsParams(): void {
    this.parametersService.getNotionsParams()
      .then( notions => this.notions = notions );
  }

  ngOnInit() {
    this.getLevelsParams();
    this.getNotionsParams();
  }

}
