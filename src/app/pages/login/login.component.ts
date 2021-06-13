import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {AlertService} from 'src/app/services/AlertServices/alert.service';
import {TranslateService} from '@ngx-translate/core';

import {AuthUser} from '../../AuthModule/AuthUser';
import {PartiesEnum} from "../../models/utilites/PartiesEnum";
import {AuthService} from "../../AuthModule/AuthService";
import {MessagesService} from "app-common";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public form: FormGroup;
    public settings: Settings;
    public user: AuthUser;
    public loading: boolean;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private userService: UsersService,
                private myNewAuthService: AuthService, public translate: TranslateService,
                private alertService: AlertService, private messagesService: MessagesService) {

        // , Validators.minLength(6)]

        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            userName: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])]
        });


    }

    public onSubmit(): void {

        if (this.form.valid) {
            this.form.disable();
            this.loading = true;
            this.myNewAuthService.signIn(this.form.controls.userName.value, this.form.controls.password.value)
                .subscribe(
                    data => {
                        this.form.enable();
                        this.loading = false;
                        this.goToCorrectPage(data.typeId);
                    },
                    error => {
                        this.form.enable();
                        this.loading = false;
                        console.log(error.error);
                        this.messagesService.showErrorMessage(error.error.messageAr);
                    });
        }


    }


    goToCorrectPage(typeId: number) {
        if (typeId == PartiesEnum.ADMIN)
            this.router.navigate(['']);
        else if (typeId == PartiesEnum.CUSTOMER)
            this.router.navigate(['']);
        // else if (typeId == PartiesEnum.SERVICE_PROVIDER)
        //     this.router.navigate(['/spDashboard']);
        else  this.router.navigate(['']);
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
}
