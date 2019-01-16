import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    @Input()
    public sidenav: MatSidenav;

    constructor(private store: Store<fromRoot.State>) {
        store.select(state => state.auth.accessToken).subscribe((auth) => {
            console.log('<header> auth.tokenCredentials ', auth);
        });
    }

    ngOnInit() {
    }

}
