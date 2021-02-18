import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {AlertService} from 'src/app/services/AlertServices/alert.service';
import {User} from '../../models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {MessagesService} from '../../appCommon/utility/MessagesService';
import {AuthService} from '../../AuthModule/AuthService';
import {AuthUser} from '../../AuthModule/AuthUser';
import {HttpResponse} from '@angular/common/http';
import {PartiesEnum} from "../../models/utilites/PartiesEnum";


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
                        this.goToCorrectPage(data.partyId);
                    },
                    error => {
                        this.form.enable();
                        this.loading = false;
                        console.log(error.error);
                        this.messagesService.showErrorMessage(error.error.messageAr);
                    });
        }


    }


    goToCorrectPage(partyId: number) {
        if (partyId == PartiesEnum.ADMIN)
            this.router.navigate(['']);
        else if (partyId == PartiesEnum.CUSTOMER)
            this.router.navigate(['']);
        else if (partyId == PartiesEnum.SERVICE_PROVIDER)
            this.router.navigate(['/spDashboard']);
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }
}
