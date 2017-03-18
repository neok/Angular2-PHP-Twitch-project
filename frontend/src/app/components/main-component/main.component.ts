import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: './main.component.html'
})

export class MainComponent {
    name: string;

    constructor() {
        this.name = "Angular2"
    }
}
