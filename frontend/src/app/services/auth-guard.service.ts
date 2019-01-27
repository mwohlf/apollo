import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    private hasAccessToken: boolean = false;

    constructor(
        private store: Store<fromRoot.ApplicationState>,
        private router: Router
    ) {
        const token = this.store.select(state => state.auth.accessToken).subscribe((accessToken) => {
            console.log('<AuthGuardService> auth.accessToken ', accessToken);
            this.hasAccessToken = !(token === undefined);
        });
    }

    canActivate(): boolean {
        console.log('<canActivate> athis.hasAccessToken ', this.hasAccessToken);
        if (this.hasAccessToken) {
            return true;
        }
        this.router.navigateByUrl('/login');
        return false;
    }

}
