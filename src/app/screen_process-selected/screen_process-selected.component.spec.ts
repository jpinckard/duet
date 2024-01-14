import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProcessSelectedComponent } from './screen_process-selected.component';

describe('ScreenProcessSelectedComponent', () => {
  let component: ScreenProcessSelectedComponent;
  let fixture: ComponentFixture<ScreenProcessSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenProcessSelectedComponent]
    });
    fixture = TestBed.createComponent(ScreenProcessSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
