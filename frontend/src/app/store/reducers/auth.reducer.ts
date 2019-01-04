import * as authActions from '../actions/auth.actions';
import {AuthActions} from '../actions/auth.actions';
import {BearerTokenCredential, UsernamePasswordCredential} from '../../../generated';

// part of the global state that is affected by this action/reducer
export interface State {
    usernamePasswordCredential: UsernamePasswordCredential | undefined;
    bearerTokenCredential: BearerTokenCredential | undefined;
}

export const initialState: State = {
    usernamePasswordCredential: undefined,
    bearerTokenCredential: undefined
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: AuthActions): State {
    switch (action.type) {
        case authActions.AuthActionTypes.LOGIN: {
            return {
                ...currentState,
                usernamePasswordCredential: action.payload
            };
        }
        case authActions.AuthActionTypes.LOGIN_FAILED: {
            return currentState;
        }
        case authActions.AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...currentState,
                bearerTokenCredential: action.payload
            };
        }
        default:
            return currentState;
    }
}
