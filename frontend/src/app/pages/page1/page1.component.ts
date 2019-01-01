import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {CreateToast} from '../../store/actions/toast.actions';
import {Severity} from '../../store/effects/toast.effect';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

    constructor(private store: Store<fromRoot.State>) {}

    ngOnInit() {
    }

    public alert() {
        this.store.dispatch(new CreateToast({
            severity: Severity.INFO,
            title: "info",
            content: "hello world"
        }));
    }

}
