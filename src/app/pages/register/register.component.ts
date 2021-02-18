import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchingPasswords} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../AuthModule/AuthService';
import {MessagesService} from '../../appCommon/utility/MessagesService';
import {DropDownService} from '../../services/commonServices/drop-down-service.service';
import {LocalSelectItem} from '../../appCommon/models/dto/LocalSelectItem';
import {UtilityController} from '../../appCommon/controllers/UtilityController';
import {RegUserDto} from '../../models/DTO/RegUserDto';
import {GenericFormValidators} from '../../appCommon/customFormValidators/GenericFormValidators';
import {RegService} from '../../services/publicServices/RegService';
import {Constants} from "../../models/utilites/Constants";
import {AttImgDialogComponent} from "../../appCommon/CustomeComponents/attachmentPreview/att-img-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AcceptValidator, MaxSizeValidator} from "@angular-material-components/file-input";
import {AgrementDialogComponent} from "../../appCommon/CustomeComponents/AgreementViewDialoge/agrement-dialog.component";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']

})
export class RegisterComponent extends UtilityController implements OnInit {

    public sysCountries: LocalSelectItem[];
    public cities: LocalSelectItem[];
    public form: FormGroup;
    public settings: Settings;
    public regUser: RegUserDto;
    public loading: boolean
    public Constants = Constants;
    public maxSize = 16;
    public spFile: File

    constructor(public appSettings: AppSettings, public fb: FormBuilder, private regService: RegService, public dialog: MatDialog,
                public router: Router, private authService: AuthService, private msgService: MessagesService, private dropDownService: DropDownService) {
        super();

        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'organisationName': [null],
            'firstName': [null, Validators.compose([Validators.required, GenericFormValidators.WithOutSpaceValidator])],
            'middleName': [null],
            'lastName': [null, Validators.compose([Validators.required, GenericFormValidators.WithOutSpaceValidator])],
            'email': [null, Validators.compose([Validators.required, Validators.email])],
            'userName': [null, Validators.compose([Validators.required, Validators.minLength(5), GenericFormValidators.WithOutSpaceValidator])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), GenericFormValidators.WithOutSpaceValidator])],
            'cntryId': [null],
            'phoneNumber': [null, Validators.compose([Validators.required, GenericFormValidators.KsaPhoneValidator])],
            'confirmPassword': [null, Validators.required],
            'typeId': [Constants.SP_TYPE_INDIV],
            'organisationAddress': [null],
            'commercialRegNum': [null],
            'idNo': [null, Validators.compose([Validators.maxLength(10), Validators.minLength(10), GenericFormValidators.WithOutSpaceValidator])],
            'agreement': [null, Validators.required],
            'commRegFile': [null, [MaxSizeValidator(this.maxSize * 1024)]],
            'IdentityPic': [null, [MaxSizeValidator(this.maxSize * 1024)]],

        }, {validator: matchingPasswords('password', 'confirmPassword')});


    }

    requiredIfComp(formControl: AbstractControl) {
        if (!formControl.parent) {
            return null;
        }

        if (formControl.parent.get('typeId').value == Constants.SP_TYPE_COMP) {
            console.warn("required  >> " + formControl.parent.get('typeId').value);
            return Validators.required(formControl);
        }
        return null;
    }

    requiredIfIndiv(formControl: AbstractControl) {
        if (!formControl.parent) {
            return null;
        }

        if (formControl.parent.get('typeId').value == Constants.SP_TYPE_INDIV) {
            console.warn("required IdNo");
            return Validators.required(formControl);
        }
        return null;
    }


    fileMasterPicView(type: number) {
        let value = type == Constants.SP_TYPE_COMP ? this.form.controls.commRegFile.value : this.form.controls.IdentityPic.value;
        let dialogRef = this.dialog.open(AttImgDialogComponent, {
            data: value,
            disableClose: true,
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }

    agreementView() {
        let dialogRef = this.dialog.open(AgrementDialogComponent, {
            data: "dfdf",
            disableClose: true,
            direction: this.appSettings.settings.rtl ? 'rtl' : 'ltr',
        });
    }


    removeMasterPicFile(type: number) {
        if (type == Constants.SP_TYPE_COMP)
            this.form.controls.commRegFile.setValue(null);
        else
            this.form.controls.IdentityPic.setValue(null);
    }

    checkMandatoryFields(type: number): boolean {
        if (this.form.controls.typeId.value == Constants.SP_TYPE_COMP) {
            if (this.form.controls.organisationName.value == null || this.form.controls.commRegFile.value == null
                || this.form.controls.organisationAddress.value == null
                || this.form.controls.commercialRegNum.value == null) {
                return false;
            }

        } else {
            if (this.form.controls.organisationAddress.value == null || this.form.controls.idNo.value == null || this.form.controls.IdentityPic.value == null)
                return false;
        }
        return true;
    }

    public onSubmit(values: Object): void {
        try {
            if (this.form.valid) {
                if (this.checkMandatoryFields(this.form.controls.typeId.value)) {
                    this.loading = true;
                    this.form.disable();

                    if (this.form.controls.typeId.value == Constants.SP_TYPE_COMP)
                        this.spFile = this.form.controls.commRegFile.value;
                    else
                        this.spFile = this.form.controls.IdentityPic.value;
                    this.regUser = this.form.value;
                    this.regService.spSignUp(this.regUser, this.spFile).subscribe(
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
                    this.loading = false;
                } else {
                    this.msgService.showErrorMessageLocal('validation.dataUnComplete');
                }
            } else {
                this.msgService.showErrorMessageLocal('registration.submit.not.valid.error');
            }
        }
        catch (e) {
            console.error(e);
            this.msgService.showErrorMessageLocal('validation.front.error');
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
