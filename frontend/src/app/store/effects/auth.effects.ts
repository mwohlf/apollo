import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoginControllerService, TokenCredentials, UserCredentials} from '../../../generated';
import {AuthActions, AuthActionTypes, LoginFailedAction, LoginSuccessAction} from '../actions/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CreateToastAction, ToastActions} from '../actions/toast.actions';
import {Severity} from './toast.effect';
import {Router} from '@angular/router';

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
                private router: Router,
                private loginControllerService: LoginControllerService) {}

    @Effect()
    loginAction: Observable<AuthActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN),
        // read the payload needed to login
        map(action => action.payload),
        //
        switchMap((usernamePasswordCredential: UserCredentials) => {
            console.log('<effect> login ', usernamePasswordCredential);
            // convert into another action ...
            return this.loginControllerService.authenticate(usernamePasswordCredential).pipe(
                // got a bearer token
                map(response => {
                    if ('error' in response) {
                        // error: "unauthorized_client"
                        // error_description: "Client secret not provided in request"
                        return new LoginFailedAction(response);
                    } else {
                        // access_token: "eyJhbGciOiJSU7_4HUQWT8-ue5FbJ7AqRfxfkpxV--2rfIhdaSn9FwXM4O9novoSW72xqh0NWFHbjhcCWOsfBZLBFpXBB6gfEfdoo_a0HrkgHw1sLf0Mt_7NkwKipk4I50RwzIUOQ"
                        // expires_in: "300"
                        // not-before-policy: "0"
                        // refresh_expires_in: "1800"
                        // refresh_token: "..94BjJI-okfx_vu2dxXpYqjMLRSCV5iyjrpwkObMtbI0"
                        // scope: "email profile"
                        // session_state: "b261fc5e-62f5-48d4-a1c1-78ee79808960"
                        // token_type: "bearer"
                        return new LoginSuccessAction(response);
                    }
                }),
                // failed
                catchError(error => of(new LoginFailedAction(error)))
            );
        })
    );

    @Effect()
    loginSuccess: Observable<ToastActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        map(action => action.payload),
        tap(() => { this.router.navigate(['page1']); }),
        tap(() => { console.log("navigating away..."); }),
        switchMap((bearerTokenCredential: TokenCredentials) => {
            console.log('<effect> login success ', bearerTokenCredential);
            return of(new CreateToastAction({
                severity: Severity.INFO,
                title: 'login success',
                content: 'welcome!'
            }));
        })
    );

    @Effect()
    loginFailed: Observable<ToastActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN_FAILURE),
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
