import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LocalSelectItem} from "../../../../appCommon/models/dto/LocalSelectItem";

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent implements OnInit {
  public form:FormGroup;
  public timesListTo: LocalSelectItem[];
  public styleColor:  string;
  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ 
      'title': [{value: '', disabled: true}],
      'start': [{value: '', disabled: true}],
      'end': [{value: '', disabled: true}],
      'fromHour': [{value: '', disabled: true}],
      'toHour': [{value: '', disabled: true}],
      'isEdit' : false
    });

    this.prepareHours();
  }

  ngOnInit() {
    if (this.data){
      this.form.patchValue({
        'title': this.data.title,
        'start': this.data.start,
        'fromHour': this.data.start.getHours(),
        "toHour":this.data.end.getHours(),
        'end': this.data.end,
        'isEdit' : true
      })
      this.styleColor=this.data.color.primary;
    }
  }

  public prepareHours(){
    this.timesListTo=[];
    for (let i = 1; i < 18; i++) {
      let name: string = i > 12 ? i - 12 + ":00  " + "مساءا " : i + ":00 " + " صباحا ";
      let item: LocalSelectItem = new LocalSelectItem(name, name, i);
      this.timesListTo.push(item);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
