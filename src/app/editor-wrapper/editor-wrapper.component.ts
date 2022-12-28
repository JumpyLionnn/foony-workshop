import { Component, Input, ViewChild, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Editor } from '../editor';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { IOutputData, SplitComponent } from 'angular-split';

interface Item{
    name: string;
    id: number;
    data: any;
}

interface ListItemData extends Item{
    index: number;
}

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements AfterViewInit {

    @Input()
    public name: string = "item";

    @Input()
    public title: string = "";

    @Input()
    public storeName: string = "";

    @Input()
    public editor!: Editor;
    
    public items: ListItemData[] = [];

    @ViewChild("itemsList", {static: true})
    private itemsList!: MatSelectionList;

    @ViewChild("split", { static: true })
    public toolsSplitElement!: SplitComponent;

    private itemsIndex = 0;

    constructor(private dbService: NgxIndexedDBService, private changeDetector: ChangeDetectorRef){
    }

    ngAfterViewInit(): void{
        if(this.storeName.length !== 0){
            this.dbService.getAll<Item>(this.storeName)
            .subscribe((entries: Item[]) => {
                this.items = entries.map((item, index) => ({...item, index: index}));
            });
        }

        const toolsSplitJsonData = localStorage.getItem("toolsSplitData");
        if(toolsSplitJsonData){
            this.toolsSplitElement.setVisibleAreaSizes(JSON.parse(toolsSplitJsonData));
            this.changeDetector.detectChanges();
        }

        this.editor.onChange.subscribe((data) => this.onDataChange(data));
    }

    

    public add(){
        this.itemsList.selectedOptions.selected[0]
        const item = {
            name: "New " + this.name + (this.itemsIndex++).toString(),
            data: this.editor.getDefaultData()
        };
        this.dbService.add(this.storeName, item)
            .subscribe((record) => {
                this.items.unshift({...record, index: 0});
                this.updateIndices();
            });
    }

    public deleteItem(index: number){
        const item = this.items[index];
        this.dbService.deleteByKey(this.storeName, item.id)
            .subscribe((status) => {
                this.items.splice(index, 1);
                this.updateIndices();
            });
    }

    public rename(index: number, newName: string){
        this.items[index].name = newName;
        this.updateCurrent(this.items[index]);
    }

    protected onSelectionChange(event: MatSelectionListChange){
        this.editor.setData(event.options[0].value.data);
    }

    protected onToolsSplitterDragEnd(data: IOutputData){
        localStorage.setItem("toolsSplitData", JSON.stringify(data.sizes));
    }

    private onDataChange(data: any){
        console.log("data change");
        const itemData = this.itemsList.selectedOptions.selected[0].value;
        this.items[itemData.index].data = data;
        this.updateCurrent(itemData);
    }

    private updateCurrent(item: Item){
        this.dbService.update(this.storeName, {
            name: item.name,
            id: item.id,
            data: item.data
        })
            .subscribe((value) => {
                
            });
    }

    private updateIndices(){
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.index = i;
        }
    }
}
