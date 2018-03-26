import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectParametersComponent } from '../../select-parameters/select-parameters.component';
import { SequencesListComponent } from '../../sequences-list/sequences-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/sequence-creation', pathMatch: 'full'},
  {path: 'sequence-creation', component: SelectParametersComponent },
  {path: 'sequences-list', component: SequencesListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
