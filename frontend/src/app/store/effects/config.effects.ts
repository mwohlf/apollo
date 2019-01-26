import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {ApplicationProperties, ConfigControllerService} from '../../../generated';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ConfigActions, ConfigActionTypes, ConfigFailedAction, ConfigLoadAction, ConfigSuccessAction} from '../actions/config.actions';
import {CreateToastAction, ToastActions} from '../actions/toast.actions';
import {Severity} from './toast.effect';
import { EMPTY } from 'rxjs';


// effects
// see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
//  see: https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c
//  see: https://stackoverflow.com/questions/52728922/property-pipe-does-not-exist-on-type-actionsaction-among-others
//  see: https://medium.com/@webWhizJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329
//
// this is where the services are being called, actions are consumed and dispatched back to the store...
// Simply speaking, an effect is an Observable that maps its items to actions that will then be dispatched to the store automatically.
// In most cases, the source of an Effect is the global stream of actions:
@Injectable()
export class ConfigEffects {

    constructor(private actions: Actions<ConfigActions>,
                private configControllerService: ConfigControllerService) {}


                // ROOT_EFFECTS_INIT is some sort of initializer action we use this to trigger config load from the backend
    @Effect()
    initConfigAction: Observable<ConfigActions> = this.actions.pipe(   //
        ofType(ROOT_EFFECTS_INIT),
        map(() => new ConfigLoadAction())
    );

    @Effect()
    loadConfigAction: Observable<ConfigActions> = this.actions.pipe(   //
        ofType(ConfigActionTypes.LOAD),
        switchMap(() => {
            console.log('<effect> load config ');
            // convert into another action ...
            return this.configControllerService.getApplicationProperties().pipe(
                // got a bearer token
                map(config => new ConfigSuccessAction(config)),
                // failed
                catchError(error => of(new ConfigFailedAction(error)))
            );
        })
    );

    @Effect()
    configSuccessAction: Observable<ConfigActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(ConfigActionTypes.LOAD_SUCCESS),
        map(action => action.payload),
        switchMap((applicationProperties: ApplicationProperties) => {
            console.log('<effect> config success ', applicationProperties);
            // done
            return EMPTY;
        })
    );

    @Effect()
    configFailedAction: Observable<ToastActions> = this.actions.pipe(   //
        // only interested in the login action
        ofType(ConfigActionTypes.LOAD_FAILED),
        map(action => action.payload),
        switchMap((error: any) => {
            console.log('<effect> config fail ', error);
            return of(new CreateToastAction({
                severity: Severity.ERROR,
                title: 'read config failed',
                content: 'try again'
            }));
        })
    );

}
