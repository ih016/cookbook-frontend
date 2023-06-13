import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashscreenContentComponent } from './splashscreen-content.component';

describe('SplashscreenContentComponent', () => {
  let component: SplashscreenContentComponent;
  let fixture: ComponentFixture<SplashscreenContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashscreenContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashscreenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
