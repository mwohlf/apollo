import * as authActions from '../actions/auth.actions';
import {AuthAction} from '../actions/auth.actions';
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
export function reducer(currentState: State = initialState, action: AuthAction): State {
    switch (action.type) {
        case authActions.AuthActionTypes.LOGIN: {
            console.log("triggered login action");
            return {
                ...currentState,
                usernamePasswordCredential: action.payload
            }
        }
        case authActions.AuthActionTypes.LOGIN_FAILED: {
            console.log("triggered login failed action");
            return currentState;
        }
        case authActions.AuthActionTypes.LOGIN_SUCCESS: {
            console.log("triggered login success action");
            return {
                ...currentState,
                bearerTokenCredential: action.payload
            }
        }
        default:
            return currentState;
    }
}
