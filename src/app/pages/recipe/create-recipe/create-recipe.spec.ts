import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipe } from './create-recipe';

describe('CreateRecipe', () => {
  let component: CreateRecipe;
  let fixture: ComponentFixture<CreateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
