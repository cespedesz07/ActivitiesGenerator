import { Component, OnInit } from '@angular/core';
import { ActivityGenerationService } from '../services/activity-generation/activity-generation.service';
import { SecuenciaActividades } from '../model/SecuenciaActividades';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable'
import { Actividad } from '../model/Actividad';


@Component({
  selector: 'app-activities-viewer',
  templateUrl: './activities-viewer.component.html',
  styleUrls: ['./activities-viewer.component.css']
})
export class ActivitiesViewerComponent implements OnInit {
  
  //Objeto SecuenciaActividades que recibe desde la lista
  private idSecuencia: number;
  private activitiesSequence: Observable<Actividad[]>;
  

  constructor( private activityGenerationService: ActivityGenerationService, private route: ActivatedRoute,
    private router: Router ) {
    this.route.params.subscribe( params => {
      this.idSecuencia = params.id;
    });
  }

  getSequenceActivities(): void {
    this.activitiesSequence = this.activityGenerationService.getSequenceActivities( this.idSecuencia );
  }

  openActivity( idActividad: number ) {
    switch ( idActividad ) {
      case 1:
        this.router.navigate(['activities-viewer', this.idSecuencia, 'location'])
        break;
      case 2:
        this.router.navigate(['activities-viewer', this.idSecuencia, 'systematization'])
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.getSequenceActivities();
  }

}
