import {Action} from '@ngrx/store';
import {ThemeChoice} from '../../services/theme-picker.service';


export enum ThemeActionTypes {
    APPLY               = '[Theme] Apply',   // remove old theme, install new theme

    CLEANUP             = '[Theme] Cleanup',
    INSTALL             = '[Theme] Install'
}

export class ApplyTheme implements Action {
    readonly type = ThemeActionTypes.APPLY;
    constructor(public payload: ThemeChoice) {}
}

export class CleanupTheme implements Action {
    readonly type = ThemeActionTypes.CLEANUP;
    constructor(public payload: ThemeChoice) {}
}

export class InstallTheme implements Action {
    readonly type = ThemeActionTypes.INSTALL;
    constructor(public payload: ThemeChoice) {}
}


export type ThemeAction = ApplyTheme
    | CleanupTheme
    | InstallTheme
    ;
