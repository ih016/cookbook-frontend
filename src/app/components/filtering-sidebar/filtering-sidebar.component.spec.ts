import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringSidebarComponent } from './filtering-sidebar.component';

describe('FilteringSidebarComponent', () => {
  let component: FilteringSidebarComponent;
  let fixture: ComponentFixture<FilteringSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
