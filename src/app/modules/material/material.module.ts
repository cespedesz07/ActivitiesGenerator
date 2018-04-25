import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule, MatGridListModule, 
         MatTabsModule, MatTableModule, MatToolbarModule, MatCardModule,
         MatInputModule, MatIconModule, MatDialogModule, MatStepperModule, 
         MatSnackBarModule} from '@angular/material';


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
    MatSnackBarModule
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
    MatSnackBarModule
  ]
})
export class MaterialModule { }
