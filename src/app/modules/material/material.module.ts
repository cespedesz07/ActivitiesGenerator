import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatGridListModule, 
         MatTabsModule, MatTableModule, MatToolbarModule, MatCardModule,
         MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule
  ]
})
export class MaterialModule { }
