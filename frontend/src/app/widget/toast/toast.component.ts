import {Component, ComponentRef, ElementRef, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {DismissToast} from '../../store/actions/toast.actions';
import {Toast} from '../../store/effects/toast.effect';


export const CURRENT_TOAST: string = 'currentToast';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

    public destroy: () => void;

    constructor(public elementRef: ElementRef, // == componentRef.location
                // public componentRef: ComponentRef<any>,
                @Inject(CURRENT_TOAST) public toast: Toast,
                private store: Store<fromRoot.State>) {
    }

    public close(): void {
        console.log("close called");
        this.store.dispatch(new DismissToast(this));
    }

}
