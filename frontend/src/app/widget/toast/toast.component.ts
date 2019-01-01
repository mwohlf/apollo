import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html'

})
export class ToastComponent implements OnInit {

    constructor(private overlayContainer: OverlayContainer,
                private store: Store<fromRoot.State>) {

        store.select(state => state.toasts).subscribe(toasts => {
            console.log("<ToastComponent.select> ", toasts);
        });
    }

    ngOnInit(): void {
    }

}
