import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material";

@Component({
    selector: 'app-header',
    templateUrl: './heading.component.html'
})
export class HeadingComponent implements OnInit {

    @Input()
    public sidenav: MatSidenav;

    constructor() { }

    ngOnInit() {
    }

}
