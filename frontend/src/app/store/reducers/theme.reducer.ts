import * as themeActions from '../actions/theme.actions';
import {ThemeActions} from '../actions/theme.actions';
import {ThemeChoice} from '../effects/theme.effects';

// part of the global state that is affected by this action/reducer
export interface State {
    currentTheme: ThemeChoice | undefined;
}

export const initialState: State = {
    currentTheme: undefined
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: ThemeActions): State {
    switch (action.type) {
        case themeActions.ThemeActionTypes.APPLY: {
            console.log("themeActions.ThemeActionTypes.APPLY, this only triggers cleanup and install");
            return currentState;
        }
        case themeActions.ThemeActionTypes.CLEANUP: {
            console.log("themeActions.ThemeActionTypes.CLEANUP");
            return {
                ...currentState,
                currentTheme: undefined
            };
        }
        case themeActions.ThemeActionTypes.INSTALL: {
            console.log("themeActions.ThemeActionTypes.INSTALL", action.payload);
            return {
                ...currentState,
                currentTheme: action.payload
            };
        }
        default:
            return currentState;
    }
}
