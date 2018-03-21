import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencesListComponent } from './sequences-list.component';

describe('SequencesListComponent', () => {
  let component: SequencesListComponent;
  let fixture: ComponentFixture<SequencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
