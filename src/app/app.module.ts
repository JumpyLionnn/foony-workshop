import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';
import { EditableWordsListComponent } from './editable-words-list/editable-words-list.component';
import { WordsListEditorComponent } from './words-list-editor/words-list-editor.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        EditableWordsListComponent,
        EditorWrapperComponent,
        WordsListEditorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatListModule,

        ClipboardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
