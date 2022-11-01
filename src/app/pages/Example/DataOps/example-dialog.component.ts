import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import {SysPermission} from '../../../models/SysPermssions';
import {RegUserDto} from '../../../models/DTO/RegUserDto';
import {Country} from "../../../models/country";
import {User} from "../../../models/user";
import {UsersService} from "../../../services/usersServices/users.service";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {SysPermsService} from "../../../services/sysPermsServices/sysPermsService.service";
import {AuthService} from "../../../AuthModule/AuthService";
import {PartiesEnum} from "../../../models/utilites/PartiesEnum";
import {
    GenericFormValidators
} from "../../../../../projects/app-common/src/lib/appCommon/customFormValidators/GenericFormValidators";
import {MessagesService} from "../../../../../projects/app-common/src/lib/appCommon/utility/MessagesService";

@Component({
    selector: 'app-users-dialog',
    templateUrl: './example-dialog.component.html',
    styleUrls: ['./example-dialog.component.scss']

})
export class ExampleDialogComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;
    public sysCountries: Country [];
    public perms: SysPermission [];
    public regUser: RegUserDto;
    public submitted: boolean;

    constructor(public dialogRef: MatDialogRef<ExampleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public user: User, public permsService: SysPermsService,
                private userService: UsersService, public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private dropDownServices: DropDownService, private authService: AuthService) {

        this.form = this.fb.group({
            firstName: [null, Validators.compose([Validators.required, GenericFormValidators.StartWithSpaceValidator])],
            email: [null, Validators.compose([Validators.required, Validators.email])],
            userName: [null, Validators.compose([Validators.required, Validators.minLength(5), GenericFormValidators.WithOutSpaceValidator])],
            phoneNumber: [null, Validators.compose([Validators.required, GenericFormValidators.KsaPhoneValidator])],
            selectedPermIds: [null, Validators.compose([Validators.required])],
            // formArray: this.fb.array([]),
        });


    }

    prepareAllPermsForPart() {
        const form = this.form.get('formArray') as FormArray;
        this.permsService.getAllPermsByPartyId(PartiesEnum.ADMIN).subscribe(data => {
            this.perms = data;
            /*  data.map(item => {
                  const val = this.fb.group({
                      perm: [''],
                  });
                  form.push(val);
              });*/

        });

    }

    trackByFn(index: any, item: any) {
        return index;
    }

    ngOnInit() {
        this.prepareAllPermsForPart();
        this.user = new User();
    }


    close(): void {
        this.dialogRef.close();
    }


    public saveUser(values: Object): void {
        if (this.form.valid) {
            this.form.disable();
            this.regUser = this.form.value;
            this.regUser.permsIdList = this.form.controls.selectedPermIds.value;
            this.submitted = true;
            this.userService.addUserToRep(this.regUser).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('registration.submit.server.success');
                    this.dialogRef.close();
                },
                error => {
                    this.form.enable();
                    this.messagesService.showErrorMessage(error.error.messageAr);
                }
            );
            this.submitted = false;

        } else {
            this.messagesService.showErrorMessageLocal('registration.submit.not.valid.error');
        }
    }


}
