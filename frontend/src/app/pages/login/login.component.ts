import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BearerTokenCredential, LoginControllerService} from "../../../generated";
import {UsernamePasswordCredential} from "../../../generated";

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
        this.loginControllerService.authenticate(usernamePasswordCredential).subscribe(
            (next: BearerTokenCredential) => {
                console.info("<login>", next);
            }
        );
    }

}
