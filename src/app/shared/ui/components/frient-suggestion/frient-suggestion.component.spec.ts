import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrientSuggestionComponent } from './frient-suggestion.component';

describe('FrientSuggestionComponent', () => {
  let component: FrientSuggestionComponent;
  let fixture: ComponentFixture<FrientSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrientSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrientSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
