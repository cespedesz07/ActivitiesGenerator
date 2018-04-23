import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatGridListModule, 
         MatTabsModule, MatTableModule, MatToolbarModule, MatCardModule,
         MatInputModule, 
         MatIconModule,
         MatDialogModule, MatStepperModule, MatDividerModule} from '@angular/material';


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
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatDividerModule
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
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
