import {CalendarEvent, CalendarEventAction} from "angular-calendar";

export class MyCalenderAction implements CalendarEventAction{
    a11yLabel: string;
    cssClass: string;
    id: string | number;
    label: string;

    onClick({event, sourceEvent,}: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }): any {
    }




}
 

