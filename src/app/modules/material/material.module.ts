import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatGridListModule, 
         MatTabsModule, MatTableModule, MatToolbarModule, MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialModule { }
