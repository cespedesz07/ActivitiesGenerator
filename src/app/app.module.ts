import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { MaterializeModule } from "angular2-materialize";

import { AppComponent } from './app.component';
import { SelectParametersComponent } from './select-parameters/select-parameters.component';
import { SequencesListComponent } from './sequences-list/sequences-list.component';

import { ParametersService } from './services/parameters/parameters.service';
import { SequenceService } from './services/sequence/sequence.service';
import { AngularFireDatabase } from 'angularfire2/database';


// Initialize Firebase
export const config = {
  apiKey: "AIzaSyDpMNvzt_nSPjTyH-L_Lpf27694VfGnP3s",
  authDomain: "activities-generator.firebaseapp.com",
  databaseURL: "https://activities-generator.firebaseio.com",
  storageBucket: "activities-generator.appspot.com",
  messagingSenderId: "956895964476"
};



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
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    MaterializeModule
  ],
  providers: [
    ParametersService,
    SequenceService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
