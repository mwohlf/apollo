import { Action } from '@ngrx/store';
import * as themeActions from '../actions/theme.actions';
import {ThemeAction} from '../actions/theme.actions';
import {ThemeChoice} from '../effects/theme.effects';

// part of the global state that is affected by this action/reducer
export interface State {
    currentTheme: ThemeChoice | undefined;
}

export const initialState: State = {
    currentTheme: undefined
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: ThemeAction): State {
    switch (action.type) {
        case themeActions.ThemeActionTypes.APPLY: {
            console.log("triggered APPLY theme");
            return currentState;
        }
        case themeActions.ThemeActionTypes.CLEANUP: {
            console.log("triggered CLEANUP theme");
            return {
                ...currentState,
                currentTheme: undefined
            };
        }
       case themeActions.ThemeActionTypes.INSTALL: {
            console.log("triggered INSTALL theme: ", action.payload);
            return {
                ...currentState,
                currentTheme: action.payload
            };
        }
        default:
            return currentState;
    }
}
