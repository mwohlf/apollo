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
            return currentState;
        }
        case configActions.ConfigActionTypes.LOAD_SUCCESS: {
            return {
                ...currentState,
                applicationProperties: action.payload
            };
        }
        case configActions.ConfigActionTypes.LOAD_FAILED: {
            return {
                ...currentState,
                applicationProperties: undefined
            };
        }
        default:
            return currentState;
    }
}
