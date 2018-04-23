import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystematizationActivityComponent } from './systematization-activity.component';

describe('SystematizationActivityComponent', () => {
  let component: SystematizationActivityComponent;
  let fixture: ComponentFixture<SystematizationActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystematizationActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystematizationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
