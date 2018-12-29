import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';


export interface ThemeChoice {
    label: string;
    value: string;
}


@Injectable()
export class ThemePickerService {

    public static THEME_CHOICES: ThemeChoice[] = [
        {value: 'default-theme', label: 'Default'},
        {value: 'light-theme', label: 'Light'},
        {value: 'dark-theme', label: 'Dark'},
    ];

    private last: ThemeChoice = ThemePickerService.THEME_CHOICES[0];

    private themeSubject: BehaviorSubject<ThemeChoice> = new BehaviorSubject<ThemeChoice>(ThemePickerService.THEME_CHOICES[0]);

    public installTheme(nextTheme: ThemeChoice): void {
        this.last = this.themeSubject.getValue();
        this.themeSubject.next(nextTheme);
    }

    public subscribe(callback: (last: ThemeChoice, next: ThemeChoice) => void): Subscription {
        return this.themeSubject.asObservable().subscribe( (next: ThemeChoice)  => {
            callback(this.last, next);
        });
    }

}
