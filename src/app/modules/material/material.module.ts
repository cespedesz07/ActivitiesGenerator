import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatGridListModule, 
         MatTabsModule, MatTableModule, MatToolbarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
