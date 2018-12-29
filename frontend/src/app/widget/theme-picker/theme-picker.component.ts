import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemePickerService} from '../../services/theme-picker.service';


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
                private themePickerService: ThemePickerService) { }

    ngOnInit() {
    }

    installTheme(value: string) {
        this.nextTheme = ThemePickerService.THEME_CHOICES.find( (themeChoice: ThemeChoice) => themeChoice.value === value );
        this.themePickerService.installTheme(this.nextTheme);
    }

}
