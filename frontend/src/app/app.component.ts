import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from './services/keycloak.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private overlayContainer: OverlayContainer,
                private keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
        this.keycloakService.init();
    }

    ngOnDestroy(): void {

    }

}
