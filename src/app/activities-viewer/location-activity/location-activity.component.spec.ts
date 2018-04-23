import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationActivityComponent } from './location-activity.component';

describe('LocationActivityComponent', () => {
  let component: LocationActivityComponent;
  let fixture: ComponentFixture<LocationActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
