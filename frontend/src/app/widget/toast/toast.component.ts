import {Component, ComponentRef, ElementRef, Inject, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {DismissToastAction} from '../../store/actions/toast.actions';
import {Toast} from '../../store/effects/toast.effect';


// see: https://tburleson-layouts-demos.firebaseapp.com/#/docs

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

    @Input()
    toast: Toast;

    constructor(private store: Store<fromRoot.ApplicationState>) {}

    public close(): void {
        console.log("close called");
        this.store.dispatch(new DismissToastAction(this.toast));
    }

}
