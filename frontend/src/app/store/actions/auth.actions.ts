import {Action} from '@ngrx/store';
import {TokenCredentials, UserCredentials} from '../../../generated';

export enum AuthActionTypes {
    LOGIN            = '[Auth] Login',
    LOGIN_FAILURE    = '[Auth] LoginFailed',
    LOGIN_SUCCESS    = '[Auth] LoginSuccess',
    REGISTER         = '[Auth] Register',
    REGISTER_FAILURE = '[Auth] RegisterFailure',
    REGISTER_SUCCESS = '[Auth] RegisterSuccess',
    LOGOUT           = '[Auth] Logout'
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: UserCredentials) {}
}

export class LoginFailedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: TokenCredentials) {}
}

export class LoginSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: TokenCredentials) {}
}

export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction
    | LoginFailedAction
    | LoginSuccessAction
    | LogoutAction
    ;
