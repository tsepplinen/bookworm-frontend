import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {LoggerService} from "../../shared/logger/logger.service";
import {RegisterDetails} from "../../models/RegisterDetails";
import {LoginCredentials} from "../../models/LoginCredentials";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private logger: LoggerService, public fb: FormBuilder, private auth: AuthService,
                private router: Router) {
    }


    ngOnInit() {
        this.buildForm();
    }

    onSubmit(formData) {
        this.logger.msg(formData, 1);

        if (formData.password === formData.repeatPassword) {
            let user: RegisterDetails = new RegisterDetails();
            user.email = formData.email;
            user.username = formData.username;
            user.password = formData.password;

            this.auth.register(user).subscribe(result => {
                    let login = new LoginCredentials();
                    login.username = user.username;
                    login.password = user.password;
                    this.auth.authenticate(login).subscribe(result => {
                            this.router.navigate(['browse']);
                        },
                        error => {
                            if (error.status && error.status == 403) {
                                this.logger.msg("Failed to log in", 1);
                            }
                            this.logger.msg(error, 1);
                        });
                },
                error => {
                    this.logger.msg(error, 1);
                });
        }
    }

    buildForm(): void {
        this.registerForm = this.fb.group({
            email: ['', Validators.compose([Validators.required])],
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            repeatPassword: ['', Validators.compose([Validators.required])]
        });
    }

}
