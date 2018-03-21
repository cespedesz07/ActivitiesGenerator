import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SelectParametersComponent } from './select-parameters/select-parameters.component';
import { SequencesListComponent } from './sequences-list/sequences-list.component';

import { ParametersService } from './services/parameters/parameters.service';
import { SequenceService } from './services/sequence/sequence.service';


@NgModule({
  declarations: [
    AppComponent,
    SelectParametersComponent,
    SequencesListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ParametersService,
    SequenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
