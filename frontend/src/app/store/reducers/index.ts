import * as fromAuth from './auth.reducer';
import * as fromTheme from './theme.reducer';
import * as fromToast from './toast.reducer';
import * as fromConfig from './config.reducer';
import * as fromRouter from '@ngrx/router-store';
import {ActionReducerMap} from '@ngrx/store';


// global state as composition of
export interface ApplicationState {
    auth: fromAuth.State;
    theme: fromTheme.State;
    toasts: fromToast.State;
    config: fromConfig.State;
    // router is configured in the StoreRouterConnectingModule.forRoot config
    router: fromRouter.RouterReducerState;
}


// reducers only need to care about updating the state
export const reducers: ActionReducerMap<ApplicationState> = {
    auth: fromAuth.reducer,
    theme: fromTheme.reducer,
    toasts: fromToast.reducer,
    config: fromConfig.reducer,
    router: fromRouter.routerReducer,
    // ... add more reducers here
    // see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
};
