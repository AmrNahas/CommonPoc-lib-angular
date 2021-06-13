import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {RegUserDto} from '../../../models/DTO/RegUserDto';
import {AppSettings} from '../../../app.settings';
import {DropDownService} from '../../../services/commonServices/drop-down-service.service';
import {matchingPasswords} from '../../../theme/utils/app-validators';
import {RegService} from '../../../services/publicServices/RegService';
import {Constants} from "../../../models/utilites/Constants";
import {
    GenericFormValidators,
    LocalSelectItem,
    MessagesService,
    UtilityController
} from "../../../../../dist/app-common";
import {AuthService} from "../../../AuthModule/AuthService";



@Component({
    selector: 'app-register',
    templateUrl: './cust_register.component.html'
})
export class CustomerRegister extends UtilityController implements OnInit {

    public sysCountries: LocalSelectItem[];
    public cities: LocalSelectItem[];
    public form: FormGroup;
    public settings: Settings;
    public regUser: RegUserDto;
    public submitted:boolean;
    public Constants=Constants;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, private regService: RegService,
                public router: Router, private authService: AuthService, private msgService: MessagesService, private dropDownService: DropDownService) {
        super();

        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'firstName': [null, Validators.compose([Validators.required,GenericFormValidators.StartWithSpaceValidator])],
             'typeId': [null, Validators.compose([Validators.required])],
            'lastName': [null, Validators.compose([Validators.required,GenericFormValidators.StartWithSpaceValidator])],
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'userName': [null, Validators.compose([Validators.required, Validators.minLength(5),GenericFormValidators.WithOutSpaceValidator])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8),GenericFormValidators.WithOutSpaceValidator])],
            // 'phoneNumber': [null, Validators.compose([Validators.required, GenericFormValidators.KsaPhoneValidator])],
            'confirmPassword': [null, Validators.required]
        }, {validator: matchingPasswords('password', 'confirmPassword')});


    }


    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.form.disable();
            this.regUser = this.form.value;
            this.submitted=true;
            this.regService.signUp(this.regUser).subscribe(
                  data => {
                      this.form.enable();
                      this.msgService.showInfoMessageLocal("registration.submit.server.success");
                       this.router.navigate(["login"]);
                  },
                  error => {
                      this.form.enable();
                      this.msgService.showErrorMessage(error.error.messageAr);
                  }
              );
            this.submitted=false;

        } else {
            this.msgService.showErrorMessageLocal('registration.submit.not.valid.error');
        }
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }

    ngOnInit(): void {
        this.disableF5Event();
        this.prepareCountriesList();
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
            this.cities = data;
        });
    }


}
