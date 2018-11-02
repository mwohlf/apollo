import {Injectable} from '@angular/core';

declare var Keycloak: any;

// see: https://medium.com/@blained3/connecting-keycloak-to-angular-d175c92a0dd3

@Injectable({
    providedIn: 'root'
})
export class KeycloakService {

    constructor() { }

    private keycloakAuth: any;

    public init(): Promise<any> {
        return new Promise((resolve, reject) => {
            const config = {
                'url': 'http://localhost:8081/auth',
                'realm': 'apollo',
                'clientId': 'apollo-backend'
            };
            this.keycloakAuth = new Keycloak(config);

            this.keycloakAuth.init() // ({ onLoad: 'login-required' })
                .success(() => {
                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }

    public getToken(): string {
        return this.keycloakAuth.token;
    }

}
