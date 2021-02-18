  

export class PhotoDTO {
        userPhotoBase64:any;
        userPhotoBytes:any;
        fileName:string;
        fileType:string;
        fileTypeNum:number


        constructor(userPhotoBase64: any, userPhotoBytes: any, fileName: string, fileType: string, fileTypeNum: number) {
                this.userPhotoBase64 = userPhotoBase64;
                this.userPhotoBytes = userPhotoBytes;
                this.fileName = fileName;
                this.fileType = fileType;
                this.fileTypeNum = fileTypeNum;
        }
}
     

