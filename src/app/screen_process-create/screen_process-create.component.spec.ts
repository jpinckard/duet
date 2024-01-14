import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProcessCreateComponent } from './screen_process-create.component';

describe('ScreenProcessCreateComponent', () => {
  let component: ScreenProcessCreateComponent;
  let fixture: ComponentFixture<ScreenProcessCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenProcessCreateComponent]
    });
    fixture = TestBed.createComponent(ScreenProcessCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
