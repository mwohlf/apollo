import {Action} from '@ngrx/store';
import {ThemeChoice} from '../effects/theme.effects';


export enum ThemeActionTypes {
    APPLY               = '[Theme] Apply',   // this translates into cleanup, install; split up into 2 steps:
    CLEANUP             = '[Theme] Cleanup',
    INSTALL             = '[Theme] Install'
}

// apply a new theme, means removing the old one and installing a new one
export class ApplyThemeAction implements Action {
    readonly type = ThemeActionTypes.APPLY;
    constructor(public payload: ThemeChoice) {}
}

// remove old theme
export class CleanupThemeAction implements Action {
    readonly type = ThemeActionTypes.CLEANUP;
    constructor(public payload: ThemeChoice) {}
}

// install new theme
export class InstallThemeAction implements Action {
    readonly type = ThemeActionTypes.INSTALL;
    constructor(public payload: ThemeChoice) {}
}


export type ThemeActions = ApplyThemeAction
    | CleanupThemeAction
    | InstallThemeAction
    ;
