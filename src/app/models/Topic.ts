import {TopicDet} from "./TopicDet";
import {TopicLiker} from "./TopicLiker";

export class Topic {
    id: number;
    topicDesc: string;
    typeId: number;
    userId: number;
    status: number;
    createdBy: string;
    date: number;
    typeStr: string;
    det: Array<TopicDet>;
    likersMaps: Array<TopicLiker>;
    comment_t: string;
    getStatusStr() {
        if (this.status) {
            return this.status == 0 ? 'GENERIC.status.active' : 'GENERIC.status.inActive';
        }

    }
}
 

