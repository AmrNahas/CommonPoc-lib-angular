import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {Router} from '@angular/router';
import {SysPermission} from "../../../../models/SysPermssions";
import {RegUserDto} from "../../../../models/DTO/RegUserDto";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SysPermsService} from "../../../../services/sysPermsServices/sysPermsService.service";
import {MessagesService} from "../../../../appCommon/utility/MessagesService";
import {AuthService} from "../../../../AuthModule/AuthService";
import {PartiesEnum} from "../../../../models/utilites/PartiesEnum";
import {User} from "../../../../models/user";


@Component({
    selector: 'app-Sp-users-perms-dialog',
    templateUrl: './editSpUsersPem-dialog.component.html',
    styleUrls: ['./editSpUsersPem-dialog.component.scss']

})
export class EditSpUsersPemDialogComponent implements OnInit {
    public perms: SysPermission [];
    public regUser: RegUserDto;
    public submitted: boolean;
    public load: boolean;
    public form: FormGroup;
    public currentperms: number[];

    constructor(public dialogRef: MatDialogRef<EditSpUsersPemDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public user: User, public permsService: SysPermsService,
                private userService: UsersService, public fb: FormBuilder, private router: Router, public  messagesService: MessagesService,
                private authService: AuthService) {
        this.currentperms = [];
        this.form = this.fb.group({
            selectedPermIds: [this.currentperms, Validators.compose([Validators.required])],

        });
    }

    prepareAllPermsForParty() {
        this.permsService.getAllPermsByPartyAndUser(PartiesEnum.SERVICE_PROVIDER, this.user.id).subscribe(data => {
                this.perms = data;
                if (this.perms) {
                    this.perms.forEach(item => {
                        if(item.statusForRole)
                        this.currentperms.push(item.id)
                    })
                    this.form.controls.selectedPermIds.setValue(this.currentperms);
                }
            },
            error => {
                this.messagesService.showErrorMessage(error.error.messageAr);
            });


    }

    trackByFn(index: any, item: any) {
        return index;
    }

    ngOnInit() {
        this.load = true;
        this.prepareAllPermsForParty();
        this.load = false;
    }


    close(): void {
        this.dialogRef.close();
    }


    public updateUser() {
        try {
            this.regUser = new RegUserDto();
            this.regUser.permsIdList = this.form.controls.selectedPermIds.value;
            this.regUser.userName = this.authService.currentUserValue.userName;
            this.regUser.id = this.user.id;
            this.submitted = true;
            this.userService.addUserAdminPermSp(this.regUser).subscribe(
                data => {
                    this.messagesService.showInfoMessageLocal('registration.Updating.profile.success');
                    this.dialogRef.close();
                },
                error => {
                    this.messagesService.showErrorMessage(error.error.messageAr);
                }
            );
            this.submitted = false;
        } catch (e) {
            console.warn(e);

        }
    }


}
