import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ScheduleDialogComponent} from './schedule-dialog/schedule-dialog.component';
import {blockTransition} from "../../../theme/utils/app-animation";
import {Subject} from "rxjs";
import {AppSettings} from "../../../app.settings";
import {Settings} from "../../../app.settings.model";
import {MyCalenderEvent} from "../../../models/DTO/calenderSheduale/MyCalenderEvent";
import {EventsService} from "../../../services/evenets/eventsService";
import {UtilityController} from "../../../appCommon/controllers/UtilityController";


const colors: any = {
    current: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    future: {
        primary: '#257995',
        secondary: 'rgba(37,121,149,0.64)'
    },
    done: {
        primary:  'rgba(37,121,149,0.41)',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    animations: [blockTransition],
    host: {
        '[@blockTransition]': ''
    }
})
export class ScheduleComponent extends UtilityController implements OnInit {
    view: string = 'month';
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;
    events: CalendarEvent[]=[];
    loading :boolean;

    actions: CalendarEventAction[] = [{
        label: '<i class="material-icons icon-sm white">pageview</i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
            this.openScheduleDialog(event);
        }
    }];

/*, {
    label: '<i class="material-icons icon-sm white">close</i>',
    onClick: ({event}: { event: CalendarEvent }): void => {
    this.events = this.events.filter(iEvent => iEvent !== event);
    this.snackBar.open('Event deleted successfully!', null, {
    duration: 1500
});
}
}*/

    /*events: CalendarEvent[] = [{
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        actions: this.actions
    }, {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
        actions: this.actions
    }, {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue
    }, {
        start: addHours(startOfDay(new Date()), 2),
        end: new Date(),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        actions: this.actions,
        resizable: {
            beforeStart: true,
            afterEnd: true
        },
        draggable: true
    }];*/
    refresh: Subject<any> = new Subject();
    public settings: Settings;
    public month: number;
    public year: number;

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                public snackBar: MatSnackBar, public service: EventsService) {
        super();
        this.settings = this.appSettings.settings;
        this.month=new Date().getMonth();
        this.year=new Date().getFullYear();
    }

    ngOnInit() {
        this.prepareEvents();

    }

    prepareEvents() {
        this.loading=true;
        this.service.getEventsForCurrentUserByMonth(this.month,this.year).subscribe((data: MyCalenderEvent[]) => {
            this.events = [];
            data.forEach(item => {
                let x: CalendarEvent = {
                    start: addHours(startOfDay(new Date(item.startDateLong)), item.startHour),
                    end:  addHours(startOfDay(new Date(item.endDateLong)), item.endHour),
                    title: this.isArabicLang()? item.title :item.titleEn,
                    color: this.checkItemColor(item.startDateLong),
                    actions: this.actions
                }
                this.events.push(x);
            });
            this.loading=false;
        });

    }

    checkItemColor(startDate:number) :any{
       if(startDate){
           if(new Date(startDate).getDate() == new Date().getDate()   )
               return colors.current;
           if(startDate < new Date().getTime() )
               return colors.done;
           else if(startDate > new Date().getTime() )
               return colors.future;
       }
       else
           return colors.done
    }

    change($event ) {
        let date:Date=$event;
        this.year=date.getFullYear();
        this.month=date.getMonth();
        this.prepareEvents() ;
    }

    dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    openScheduleDialog(event) {
        let dialogRef = this.dialog.open(ScheduleDialogComponent, {
            data: event
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (!result.isEdit) {
                    result.color = colors.blue;
                    result.actions = this.actions;
                    this.events.push(result);
                    this.refresh.next();
                } else {
                    //implement edit here
                }
            }
        });
    }

}
