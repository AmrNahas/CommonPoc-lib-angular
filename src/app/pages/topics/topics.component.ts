import {Component, OnInit} from "@angular/core";
import {AppSettings} from "../../app.settings";
import {AuthService} from "../../AuthModule/AuthService";
import {Settings} from "../../app.settings.model";
import {SortCriteria} from "../../appCommon/models/dto/SortCriteria";
import {SortDirection} from "@swimlane/ngx-datatable";
import {LocalSelectItem} from "../../appCommon/models/dto/LocalSelectItem";
import {Observable} from "rxjs";
import {MessagesService} from "../../appCommon/utility/MessagesService";
import {MatDialog} from "@angular/material/dialog";
import {AbstractDataModelContrlPublic} from "../publicPages/AbstractDataModelContrlPublic";
import {Topic} from "../../models/Topic";
import {TopicService} from "../../services/topicsServices/TopicService";
import {TopicDet} from "../../models/TopicDet";
import {TopicLiker} from "../../models/TopicLiker";

@Component({
    selector: 'topics-pages',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],

})

export class TopicsComponent extends AbstractDataModelContrlPublic<Topic> implements OnInit {
    imageBlobUrl: any;
    public settings: Settings;
    public projects = [];
    public dest: number;
    public num: number;
    public type: number;
    public isLoggedIn: boolean;
    public removeRegHint: boolean;
    public page: any;
    public sortByLessPrice: number = 1;
    public sortByHighRate: number = 2;
    public sortByLessHours: number = 3;
    public sortByValue: number;

    public desc: string;
    public typeId:number;
    public comment:string;

    constructor(public appSettings: AppSettings, public  service: TopicService,
                public dialog: MatDialog, public authService: AuthService, public msgService: MessagesService) {
        super(service);
        this.settings = this.appSettings.settings;
        this.isLoggedIn = authService.validateToken();
        this.sortByValue = 1;
        if (this.isLoggedIn)
            this.removeRegHint = true;


    }

    canPostTopic(): boolean {
        if (this.desc != null && this.desc.trim() != "" && this.typeId!=null)
            return true;
        else
            return false;
    }

    canPostComment(comment:string){
        if (comment != null && comment.trim() != "")
            return true;
        else
            return false;
    }


    addNewCommentToTopic( topic:Topic ) {
        if (this.canPostComment(topic.comment_t)) {
            let t: TopicDet = new TopicDet();
            t.comment = topic.comment_t;
            t.topicId=topic.id;

            this.service.saveComment(t).subscribe(data => {
                    this.msgService.showInfoMessageLocal("guider.post.success");
                   // this.loadSortedFilteredDataAndShowData();
                    t.createdBy=this.authService.currentUserValue.name ;
                    t.date=new Date().getTime();
                    topic.det.push(t);
                    topic.comment_t="";
                },
                error => {
                    this.msgService.showErrorMessageLocal('registration.submit.server.error');
                });
        } else
            this.msgService.showErrorMessageLocal("guide.post.input.err");
    }

    focusAction(id:any){
        alert(id);
    }
    addLikeToTopic( topic:Topic ) {
       if(this.isLikedBefore(topic))
           return;
            let t: TopicLiker = new TopicLiker();
            t.topicId=topic.id;
            t.userId=this.authService.currentUserValue.id;
            this.service.addLikeToTopic(t).subscribe(data => {
                    t.createdBy=this.authService.currentUserValue.name ;
                    t.date=new Date().getTime();
                    topic.likersMaps.push(t);
                 //   this.msgService.showInfoMessageLocal("guider.post.success");
                 //   this.loadSortedFilteredDataAndShowData();
                },
                error => {
                    this.msgService.showErrorMessageLocal('registration.submit.server.error');
                });
    }


