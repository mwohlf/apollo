import {Action} from '@ngrx/store';
import {BearerTokenCredential, UsernamePasswordCredential} from '../../../generated';

export enum AuthActionTypes {
    LOGIN           = '[Auth] Login',
    LOGIN_FAILED    = '[Auth] LoginFailed',
    LOGIN_SUCCESS   = '[Auth] LoginSuccess',
    LOGOUT          = '[Auth] Logout'
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: UsernamePasswordCredential) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;
    constructor(public payload: any) {}
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: BearerTokenCredential) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction
    | LoginFailedAction
    | LoginSuccessAction
    | LogoutAction
    ;
