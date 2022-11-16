import {Component, OnInit} from '@angular/core';
import {UsersService} from 'src/app/services/usersServices/users.service';
// import { Binary } from "crypto";
import {UserPhotoDTO} from 'src/app/models/DTO/UserPhotoDTO';
import {AuthUser} from '../../AuthModule/AuthUser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from "../../../../projects/app-common/src/lib/appCommon/utility/MessagesService";
import {AuthService} from "../../AuthModule/AuthService";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    // userPhotoBArr:Binary[];
    imageBlobUrl: any;
    oldImageBlobUrl: any;
    authUser: AuthUser;
    public photoForm: FormGroup;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, public userService: UsersService, private msgService: MessagesService) {
        this.authUser = authService.currentUserValue;

        this.photoForm = this.formBuilder.group({
            userPhoto: ['', Validators.required],

        });
    }


    ngOnInit() {
   /*     this.userService.getUserPhoto(this.authUser.id).subscribe((data: UserPhotoDTORecv) => {
            this.imageBlobUrl = data.userPhotoBase64;
            this.oldImageBlobUrl = this.imageBlobUrl;
        });*/

    }


    onFileSubmit() {
        let userFileDto = new UserPhotoDTO(this.authUser, this.fileData);
        this.userService.updateUserPhoto(userFileDto).subscribe(
            data => {
                this.msgService.showInfoMessageLocal('registration.Updating.profile.success');

            },
            error => {
                this.msgService.showErrorMessageLocal('registration.submit.server.error');
            });
        this.previewUrl = false;
    }

    cancelChangeImage() {
        this.imageBlobUrl = this.oldImageBlobUrl;
        this.previewUrl = false;
    }


    fileProgress(fileInput: any) {
        this.fileData = <File> fileInput.target.files[0];
        this.preview();
    }

    preview() {
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            this.msgService.showErrorMessageLocal('validation.profile.pic.notvalid');
            this.previewUrl = null;
            return;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(this.fileData);
            reader.onload = (_event) => {
                this.previewUrl = true;
                this.imageBlobUrl = reader.result;
            };
        }

    }


}


