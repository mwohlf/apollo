import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import * as themeActions from '../../store/actions/theme.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {ThemeEffects} from '../../store/effects/theme.effects';


export interface ThemeChoice {
    label: string;
    value: string;
}


@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html'

})
export class ThemePickerComponent implements OnInit {

    public nextTheme: ThemeChoice;

    public themeChoices: any = ThemeEffects.THEME_CHOICES;

    constructor(private overlayContainer: OverlayContainer,
                private store: Store<fromRoot.State>) { }

    ngOnInit() {
    }

    installTheme(value: string) {
        this.nextTheme = ThemeEffects.THEME_CHOICES.find( (themeChoice: ThemeChoice) => themeChoice.value === value );
        this.store.dispatch(new themeActions.ApplyTheme(this.nextTheme));
    }

}
