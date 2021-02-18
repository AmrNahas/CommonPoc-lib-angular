import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';


export enum FileType {
    PDF = 1,
    IMAGE = 2,
    OTHER = 3,

}

@Component({
    selector: 'app-att-preview-dialog',
    templateUrl: './att-img-dialog.component.html',
    styleUrls: ['./att-img-dialog.component.scss']

})
export class AttImgDialogComponent implements OnInit {
    public FileTypeEnum = FileType;
    public previewUrl: any = null;
    public fileType: FileType;
    public loading: boolean;
    public fileUrlToDownload: any;

    constructor(public dialogRef: MatDialogRef<File>, @Inject(MAT_DIALOG_DATA) public fileImage: File, private sanitizer: DomSanitizer) {
        var mimeType = this.fileImage.type;
        if (mimeType.match(/image\/*/) != null) {
            this.fileType = FileType.IMAGE;
        } else if (mimeType == 'application/pdf') {
            this.fileType = FileType.PDF;
        } else {
            this.fileType = FileType.OTHER;
        }
    }

    ngOnInit() {
        this.loading = true;
        this.preview();
        this.loading = false;
    }

    close(): void {
        this.dialogRef.close();
    }

    download() {
        const url = window.URL.createObjectURL(this.fileImage.slice());
    }


    preview() {
        if (this.fileType != FileType.OTHER) {
            var reader = new FileReader();
            reader.readAsDataURL(this.fileImage);
            this.fileUrlToDownload = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.fileImage.slice()));
            reader.onload = (_event) => {
                this.previewUrl = reader.result;
            };
        } else {
            //   this.messagesService.showErrorMessage('Type Of Image Not Allowed');
            this.previewUrl = null;
            return;
        }

    }

}
