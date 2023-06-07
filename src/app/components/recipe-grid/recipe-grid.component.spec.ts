import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesGridComponent } from './recipe-grid.component';

describe('RecipesComponent', () => {
  let component: RecipesGridComponent;
  let fixture: ComponentFixture<RecipesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
