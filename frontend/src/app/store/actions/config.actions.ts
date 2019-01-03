import {Action} from '@ngrx/store';
import {ApplicationProperties, BearerTokenCredential, UsernamePasswordCredential} from '../../../generated';

export enum ConfigActionTypes {
    CONFIG_LOAD           = '[Config] Load',
    CONFIG_LOAD_FAILED    = '[Config] Load Failed',
    CONFIG_LOAD_SUCCESS   = '[Config] Load Success',
}

export class ConfigLoadAction implements Action {
    readonly type = ConfigActionTypes.CONFIG_LOAD;
    constructor(public payload: UsernamePasswordCredential) {}
}

export class ConfigFailedAction implements Action {
    readonly type = ConfigActionTypes.CONFIG_LOAD_FAILED;
    constructor(public payload: any) {}
}

export class ConfigSuccessAction implements Action {
    readonly type = ConfigActionTypes.CONFIG_LOAD_SUCCESS;
    constructor(public payload: ApplicationProperties) {}
}

export type ConfigActions = ConfigLoadAction
    | ConfigFailedAction
    | ConfigSuccessAction
    ;
