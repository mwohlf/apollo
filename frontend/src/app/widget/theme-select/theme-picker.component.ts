import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from '../../config/theme.service';


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

    public themeChoices: any = ThemeService.THEME_CHOICES;

    constructor(private overlayContainer: OverlayContainer,
                private themeService: ThemeService) { }

    ngOnInit() {
    }

    installTheme(value: string) {
        this.nextTheme = ThemeService.THEME_CHOICES.find( (themeChoice: ThemeChoice) => themeChoice.value === value );
        this.themeService.installTheme(this.nextTheme);
    }

}
