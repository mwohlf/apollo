import * as toastActions from '../actions/toast.actions';
import {ToastActions} from '../actions/toast.actions';
import {Toast} from '../effects/toast.effect';

// part of the global state that is affected by this action/reducer
export interface State {
    toasts: Toast[];
}

export const initialState: State = {
    toasts: []
};


// reducer transform old state into new state via actions
export function reducer(currentState: State = initialState, action: ToastActions): State {
    switch (action.type) {
        case toastActions.ToastActionTypes.CREATE: {
            const patchedToasts = currentState.toasts.slice();
            patchedToasts.push(action.payload);
            return {
                ...currentState,
                toasts: patchedToasts
            };
        }
        case toastActions.ToastActionTypes.DISMISS: {
            const patchedToasts = currentState.toasts.slice();
            const index = patchedToasts.indexOf(action.payload, 0);
            if (index > -1) {
                patchedToasts.splice(index, 1);
            }
            return {
                ...currentState,
                toasts: patchedToasts
            };
        }
        default:
            return currentState;
    }
}
