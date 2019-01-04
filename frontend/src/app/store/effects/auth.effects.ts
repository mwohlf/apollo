import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BearerTokenCredential, LoginControllerService, UsernamePasswordCredential} from '../../../generated';
import {AuthActions, AuthActionTypes, LoginFailedAction, LoginSuccessAction} from '../actions/auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CreateToastAction, ToastActions} from '../actions/toast.actions';
import {Severity} from './toast.effect';

// effects
// see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
//  see: https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c
//  see: https://stackoverflow.com/questions/52728922/property-pipe-does-not-exist-on-type-actionsaction-among-others
//  see: https://medium.com/@webWhizJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329
// this is where the services are being called, actions are consumed and disoatched back to the store...
// Simply speaking, an effect is an Observable that maps its items to actions that will then be dispatched to the store automatically.
// In most cases, the source of an Effect is the global stream of actions:
@Injectable()
export class AuthEffects {

    constructor(private actions: Actions<AuthActions>,
                private loginControllerService: LoginControllerService) {}

    @Effect()
    loginAction: Observable<AuthActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN),
        // read the payload needed to login
        map(action => action.payload),
        //
        switchMap((usernamePasswordCredential: UsernamePasswordCredential) => {
            console.log('<effect> login ', usernamePasswordCredential);
            // convert into another action ...
            return this.loginControllerService.authenticate(usernamePasswordCredential).pipe(
                // got a bearer token
                map(customers => new LoginSuccessAction(customers)),
                // failed
                catchError(error => of(new LoginFailedAction(error)))
            );
        })
    );

    @Effect()
    loginSuccess: Observable<AuthActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        map(action => action.payload),
        switchMap((bearerTokenCredential: BearerTokenCredential) => {
            console.log('<effect> login success ', bearerTokenCredential);
            return [];
        })
    );

    @Effect()
    loginFailed: Observable<ToastActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN_FAILED),
        map(action => action.payload),
        switchMap((error: any) => {
            console.log('<effect> login fail ', error);
            return of(new CreateToastAction({
                severity: Severity.ERROR,
                title: 'login failed',
                content: 'try again'
            }));
        })
    );

}
