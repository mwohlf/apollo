import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoginControllerService, UsernamePasswordCredential} from '../../../generated';
import {AuthAction, AuthActionTypes, LoginFailedAction, LoginSuccessAction} from '../actions/auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

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

    constructor(private actions: Actions<AuthAction>,
                private loginControllerService: LoginControllerService) {}

    @Effect()
    initializeLogin: Observable<AuthAction> = this.actions.pipe(   //
        // only interested in the login action
        ofType(AuthActionTypes.LOGIN),
        // read the payload needed to login
        map(action => action.payload),
        //
        switchMap((usernamePasswordCredential: UsernamePasswordCredential) => {
            console.log("<effect> login with: ", usernamePasswordCredential);
            // convert into another action ...
            return this.loginControllerService.authenticate(usernamePasswordCredential).pipe(
                // got a bearer token
                map(customers => new LoginSuccessAction(customers)),
                // failed
                catchError(error => of(new LoginFailedAction(error)))
            );
        })
    );

}