    isLikedBefore(topic:Topic){
       if(this.isLoggedIn && this.authService.currentUserValue.id) {
           let counter: number = 0;
           topic.likersMaps.filter(item => {
               if (this.authService.currentUserValue.id == item.userId)
                   counter++;
           })
           return counter > 0;
       }
       else return false;
    }


    shareTopic() {
        if (this.canPostTopic()) {
            let t: Topic = new Topic();
            t.topicDesc = this.desc;
            t.typeId=this.typeId;
            this.service.saveObj(t).subscribe(data => {
                    this.msgService.showInfoMessageLocal("guider.post.success");
                    this.loadSortedFilteredDataAndShowData();
                    this.desc="";
                },
                error => {
                    this.msgService.showErrorMessageLocal('registration.submit.server.error');
                });
        } else
            this.msgService.showErrorMessageLocal("guide.post.input.err");
    }

    closeRegPanel() {
        this.removeRegHint = true;
    }


    sortBy(value: number) {
        this.sortCriteriaArr = [];
        if (value == this.sortByLessPrice) {
            this.permanentSortCriteria = new SortCriteria("pricePerHour", SortDirection.asc);
            this.sortByValue = this.sortByLessPrice;
        } else if (value == this.sortByHighRate) {
            this.permanentSortCriteria = new SortCriteria("rate", SortDirection.desc);
            this.sortByValue = this.sortByHighRate;
        } else if (value == this.sortByLessHours) {
            this.permanentSortCriteria = new SortCriteria("minHourForHire", SortDirection.asc);
            this.sortByValue = this.sortByLessHours;
        }

        this.loadSortedFilteredDataAndShowData();

    }


    prepareFiltersColumns() {
        /*        let cityFilterColumn = new FilterProperty('Home.search.destination', 'cityId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadCityList(), []);
                if (this.cityValue != null && (this.cityValue == 4))
                    cityFilterColumn.value = Number(this.cityValue);
                let personsNum = new FilterProperty('Home.search.persons.count', 'maxSeatsNum', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);
                personsNum.value = this.numOfPersons;
                let typeFilterColumn = new FilterProperty('sv.type', 'typeId', ColumnTypEnum.DROPDOWN, FilterOperationEnum.EQUAL, this.loadSvTypes(), []);
                if (this.typeValue != null && (this.typeValue == 1 || this.typeValue == 2 || this.typeValue == 3))
                    typeFilterColumn.value = Number(this.typeValue);
                let hoursNum = new FilterProperty('Home.search.hours.count', 'minHourForHire', ColumnTypEnum.TEXT, FilterOperationEnum.GREATER_THAN_EQUAL, null, []);



                this.filterPropertiesArr.push(cityFilterColumn);
                this.filterPropertiesArr.push(typeFilterColumn);
                this.filterPropertiesArr.push(personsNum);
                this.filterPropertiesArr.push(hoursNum);*/

    }


    public loadSvTypes(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllSvTypesList();
    }

    public loadCityList(): Observable<Array<LocalSelectItem>> {
        return this.dropDownServices.getAllCitiesForCountryDropDown(1);
    }


    ngOnInit() {
        console.warn("topics const")
        if (this.dest)
            this.filterComponentForm.controls.cityId.setValue(this.dest);
        if (this.num)
            this.filterComponentForm.controls.maxSeatsNum.setValue(this.num);
        if (this.type)
            this.filterComponentForm.controls.typeId.setValue(this.type);
        // this.permanentSortCriteria = new SortCriteria("pricePerHour", SortDirection.asc);
        this.loadDataAndPublish();
    }

    addPermanentFilterColumns() {
        //approved Only
        //  this.permanentFiltersObjValues.push(new FilterCriteria('status', 0, FilterOperationEnum.EQUAL));
    }

    addPermanentSortColumn(): SortCriteria {
        return new SortCriteria('id', SortDirection.asc);
    }

    editData() {
    }

    prepareDisplayColumns(): string[] {

        return [];
    }


    viewData() {
    }


}

