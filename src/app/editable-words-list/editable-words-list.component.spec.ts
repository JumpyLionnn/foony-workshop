import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableWordsListComponent } from './editable-words-list.component';

describe('WordsListEditorComponent', () => {
  let component: EditableWordsListComponent;
  let fixture: ComponentFixture<EditableWordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableWordsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableWordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
