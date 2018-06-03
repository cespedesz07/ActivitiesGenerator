import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Lectura } from '../../model/Lectura';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { LecturesService } from '../../services/lectures/lectures.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityGenerationService } from '../../services/activity-generation/activity-generation.service';
import { SecuenciaActividades } from '../../model/SecuenciaActividades';
import { IEstructuraEmail } from '../../model/IEstructuraEmail';

@Component({
  selector: 'app-lectures-activity',
  templateUrl: './lectures-activity.component.html',
  styleUrls: ['./lectures-activity.component.css']
})
export class LecturesActivityComponent implements OnInit {

  sendTextFormGroup: FormGroup;
  selectedLecture: string;
  studentText: string;
  professorsEmail: string;

  lecturas: Observable<Lectura[]>;

  rutaLectura: String;

  private idSecuencia: number;
  private secuenciaActividades: SecuenciaActividades;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, public snackBar: MatSnackBar,
    private lecturesService: LecturesService, private activityGenerationService: ActivityGenerationService, private router: Router ) {
      this.rutaLectura = null;
      this.sendTextFormGroup = this.formBuilder.group({
        'textoEstudiante': new FormControl('', [Validators.required]),
        'emailProfesor': new FormControl('', [Validators.required])
      });
      this.route.params.subscribe( params => {
        this.idSecuencia = params.id;
      });
  }

  ngOnInit() {
    this.getLecturesByNotion();
  }

  getLecturesByNotion() {
    this.activityGenerationService.getSequence( this.idSecuencia ).subscribe( (secuenciaActividades) => {
      this.secuenciaActividades = secuenciaActividades;
      this.lecturas = this.lecturesService.getLecturesByNotion( this.secuenciaActividades.idNocion );
    });
  }

  getLecturePath() {
    this.rutaLectura = this.lecturesService.getLecturePath( this.selectedLecture );
  }

  sendTextToProfessor() {
    const extructuraEmail: IEstructuraEmail = {
      textoEstudiante: this.studentText,
      correoProfesor: this.professorsEmail
    };
    this.lecturesService.sendTextToProfessor( extructuraEmail );
  }

  navigateToNextActivity() {
    this.router.navigate(['activities-viewer', this.idSecuencia, 'location']);
  }

}
