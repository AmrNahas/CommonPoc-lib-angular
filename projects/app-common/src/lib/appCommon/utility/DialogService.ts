import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AppSettings} from "../app.settings";



@Injectable({
    providedIn: 'root'
})

// @NgModule({
//     imports: [
//         CommonModule
//     ],
//      declarations: [RolePermsDialogComponent],
//     exports: [RolePermsDialogComponent],
//     entryComponents: [RolePermsDialogComponent],
// })
export class DialogService {
      constructor(private snackBar: MatSnackBar,private appSettings: AppSettings,private translate: TranslateService,public dialog: MatDialog) { }


    //Open Dialog
    public openDialog(data:any,dialogComponent):any{
        let dialogRef = this.dialog.open(dialogComponent, {
            data: data,
            disableClose:true,
            direction:this.appSettings.settings.rtl?'rtl':'ltr',
        });
        return dialogRef;
    }




}
