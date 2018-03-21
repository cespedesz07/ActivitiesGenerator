import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParametersComponent } from './select-parameters.component';

describe('SelectParametersComponent', () => {
  let component: SelectParametersComponent;
  let fixture: ComponentFixture<SelectParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
