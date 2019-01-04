import * as configActions from '../actions/config.actions';
import {ConfigActions} from '../actions/config.actions';
import {ApplicationProperties} from '../../../generated';

// part of the global state that is affected by this action/reducer
export interface State {
    applicationProperties: ApplicationProperties | undefined;
}

export const initialState: State = {
    applicationProperties: undefined
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: ConfigActions): State {
    switch (action.type) {
        case configActions.ConfigActionTypes.LOAD: {
            console.log("triggered login action");
            return currentState;
        }
        case configActions.ConfigActionTypes.LOAD_SUCCESS: {
            console.log("triggered login failed action");
            return {
                ...currentState,
                applicationProperties: action.payload
            };
        }
        case configActions.ConfigActionTypes.LOAD_FAILED: {
            console.log("triggered login success action");
            return {
                ...currentState,
                applicationProperties: undefined
            }
        }
        default:
            return currentState;
    }
}
