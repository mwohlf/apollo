import {Component} from '@angular/core';
import {Toast} from '../../store/effects/toast.effect';

@Component({
    selector: 'app-toast-container',
    templateUrl: './toast-container.component.html',
    styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

    private toasts: Toast[];

    constructor() {
    }

    setToasts(toasts: Toast[]): void {
        this.toasts = toasts;
    }
}
