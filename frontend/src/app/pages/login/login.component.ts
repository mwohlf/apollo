import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginControllerService} from "../../../generated";
import {UsernamePasswordCredential} from "../../../generated";
import {MonoOfBearerTokenCredential} from "../../../generated/model/monoOfBearerTokenCredential";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private loginControllerService: LoginControllerService) { }

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
        });
    }

    public login(): void {
        console.debug("<login>");
        const usernamePasswordCredential: UsernamePasswordCredential = {
            password: this.loginForm.controls["username"].value,
            useranme: this.loginForm.controls["password"].value
        };
        this.loginControllerService.authenticateUsingPOST(usernamePasswordCredential).subscribe(
            (next: MonoOfBearerTokenCredential) => {
                console.info("<login>", next);
            }
        );
    }

}
