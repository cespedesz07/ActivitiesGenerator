import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectParametersComponent } from '../../select-parameters/select-parameters.component';
import { SequencesListComponent } from '../../sequences-list/sequences-list.component';
import { ActivitiesViewerComponent } from '../../activities-viewer/activities-viewer.component';
import { LocationActivityComponent } from '../../activities-viewer/location-activity/location-activity.component';
import { SystematizationActivityComponent } from '../../activities-viewer/systematization-activity/systematization-activity.component';
import { LecturesActivityComponent } from '../../activities-viewer/lectures-activity/lectures-activity.component';

const routes: Routes = [
  {path: '', redirectTo: '/sequence-creation', pathMatch: 'full'},
  {path: 'sequence-creation', component: SelectParametersComponent },
  {path: 'sequences-list', component: SequencesListComponent },
  {path: 'activities-viewer/:id', component: ActivitiesViewerComponent },
  {path: 'activities-viewer/:id/location', component: LocationActivityComponent },
  {path: 'activities-viewer/:id/systematization', component: SystematizationActivityComponent },
  {path: 'activities-viewer/:id/lectures', component: LecturesActivityComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
