import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsernamePasswordCredential} from '../../../generated';

import * as fromRoot from '../../store/reducers';
import * as authActions from '../../store/actions/auth.actions';
import {Store} from '@ngrx/store';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private store: Store<fromRoot.State>) {}

    // constructor(private loginControllerService: LoginControllerService) { }

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    public login(): void {
        const usernamePasswordCredential: UsernamePasswordCredential = {
            password: this.loginForm.controls['password'].value,
            useranme: this.loginForm.controls['useranme'].value
        };
        console.log('<login> triggered for usernamePasswordCredential ', usernamePasswordCredential);
        this.store.dispatch(new authActions.LoginAction(usernamePasswordCredential));
    }

}
