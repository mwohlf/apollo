import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private store: Store<fromRoot.ApplicationState>) {
        store.select(state => state.auth.accessToken).subscribe((auth) => {
            console.log('<header> auth.tokenCredentials ', auth);
        });
    }


    ngOnInit() {

    }

}
