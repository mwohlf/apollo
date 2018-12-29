import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from './services/keycloak.service';
import {ThemeChoice, ThemeService} from './config/theme.service';
import {Subscription} from 'rxjs';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    private body: HTMLElement;
    private overlay: HTMLElement;

    constructor(private overlayContainer: OverlayContainer,
                private keycloakService: KeycloakService,
                private themeService: ThemeService) {
    }

    ngOnInit(): void {
        this.keycloakService.init();

        this.body = document.getElementsByTagName('body')[0];
        this.overlay = this.overlayContainer.getContainerElement();

        this.subscription = this.themeService.subscribe((last: ThemeChoice, next: ThemeChoice) => {
            console.log('<ngOnInit> switching from ', last);
            console.log('<ngOnInit> switching to ', next);

            this.overlay.classList.remove(last.value);
            this.body.classList.remove(last.value);

            this.overlay.classList.add(next.value);
            this.body.classList.add(next.value);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
