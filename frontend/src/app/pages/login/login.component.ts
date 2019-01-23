import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserCredentials} from '../../../generated';

import * as fromRoot from '../../store/reducers';
import * as authActions from '../../store/actions/auth.actions';
import {Store} from '@ngrx/store';


@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private store: Store<fromRoot.ApplicationState>) {}

    // constructor(private loginControllerService: LoginControllerService) { }

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    public login(): void {
        const usernamePasswordCredential: UserCredentials = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        };
        console.log('<login> triggered for usernamePasswordCredential ', usernamePasswordCredential);
        this.store.dispatch(new authActions.LoginAction(usernamePasswordCredential));
    }

}
