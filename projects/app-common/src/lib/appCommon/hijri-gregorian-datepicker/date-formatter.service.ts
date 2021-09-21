import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import * as momentjs from 'moment';
const moment = momentjs;


import * as moment_ from 'moment-hijri';
const momentHijri = moment_;

/*@Injectable()*/
export class DateFormatterService {

  constructor(private parserFormatter: NgbDateParserFormatter) { }

    ToString(date: NgbDateStruct): string {
        const dateStr = this.parserFormatter.format(date);
        return dateStr;
    }

    // convert from Geo  NgbDateStruct to hijri NgbDateStruct for specific format
    ToHijriDateStruct(hijriDate: string, format: string): NgbDate  {
      const hijriMomentDate =  momentHijri(hijriDate , format); // Parse a Hijri date based on format.
      const day = hijriMomentDate.iDate();
      const month = +hijriMomentDate.iMonth() + 1 ;
      const year = hijriMomentDate.iYear();
      const ngDate =  new NgbDate(+year, month, +day);
      return ngDate;
   }

    // convert from hijri NgbDateStruct to Geo NgbDateStruct for specific format
    ToGregorianDateStruct(gregorianDate: string, format: string): NgbDate {
      const momentDate = moment(gregorianDate, format); // Parse a Gregorian date based on format.
      const day = momentDate.date();
      const month = +momentDate.month() + 1;
      const year = momentDate.year();
      const ngDate = new NgbDate(+year, +month, +day);
      return ngDate;
    }

    // convert from  Geo  NgbDateStruct to hijri  NgbDateStruct
    ToHijri(date: NgbDateStruct): NgbDateStruct {
        if (!date) {
            return null;
        }
        const dateStr = this.ToString(date);
        const momentDate = momentHijri(dateStr, 'D/M/YYYY');
        const day = momentDate.iDate();
        const month = +momentDate.iMonth() + 1 ;
        const year = momentDate.iYear();
        const ngDate =  new NgbDate(+year, month, +day);
        return ngDate;
    }

    // convert from hijri NgbDateStruct to Geo NgbDateStruct
    ToGregorian(date: NgbDateStruct) {
        if (!date) {
            return null;
        }
        const dateStr = this.ToString(date);
        const momentDate = momentHijri(dateStr, 'iD/iM/iYYYY');
        const day = momentDate.locale('en').format('D');
        const month = momentDate.locale('en').format('M') ;
        const year = momentDate.locale('en').format('Y');
        const ngDate =  new NgbDate(+year, +month, +day);
        return ngDate;
    }



    // get today NgbDateStruct Hijri date
    GetTodayHijri(): NgbDateStruct {
      const todayHijri = momentHijri().locale('en').format('iYYYY/iM/iD');
      return this.ToHijriDateStruct(todayHijri, 'iYYYY/iM/iD') ;
    }


    // get today NgbDateStruct  Gregorian date
    GetTodayGregorian(): NgbDateStruct {
      const todayGregorian = moment().locale('en').format('YYYY/M/D');
      return this.ToGregorianDateStruct(todayGregorian, 'YYYY/M/D') ;
    }



// convert NgbDateStruct  Hijri  date  to number >> 14411211
    ToNumber(value: NgbDateStruct): number {
        let strValue: string = null;
        let numValue: number = null;
        if (value) {
            let month = value.month >= 10 ? value.month : ('0' + value.month); // convert 1   to 01
            let day = value.day     >= 10 ? value.day   : ('0' + value.day);
            let year = value.year ;
            strValue =year + '' + month + '' + day;

        }
        if (strValue != null) {
            numValue = +strValue;
            return numValue;
        } else {
            return null;
        }
    }

    // convert string  Hijri  date  to NgbDateStruct
    ToDistrictHijriDateFromString(value: string): NgbDateStruct {
      if(!value)
          return null;
      else {
          const ngDate =  new NgbDate(+value.substring(0, 4), +value.substring(4, 6), +value.substring(6, 8));
          return ngDate;
      }
    }


    // convert number  Hijri  date  to NgbDateStruct
    ToDistrictHijriDateFromNumber(value: number): NgbDateStruct {
        if(!value)
            return null;
        else {
            const ngDate =  new NgbDate(+value.toString().substring(0, 4), +value.toString().substring(4, 6), +value.toString().substring(6, 8));
            return ngDate;
        }
    }

}
