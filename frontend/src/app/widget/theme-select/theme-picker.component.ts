import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';


export interface ThemeChoice {
    label: string;
    value: string;
}


@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html'

})
export class ThemePickerComponent implements OnInit {

    public themeChoices: ThemeChoice[] = [
        {value: 'default-theme', label: 'Default'},
        {value: 'light-theme', label: 'Light'},
        {value: 'dark-theme', label: 'Dark'}
    ];

    public currentTheme: ThemeChoice;

    constructor(private overlayContainer: OverlayContainer) { }

    ngOnInit() {
    }

    installTheme(value: string) {
        this.currentTheme = this.themeChoices.find( (themeChoice: ThemeChoice) => themeChoice.value === value );
    }
}
