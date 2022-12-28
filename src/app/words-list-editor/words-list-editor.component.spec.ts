import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsListEditorComponent } from './words-list-editor.component';

describe('WordsListEditorComponent', () => {
  let component: WordsListEditorComponent;
  let fixture: ComponentFixture<WordsListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordsListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
