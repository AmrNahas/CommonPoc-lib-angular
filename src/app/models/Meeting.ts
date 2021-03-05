import {TopicDet} from "./TopicDet";
import {MeetingAgenda} from "./MeetingAgenda";

export class Meeting {
    id: number;
    title: string;
    description: string;
    userId: number;
    status: number;
    createdBy: string;
    date: number;
    date_d: Date;
    time:number;
    place: string;
    typeStr: string;
    meetingAgenda: Array<MeetingAgenda>;
    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }

    }
}
 

