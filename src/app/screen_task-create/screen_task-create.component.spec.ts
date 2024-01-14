import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTaskCreateComponent } from './screen_task-create.component';

describe('ScreenTaskCreateComponent', () => {
  let component: ScreenTaskCreateComponent;
  let fixture: ComponentFixture<ScreenTaskCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenTaskCreateComponent]
    });
    fixture = TestBed.createComponent(ScreenTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
