import {Component, ComponentRef, ElementRef, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {DismissToast} from '../../store/actions/toast.actions';
import {Toast} from '../../store/effects/toast.effect';


export const CURRENT_TOAST: string = 'currentToast';

@Component({
    selector: 'app-toast-container',
    templateUrl: './toast-container.component.html',
    styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

    constructor() {
    }

}
