import * as fromAuth from './auth.reducer';
import * as fromTheme from './theme.reducer';
import {ActionReducerMap} from '@ngrx/store';


// global state as composition of
export interface State {
    auth: fromAuth.State;
    theme: fromTheme.State;
}


// reducers only need to care about updating the state
export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    theme: fromTheme.reducer
    // ... add more reducers here
    // see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
};
