import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ApplyTheme, CleanupTheme, InstallTheme, ThemeAction, ThemeActionTypes} from '../actions/theme.actions';
import {ThemeChoice} from '../../services/theme-picker.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {State} from '../reducers/theme.reducer';

// effects
// see: https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc
//  see: https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c
//  see: https://stackoverflow.com/questions/52728922/property-pipe-does-not-exist-on-type-actionsaction-among-others
//  see: https://medium.com/@webWhizJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329
// this is where the services are being called, actions are consumed and disoatched back to the store...
@Injectable()
export class ThemeEffects {

    constructor(private actions: Actions<ThemeAction>,
                private store: Store<fromRoot.State>) {
        console.log("<constructor> ", store)
    }

    @Effect()
    applyTheme: Observable<ThemeAction> = this.actions.pipe(
        // only interested in the login action
        ofType(ThemeActionTypes.APPLY),
        // read the payload needed to login
        // map(action => action.payload),
        withLatestFrom(this.store.select(state => state.theme)),
        switchMap(([applyThemeAction, themeChoice]: [ApplyTheme, State]) => {
            console.log("<effect> applyThemeAction: ", applyThemeAction);
            console.log("<effect> themeChoice: ", themeChoice);
            return of(new InstallTheme(applyThemeAction.payload));

            /*
            if (themeChoice !== undefined) {
                // return of(new RemoveTheme(undefined));
                return of(
                //    new CleanupTheme(themeChoice),
                    new InstallTheme(applyThemeAction.payload)
                );
            } else {
                return of(new ApplyTheme(themeChoice));
            }
            */
        })
    );

    @Effect()
    cleanupTheme: Observable<ThemeAction> = this.actions.pipe(   // : Observable<Action>
        // only interested in the login action
        ofType(ThemeActionTypes.CLEANUP),
        // read the payload needed to login
        map(action => action.payload),
        //
        switchMap((themeChoice: ThemeChoice) => {
            console.log("<effect> cleanup theme: ", themeChoice);
            // return of(new RemoveTheme(undefined));
            // Any of these will work
            // return no action from effects: http://www.wisdomofjim.com/blog/how-to-create-an-ngrx-effect-that-doesnt-return-an-action
            // return of({} as ThemeAction)
            // return (<ObservableInput<any>>{});ThemeAction
            return [];
        })
    );

    @Effect()
    installTheme: Observable<ThemeAction> = this.actions.pipe(   // : Observable<Action>
        // only interested in the login action
        ofType(ThemeActionTypes.INSTALL),
        // read the payload needed to login
        map(action => action.payload),
        //
        switchMap((themeChoice: ThemeChoice) => {
            console.log("<effect> install theme: ", themeChoice);

            // return of(new RemoveTheme(undefined));
            // Any of these will work
            // return no action from effects: http://www.wisdomofjim.com/blog/how-to-create-an-ngrx-effect-that-doesnt-return-an-action
            // return of({} as ThemeAction)
            // return (<ObservableInput<any>>{});ThemeAction
            return [];
        })
    );

}
