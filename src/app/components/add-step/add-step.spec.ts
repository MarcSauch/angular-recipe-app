import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStep } from './add-step';

describe('AddStep', () => {
  let component: AddStep;
  let fixture: ComponentFixture<AddStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
