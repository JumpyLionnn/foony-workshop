import { EventEmitter } from "@angular/core";


export abstract class Editor {
    public abstract onChange: EventEmitter<any>;

    public abstract setData(data: any): void;
    public abstract getDefaultData(): any;
}