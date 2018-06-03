import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionActivityComponent } from './completion-activity.component';

describe('CompletionActivityComponent', () => {
  let component: CompletionActivityComponent;
  let fixture: ComponentFixture<CompletionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
