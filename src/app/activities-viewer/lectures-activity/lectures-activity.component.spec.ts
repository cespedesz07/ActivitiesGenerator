import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesActivityComponent } from './lectures-activity.component';

describe('LecturesActivityComponent', () => {
  let component: LecturesActivityComponent;
  let fixture: ComponentFixture<LecturesActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
