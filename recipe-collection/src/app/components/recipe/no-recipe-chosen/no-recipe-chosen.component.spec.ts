import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecipeChosenComponent } from './no-recipe-chosen.component';

describe('NoRecipeChosenComponent', () => {
  let component: NoRecipeChosenComponent;
  let fixture: ComponentFixture<NoRecipeChosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRecipeChosenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRecipeChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
