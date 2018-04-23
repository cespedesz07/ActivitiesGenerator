import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSequenceModalComponent } from './delete-sequence-modal.component';

describe('DeleteSequenceModalComponent', () => {
  let component: DeleteSequenceModalComponent;
  let fixture: ComponentFixture<DeleteSequenceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSequenceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSequenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
