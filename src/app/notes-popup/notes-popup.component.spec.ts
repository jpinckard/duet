import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPopupComponent } from './notes-popup.component';

describe('NotesPopupComponent', () => {
  let component: NotesPopupComponent;
  let fixture: ComponentFixture<NotesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesPopupComponent]
    });
    fixture = TestBed.createComponent(NotesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
