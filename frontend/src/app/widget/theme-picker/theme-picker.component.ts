import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemePickerService} from '../../services/theme-picker.service';
import * as themeActions from '../../store/actions/theme.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';


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

    public themeChoices: any = ThemePickerService.THEME_CHOICES;

    constructor(private overlayContainer: OverlayContainer,
                private themePickerService: ThemePickerService,
                private store: Store<fromRoot.State>
                ) { }

    ngOnInit() {
    }

    installTheme(value: string) {
        this.nextTheme = ThemePickerService.THEME_CHOICES.find( (themeChoice: ThemeChoice) => themeChoice.value === value );
        this.store.dispatch(new themeActions.ApplyTheme(this.nextTheme));
        // this.themePickerService.installTheme(this.nextTheme);
    }

}
