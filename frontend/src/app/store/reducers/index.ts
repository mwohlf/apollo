import * as fromAuth from './auth.reducer';
import * as fromTheme from './theme.reducer';
import * as fromToast from './toast.reducer';
import * as fromConfig from './config.reducer';
import {ActionReducerMap} from '@ngrx/store';


// global state as composition of
export interface State {
    auth: fromAuth.State;
    theme: fromTheme.State;
    toasts: fromToast.State;
    config: fromConfig.State;
}


// reducers only need to care about updating the state
export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    theme: fromTheme.reducer,
    toasts: fromToast.reducer,
    config: fromConfig.reducer
    // ... add more reducers here
    // see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
};
