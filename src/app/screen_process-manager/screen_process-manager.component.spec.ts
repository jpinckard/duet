import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProcessManagerComponent } from './screen_process-manager.component';

describe('ScreenProcessManagerComponent', () => {
  let component: ScreenProcessManagerComponent;
  let fixture: ComponentFixture<ScreenProcessManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenProcessManagerComponent]
    });
    fixture = TestBed.createComponent(ScreenProcessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
