import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {PhotoDTO} from "../../../models/DTO/PhotoDTO";



export enum FileType {
    PDF = 1,
    IMAGE = 2,
    OTHER = 3,

}

@Component({
    selector: 'app-att64-preview-dialog',
    templateUrl: './att-img64-dialog.component.html',
    styleUrls: ['./att-img64-dialog.component.scss']

})
export class AttImg64DialogComponent implements OnInit {
    public FileTypeEnum = FileType;
    public previewUrl: any = null;
    public fileType: FileType;
    public loading: boolean;
    public fileUrlToDownload: any;

    constructor(public dialogRef: MatDialogRef<PhotoDTO>, @Inject(MAT_DIALOG_DATA) public fileImage: PhotoDTO, private sanitizer: DomSanitizer) {
        var mimeType = this.fileImage.fileType;
        if (mimeType == 'image/jpg' || mimeType == 'image/png' || mimeType == 'image/jpeg') {
            this.fileType = FileType.IMAGE;
        } else if (mimeType == 'application/pdf') {
            this.fileType = FileType.PDF;
        } else {
            this.fileType = FileType.OTHER;
        }

    }

    ngOnInit() {
        // const blob = this.convertBase64ToBlobData(this.fileImage.userPhotoBase64, this.fileImage.fileType, 512);
        // this.loading = true;
        // this.fileUrlToDownload = this.fileUrlToDownload = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob.slice()));
        // this.preview();
        // this.loading = false;
    }

    downloadFile() {
        let base64Data: string = this.fileImage.userPhotoBase64;
        let contentType: string = this.fileImage.fileType;
        let filename: string = this.fileImage.fileName;
        let sliceSize: number = 512
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: contentType});
       // const blob = new Blob([blobData], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    }


    close():void {
        this.dialogRef.close();
    }

    download() {
        const url = window.URL.createObjectURL(this.fileImage.userPhotoBytes);
    }


    preview() {
        if (this.fileType != FileType.OTHER) {
            /* var reader = new FileReader();
             reader.readAsDataURL(this.fileImage);*/
            //     this.fileUrlToDownload = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.fileImage.slice()));
            /*    reader.onload = (_event) => {
                    this.previewUrl = reader.result;
                };*/
        } else {
            //   this.messagesService.showErrorMessage('Type Of Image Not Allowed');
            this.previewUrl = null;
            return;
        }

    }

}
