import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { MatChipEditedEvent } from '@angular/material/chips';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editor } from '../editor';

@Component({
    selector: 'app-editable-words-list',
    templateUrl: './editable-words-list.component.html',
    styleUrls: ['./editable-words-list.component.scss']
})
export class EditableWordsListComponent extends Editor {
    
    public wordFormControl = new FormControl('');

    public words: string[] = ["something", "something2"];

    public onChange: EventEmitter<any> = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef, private clipboard: Clipboard, private snackBar: MatSnackBar){
        super();
        this.wordFormControl.addValidators(this.wordSubmitFormValidator.bind(this));
    }

    public override setData(data: any): void {
        this.words = data;
    }

    protected copy(){
        this.clipboard.copy(this.words.join("\n"));
        this.snackBar.open("Word list copied to clipboard.", undefined, {
            direction: "ltr",
            duration: 4000,
            horizontalPosition: "left",
            verticalPosition: "bottom"
        });
    }

    public override getDefaultData(): unknown {
        return [];
    }

    protected add(){
        this.wordFormControl.updateValueAndValidity();
        if(this.wordFormControl.valid){
            // if its not null or empty
            if(this.wordFormControl.value){
                const result = this.binarySearch(this.wordFormControl.value);
                if(result.found === false){
                    this.words.splice(result.index, 0, this.wordFormControl.value);
                    this.onChange.emit(this.words);
                }
            }
            this.wordFormControl.setValue("");
        }
    }

    protected remove(index: number) {
        this.words.splice(index, 1);
        this.onChange.emit(this.words);
    }

    protected edit(index: number, event: MatChipEditedEvent) {
        const value = event.value.trim();

        this.remove(index);

        const result = this.binarySearch(value);
        if(result.found === false){
            this.words.splice(result.index, 0, value);
        }
        this.onChange.emit(this.words);
    }

    protected onInputKeyPress(event: KeyboardEvent){
        if(event.code === "Enter"){
            this.add();
            this.changeDetector.detectChanges();
        }
    }

    protected onWordInputChange(){
        this.wordFormControl.setErrors(null);
    }

    private binarySearch(word: string) {
        let minIndex = 0;
        let maxIndex = this.words.length - 1;
        let currentIndex = this.words.length - 1;
        let currentElement = this.words[this.words.length - 1];
      
        while (minIndex <= maxIndex) {
          currentIndex = Math.floor((minIndex + maxIndex) / 2);
          currentElement = this.words[currentIndex];
      
          if (currentElement < word) {
            minIndex = currentIndex + 1;
          }
          else if (currentElement > word) {
            maxIndex = currentIndex - 1;
          }
          else {
            return {
              found: true,
              index: currentIndex
            };
          }
        }      
      
        return { 
          found: false,
          index: currentElement < word ? currentIndex + 1 : currentIndex
        };
      }

    private wordSubmitFormValidator(control: AbstractControl): ValidationErrors | null {
        if(this.binarySearch(control.value).found){
            return {exists: {value: control.value}};
        }
        return null;
    }
}
