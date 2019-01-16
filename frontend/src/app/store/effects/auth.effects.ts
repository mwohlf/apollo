import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserCredentials, LoginControllerService, TokenCredentials} from '../../../generated';
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
                        //access_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwMFUxbEpkLXp6UTZIRDliU2dCTk1fR3drVUpicVE3QVRzWG5sQ1BCRy1jIn0.eyJqdGkiOiI4ZDQ3YzhkNy1mMmFkLTQxOTUtYjNmNS02ZmYwNDg2ZTY4NDAiLCJleHAiOjE1NDc2NzU1MDAsIm5iZiI6MCwiaWF0IjoxNTQ3Njc1MjAwLCJpc3MiOiJodHRwczovL213b2hsZmtleWNsb2FrLndlc3RldXJvcGUuYXp1cmVjb250YWluZXIuaW8vYXV0aC9yZWFsbXMvYXBvbGxvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjZiN2RmMzFmLTNmNDAtNDE1Ny1iZDM0LTc0NmJjZjQ0OTYxNyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwb2xsby1iYWNrZW5kIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYjI2MWZjNWUtNjJmNS00OGQ0LWExYzEtNzhlZTc5ODA4OTYwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0MSJ9.Q6F2WLQA0pBa7tnVB6hoJADt7XW7_4HUQWT8-KDabjKnZKJ6cJaaORZdgai5G39NVDZvys6c9Ojm3fCodFKGXvb9rjKXLKkCUqpgTfi7riY2IUzfXQvCvKHBo1aLDu9TUleA__3hQJhw-ue5FbJ7AqRfxfkpxV-5JzKVuSLyP2dTOZdMlmYtulBeiE6uvpr2v2lKuJoMuXBBT1XEKVrDppythkheSPEAG0NKqiX3cxeGHvntwmTHgh-2rfIhdaSn9FwXM4O9novoSW72xqh0NWFHbjhcCWOsfBZLBFpXBB6gfEfdoo_a0HrkgHw1sLf0Mt_7NkwKipk4I50RwzIUOQ"
                        // expires_in: "300"
                        // not-before-policy: "0"
                        // refresh_expires_in: "1800"
                        // refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkNGI5M2Y1My1mYmM0LTQ0ZGYtYjc1Ni1mYzQ5NTc2ODU2MDYifQ.eyJqdGkiOiI4NzdlMGViZi05MGE5LTQyZjktYjY5OS04ZTEwODViZjdjZjUiLCJleHAiOjE1NDc2NzcwMDAsIm5iZiI6MCwiaWF0IjoxNTQ3Njc1MjAwLCJpc3MiOiJodHRwczovL213b2hsZmtleWNsb2FrLndlc3RldXJvcGUuYXp1cmVjb250YWluZXIuaW8vYXV0aC9yZWFsbXMvYXBvbGxvIiwiYXVkIjoiaHR0cHM6Ly9td29obGZrZXljbG9hay53ZXN0ZXVyb3BlLmF6dXJlY29udGFpbmVyLmlvL2F1dGgvcmVhbG1zL2Fwb2xsbyIsInN1YiI6IjZiN2RmMzFmLTNmNDAtNDE1Ny1iZDM0LTc0NmJjZjQ0OTYxNyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhcG9sbG8tYmFja2VuZCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImIyNjFmYzVlLTYyZjUtNDhkNC1hMWMxLTc4ZWU3OTgwODk2MCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIn0.94BjJI-okfx_vu2dxXpYqjMLRSCV5iyjrpwkObMtbI0"
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
