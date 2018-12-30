import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ApplyTheme, CleanupTheme, InstallTheme, ThemeAction, ThemeActionTypes} from '../actions/theme.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {State} from '../reducers/theme.reducer';
import {OverlayContainer} from '@angular/cdk/overlay';

export interface ThemeChoice {
    label: string;
    value: string;
}

@Injectable()
export class ThemeEffects {

    public static THEME_CHOICES: ThemeChoice[] = [
        {value: 'default-theme', label: 'Default'},
        {value: 'light-theme', label: 'Green'},
        {value: 'dark-theme', label: 'Dark'},
    ];

    private body: HTMLBodyElement;

    private overlay: HTMLElement;


    constructor(private actions: Actions<ThemeAction>,
                private overlayContainer: OverlayContainer,
                private store: Store<fromRoot.State>) {
        console.log("<constructor> ", store);

        this.body = document.getElementsByTagName('body')[0];
        this.overlay = this.overlayContainer.getContainerElement();

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
            return of(
                new CleanupTheme(themeChoice.currentTheme),
                new InstallTheme(applyThemeAction.payload)
            );
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
            if (themeChoice) {
                this.overlay.classList.remove(themeChoice.value);
                this.body.classList.remove(themeChoice.value);
            }
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
            // side effects
            if (themeChoice) {
                this.overlay.classList.add(themeChoice.value);
                this.body.classList.add(themeChoice.value);
            }
            // no other action
            return [];
        })
    );

}
