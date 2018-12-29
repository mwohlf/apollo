import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';


export interface ThemeChoice {
    value: string;
    viewValue: string;
}


@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html'

})
export class ThemePickerComponent implements OnInit {

    public themeChoices: ThemeChoice[] = [
        {value: 'default-theme', viewValue: 'Default'},
        {value: 'light-theme', viewValue: 'Light'},
        {value: 'dark-theme', viewValue: 'Dark'}
    ];

    constructor(private overlayContainer: OverlayContainer) { }

    ngOnInit() {
    }

}
