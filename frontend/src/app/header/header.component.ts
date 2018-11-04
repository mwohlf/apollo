import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input()
    public sidenav: MatSidenav;

    constructor() { }

    ngOnInit() {
    }

}
