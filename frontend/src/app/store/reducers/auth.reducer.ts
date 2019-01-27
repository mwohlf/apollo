import * as authActions from '../actions/auth.actions';
import {AuthActions} from '../actions/auth.actions';

// part of the global state that is affected by this action/reducer
export interface State {
    username: string | undefined;
    password: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
}

export const initialState: State = {
    username: undefined,
    password: undefined,
    accessToken: undefined,
    refreshToken: undefined
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: AuthActions): State {
    switch (action.type) {
        case authActions.AuthActionTypes.LOGIN: {
            return {
                ...currentState,
                username: action.payload.username,
                password: action.payload.password
            };
        }
        case authActions.AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...currentState,
                username: undefined,
                password: undefined,
                accessToken: undefined,
                refreshToken: undefined
            };
        }
        case authActions.AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...currentState,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        }
        default:
            return currentState;
    }
}
