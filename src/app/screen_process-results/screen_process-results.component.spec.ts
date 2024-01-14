import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProcessResultsComponent } from './screen_process-results.component';

describe('ScreenProcessResultsComponent', () => {
  let component: ScreenProcessResultsComponent;
  let fixture: ComponentFixture<ScreenProcessResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenProcessResultsComponent]
    });
    fixture = TestBed.createComponent(ScreenProcessResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
