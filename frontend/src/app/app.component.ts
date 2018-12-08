import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "./services/keycloak.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    title = 'app';

    constructor(private keycloakService: KeycloakService) {

    }

    ngOnInit(): void {
        this.keycloakService.init();
    }

}
