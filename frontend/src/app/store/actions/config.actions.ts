import {Action} from '@ngrx/store';
import {ApplicationProperties} from '../../../generated';

export enum ConfigActionTypes {
    LOAD           = '[Config] Load',
    LOAD_FAILED    = '[Config] LoadFailed',
    LOAD_SUCCESS   = '[Config] LoadSuccess',
}

export class ConfigLoadAction implements Action {
    readonly type = ConfigActionTypes.LOAD;
    constructor() {}
}

export class ConfigFailedAction implements Action {
    readonly type = ConfigActionTypes.LOAD_FAILED;
    constructor(public payload: any) {}
}

export class ConfigSuccessAction implements Action {
    readonly type = ConfigActionTypes.LOAD_SUCCESS;
    constructor(public payload: ApplicationProperties) {}
}

export type ConfigActions = ConfigLoadAction
    | ConfigFailedAction
    | ConfigSuccessAction
    ;
