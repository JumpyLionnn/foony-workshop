import { Component } from '@angular/core';

interface Item{
    name: string
}

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent {

    public items: Item[] = [{name: "Untitled Item"} ];


}
