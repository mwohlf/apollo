import {Action} from '@ngrx/store';
import {Toast} from '../effects/toast.effect';


export enum ToastActionTypes {
    CREATE               = '[Toast] Create',
    DISMISS              = '[Toast] Dismiss'
}

// apply a new theme, means removing the old one and installing a new one
export class CreateToastAction implements Action {
    readonly type = ToastActionTypes.CREATE;
    constructor(public payload: Toast) {}
}

// remove old theme
export class DismissToastAction implements Action {
    readonly type = ToastActionTypes.DISMISS;
    constructor(public payload: Toast) {}
}


export type ToastActions = CreateToastAction
    | DismissToastAction
    ;
