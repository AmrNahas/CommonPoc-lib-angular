import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {DropDownService} from 'src/app/services/commonServices/drop-down-service.service';
import {AlertService} from 'src/app/services/AlertServices/alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthUser} from '../../../AuthModule/AuthUser';
import {AuthService} from '../../../AuthModule/AuthService';
import {LocalSelectItem} from '../../../appCommon/models/dto/LocalSelectItem';
import {HttpClient} from '@angular/common/http';
import {GenericFormValidators} from '../../../appCommon/customFormValidators/GenericFormValidators';
import {matchingPasswords} from '../../../theme/utils/app-validators';
import {UtilityController} from '../../../appCommon/controllers/UtilityController';
import {MessagesService} from '../../../appCommon/utility/MessagesService';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent extends UtilityController implements OnInit {
    public form: FormGroup;
    public passwordForm: FormGroup;
    public settingsForm: FormGroup;
    authUser: AuthUser;
    loading: boolean;
    submitted: boolean;
    loadFlag: boolean;
    public sysCountries: LocalSelectItem[];
    public cities: LocalSelectItem[];
    public langs: LocalSelectItem[];
    public themes: LocalSelectItem[];
    public currencies: LocalSelectItem[];
    public passwordFormEnableFlag: boolean;
    public settingsFormEnableFlag: boolean;
    public dataFormEnableFlag: boolean;
    public repName: String;

    constructor(private formBuilder: FormBuilder, private userService: UsersService, private httpClient: HttpClient, private dropDownService: DropDownService,
                private dropDownServices: DropDownService, private authService: AuthService, private msgService: MessagesService,
                private alertService: AlertService, public snackBar: MatSnackBar, private router: Router) {
        super();
        this.authUser = authService.currentUserValue;
        this.preparePasswordForm();
        this.prepareProfileForm();
        this.prepareSettingsForm();
        this.preparePrefDrops();

    }


    preparePrefDrops() {
        this.langs = [
            new LocalSelectItem('العربية', 'Arabic', 'ar'),
            new LocalSelectItem('الانجليزية', 'English', 'en')
        ];
        this.themes = [
            new LocalSelectItem('مضئ', 'Light', 1),
            new LocalSelectItem('مظلم', 'Dark', 2)
        ];
        this.currencies = [
            new LocalSelectItem('الريال السعودى', 'Saudi Riyal', 1),
        ];
    }

    preparePasswordForm() {
        this.passwordForm = this.formBuilder.group({
            id: [null],
            oldPassword: [null, Validators.required],
            newPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), GenericFormValidators.WithOutSpaceValidator])],
            confirmPassword: [null, Validators.required]

        }, {validator: matchingPasswords('newPassword', 'confirmPassword')});

    }

    prepareSettingsForm() {
        this.settingsForm = this.formBuilder.group({
            userId: [null],
            lang: [null, Validators.required],
            currency: [null, Validators.required],
            theme: [null, Validators.required]
        });

    }

    prepareProfileForm() {
        this.form = this.formBuilder.group({
            id: [null],
            firstName: [null, Validators.compose([Validators.required, GenericFormValidators.WithOutSpaceValidator])],
            middleName: [null],
            lastName: [null, Validators.compose([Validators.required, GenericFormValidators.WithOutSpaceValidator])],
            // age: [null,Validators.required, Validators.compose([ Validators.maxLength(2), Validators.min(1), Validators.minLength(1)])],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            userName: [null, Validators.compose([Validators.required, Validators.minLength(5), GenericFormValidators.WithOutSpaceValidator])],
            cntryId: [null],
            cityId: [null],
            identityNum: [null, Validators.compose([Validators.required, Validators.minLength(10), GenericFormValidators.WithOutSpaceValidator])],
            phoneNumber: [null, Validators.compose([Validators.required, GenericFormValidators.KsaPhoneValidator])],
        });
    }


    ngOnInit() {
        this.prepareCountriesList();
        this.prepareUserProfileData();
        this.prepareUserPreferncesData();
        this.passwordForm.controls.id.setValue(this.authUser.id);
        this.settingsForm.controls.userId.setValue(this.authUser.id);

        this.disableUserDataForm();
        this.disableUserPreferncesForm();
        this.disablePasswordForm();
    }

    prepareCountriesList() {
        this.dropDownService.getAllCountriesDropDownValues().subscribe((data: LocalSelectItem[]) => {
            this.sysCountries = data;
        });
    }

    prepareCitiesList() {
        var cntryId: any = this.form.controls.cntryId.value;
        if (cntryId) {
            this.prepareCitiesByCountry(cntryId);
        }
    }

    prepareCitiesByCountry(cntryId) {
        this.form.controls.cityId.setValue(null);
        this.dropDownService.getAllCitiesForCountryDropDown(cntryId).subscribe((data: LocalSelectItem[]) => {
            console.log(data);
            this.cities = data;
        });
    }


    prepareUserPreferncesData() {
        if (this.authUser.id) {
            this.userService.getCurrentUserPrefInfo(this.authUser.id).subscribe((data) => {
                this.settingsForm.controls['lang'].setValue(data.lang);
                this.settingsForm.controls['theme'].setValue(data.theme);
                this.settingsForm.controls['currency'].setValue(data.currency);
            });
        }
    }

    prepareUserProfileData() {
        if (this.authUser.id) {
            this.userService.getCurrentUserInfo(this.authUser.id).subscribe((data) => {
                this.repName = data.repName;
                this.form.controls['middleName'].setValue(data.middleName);
                this.form.controls['firstName'].setValue(data.firstName);
                this.form.controls['lastName'].setValue(data.lastName);
                this.form.controls['userName'].setValue(data.userName);
                this.form.controls['id'].setValue(data.id);
                this.form.controls['identityNum'].setValue(data.identityNum);
                this.form.controls['email'].setValue(data.email);
                this.form.controls['cntryId'].setValue(data.cntryId);
                this.form.controls['phoneNumber'].setValue(data.phoneNumber);
                // this.form.controls['age'].setValue(data.age);
                if (data.cntryId) {
                    this.prepareCitiesByCountry(data.cntryId);
                    this.form.controls['cityId'].setValue(data.cityId);
                }
                this.disableUserDataForm();
            });
        }

    }


    onChangePasswordSubmit() {
        if (this.passwordForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.passwordForm.disable();
            this.userService.updateUserPassword(this.passwordForm.value)
                .subscribe(
                    data => {
                        this.disablePasswordForm();
                        this.msgService.showInfoMessageLocal('registration.Updating.profile.success');
                    },
                    error => {
                        this.msgService.showErrorMessage(error.error.messageAr);

                    });
            this.loading = false;
            this.passwordForm.enable();
            this.submitted = false;
        } else {
            this.msgService.showErrorMessageLocal('registration.submit.not.valid.error');
        }
    }


    onChangeSettingsSubmit() {
        if (this.settingsForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.settingsForm.disable();
            console.log(this.settingsForm.value);
            this.userService.updateUserPreferences(this.settingsForm.value)
                .subscribe(
                    data => {
                        this.disableUserPreferncesForm();
                        this.msgService.showInfoMessageLocal('registration.Updating.profile.success');
                    },
                    error => {
                        this.msgService.showErrorMessage(error.error.messageAr);

                    });
            this.loading = false;
            this.settingsForm.enable();
            this.submitted = false;

        } else {
            this.msgService.showErrorMessageLocal('registration.submit.not.valid.error');
        }

    }


    public onSubmit(): void {

        if (this.form.valid) {
            this.submitted = true;
            this.loading = true;
            this.form.disable();
            this.userService.updateUserInfo(this.form.value)
                .subscribe(
                    data => {
                        this.disableUserDataForm();
                        this.msgService.showInfoMessageLocal('registration.Updating.profile.success');
                    },
                    error => {
                        this.msgService.showErrorMessage(error.error.messageAr);

                    });
            this.loading = false;
            this.form.enable();
            this.submitted = false;
        } else {
            this.msgService.showErrorMessageLocal('registration.submit.not.valid.error');
        }

    }


    enableUserDataForm() {
        try {
            console.log("lll");
            this.form.enable();
            this.dataFormEnableFlag = true;
        }
        catch (e) {
            console.warn(e)
        }
    }

    disableUserDataForm() {
        this.form.disable();
        this.dataFormEnableFlag = false;
    }

    enableUserPreferncesForm() {
        this.settingsForm.enable();
        this.settingsFormEnableFlag = true;
    }

    disableUserPreferncesForm() {
        this.settingsForm.disable();
        this.settingsFormEnableFlag = false;
    }

    enablePasswordForm() {
        this.passwordForm.enable();
        this.passwordFormEnableFlag = true;
    }

    disablePasswordForm() {
        this.passwordForm.disable();
        this.passwordFormEnableFlag = false;

    }
}

