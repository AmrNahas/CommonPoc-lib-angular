import {Inject, Injectable, Injector, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {FilterProperty} from '../models/dto/FilterProperty';
import {FilterCriteria} from '../models/dto/FilterCriteria';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {MatTableDataSource} from '@angular/material/table';


import {SqSort} from '../cofigurations/SqSort';
import {ResponseDataModel} from '../models/dto/ResponseDataModel';
import {MessagesService} from '../utility/MessagesService';
import {UtilityController} from './UtilityController';
import {Observable, Subscription} from 'rxjs';
import {AbstractDataModelService} from '../services/AbstractDataModelService';
import {InputDataModel} from '../models/dto/InputDataModel';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SortCriteria} from '../models/dto/SortCriteria';
import {AkitaNgFormsManager} from '@datorama/akita-ng-forms-manager';
import {ColumnTypEnum} from "../models/enum/ColumnTypEnum";
import {HijriFormatFromNgStructPipe} from "../hijri-gregorian-datepicker/HijriFormatFromNgStructPipe";



@Injectable({
    providedIn: 'root'
})
export abstract class AbstractDataModelController<T> extends UtilityController implements OnDestroy {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; //  for pagination
    @ViewChild(MatSort, {static: true}) sort: MatSort;   //  for sort
    @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>; //  for scroller
    // used for filter form only
    filterPropertiesArr = Array<FilterProperty>();
    sortCriteriaArr = Array<SortCriteria>();
    permanentSortCriteria: SortCriteria;
    // used for filters values from   form
    private filtersCriteriaArr = Array<FilterCriteria>();
    permanentFiltersObjValues: Array<FilterCriteria>;

    public dataSource: MatTableDataSource<T>;
    public pageIndex: number;
    public pageSize: number;
    public length: number;
    public displayedColumns = [];
    public offset: number;
    public limit: number;
    public filterComponentForm: FormGroup;
    storage = localStorage; //  to get local storage and use any where
    dataSourceSub: Subscription;
    public loadDataFlag: boolean;

    public fb: FormBuilder;
    public ;
    public msgsService: MessagesService;
    public myService: AbstractDataModelService<T>;
    protected formsManager: AkitaNgFormsManager<any>


    protected constructor( public service: AbstractDataModelService<T>,AppInjector: Injector) {

        super();
        // prepare the needed objects by using   AppInjector >> define in App Module
        this.fb = AppInjector.get<FormBuilder>(FormBuilder);
        this.msgsService = AppInjector.get<MessagesService>(MessagesService);
        this.formsManager = AppInjector.get<AkitaNgFormsManager>(AkitaNgFormsManager);
        // this.myService=AppInjector.get<AbstractDataModelService<T>(token)> ;

        this.pageIndex = 0;
        this.pageSize = 10;
        this.permanentFiltersObjValues = new Array<FilterCriteria>();
        // this.settings = this.appSettings.settings;
        this.displayedColumns = this.prepareDisplayColumns();
        this.permanentSortCriteria = this.addPermanentSortColumn();
        // prepare search columns
        this.prepareFiltersColumns();
        this.addPermanentFilterColumns();
        this.preparePermanentFilters();// todo   delete >>  no need after last modifing
        this.prepareFiltersFormGroup(this.filterPropertiesArr);

    }

    public afterLoadData() {

    }

    // to prepare the columns appears in table UI
    abstract prepareDisplayColumns(): Array<string> ;

    // to prepare the  filters   properties for   appears in table UI   >>>  used to initialize  : this.filterSelectObj
    abstract prepareFiltersColumns();  //: Array<FilterProperty>;

    // to prepare the custom Permanent  filters   properties and not appeared on Table  UI to apply this filters every time load the data >>>  used to initialize  : this.permanentFiltersObjValues
    abstract addPermanentFilterColumns();//:Array<FilterCriteria>;
    // to prepare the custom Permanent  sort object  >>  return sort criteria obj
    abstract addPermanentSortColumn(): SortCriteria;

    // to View the Data based  in your custom implementation
    abstract viewData() ;

    // to Edit the Data based  in your custom implementation
    abstract editData();

    /*   optional to override   as per your Implementation
         parent Implementation of load data , if you did not override it , data will be loaded as per  instructions in method >>loadSortedFilteredDataAndShowData()
      */
    public loadDataAndPublish() {

        this.prepareAllFilterCriteria();
        this.loadSortedFilteredDataAndShowData();

    }


    // return  Observable object of ResponseDataModel only
    public getObservableResponseDataModelArr(): Observable<ResponseDataModel<T>> {
        this.dataSource = null;
        let offset = this.pageIndex * this.pageSize;
        let limit = this.pageSize;
        let inputDataModel = new InputDataModel(this.filtersCriteriaArr, limit, offset, this.permanentSortCriteria);
        return this.service.loadData(inputDataModel);
    }


    // load data , subscribed and  set all required members then return  Observable Array object of ResponseDataModel
    public loadSortedFilteredDataAndShowData(): Observable<ResponseDataModel<T>> {
        this.loadDataFlag = true;
        this.dataSource = null;
        let offset = this.pageIndex * this.pageSize;
        let limit = this.pageSize;
        let inputDataModel = new InputDataModel(this.filtersCriteriaArr, limit, offset, this.permanentSortCriteria);
        let response = this.service.loadData(inputDataModel);
        this.dataSourceSub = response.subscribe((response: ResponseDataModel<T>) => {
                this.prepareDateAndPaginationValues(response);
                console.log(response)
                this.loadDataFlag = false;
                document.getElementById('main-content').scrollTop = 0;
                this.afterLoadData();
            },
            error => {
                console.log("erorrrrrrr")
                console.log(error);
                document.getElementById('main-content').scrollTop = 0;

            }
        );

        return response;
    }


    // Reset table filters
    public resetFilters() {
        // let loadAfterReset = this.filtersCriteriaArr.length > this.permanentFiltersObjValues.length;
        // reset all form controller values
        this.filterPropertiesArr.forEach((filterProperty) => {
            this.filterComponentForm.controls[filterProperty.columnProp].setValue(null);
        });

        this.filtersCriteriaArr = [];
        this.preparePermanentFilters();
        this.loadDataAndPublish();
        //  loadAfterReset ? this.loadSortedFilteredDataAndShowData() : '';
    }


    // to check data entered for search and its column type
    private static checkFilterValuesTyp(type, value): boolean {
        let valid = true;
        if (type == 'num') {
            if (isNaN(value)) {
                valid = false;
            }
        }
        return valid;
    }

    public preparePermanentFilters() {
        // to push custom permanent filters
        if (this.permanentFiltersObjValues) {
            this.permanentFiltersObjValues.forEach(item => {
                this.filtersCriteriaArr.push(new FilterCriteria(item.propertyName, item.propertyValue, item.operation));
            });
        }
    }


    //  you can handel it from server side  by load data and send the sort values as parameter
    public sortColumn($event: SqSort) {
        // todo   complete the sort server side
        /*   console.log(`sort event ${JSON.stringify($event)}`);
           console.log($event.direction);*/
        this.sortCriteriaArr = [];
        this.sortCriteriaArr.push(new SortCriteria($event.active, $event.direction));
    }


    // handel  pagination values limit and offset in change page or limit  >> must call it inside subscription of data if you handel the data by yourself
    public prepareDateAndPaginationValues(dataModel: ResponseDataModel<T>) {
        this.dataSource = new MatTableDataSource<T>(dataModel.content);
        this.length = dataModel.numberOfRecords;
        this.dataSource.sort = this.sort;

    }


    // to handel the pagination event    >> take pagination Event
    public paginationHandel(event?: PageEvent) {
        console.warn("pagination " + event.pageSize);
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadDataAndPublish();
        this.scrollToTop(); // to scroll to top page
    }


    // this method used to prepare filters form for filter property array that entered based on user need
    public prepareFiltersFormGroup(filterPropertiesArr: Array<FilterProperty>) {
        let group = {};
        filterPropertiesArr.forEach((fileProperty) => {
            let formControl = new FormControl();
            let initValue = null;
            if (fileProperty.inputValidators) {
                formControl.setValidators(fileProperty.inputValidators);
            } else {
                formControl.setValidators([]);
            }
            formControl.setValue(initValue);
            group[fileProperty.columnProp] = formControl;

        });

        this.filterComponentForm = this.fb.group(group);
    }

    public search() {

        if (this.prepareAllFilterCriteria()) {
            this.pageIndex = 0;
            this.loadDataAndPublish();
            // let reloadData = this.filtersCriteriaArr.length > this.permanentFiltersObjValues.length;
        } else {
            this.msgsService.showErrorMessageLocal('GENERIC.filter.criteria.input.typ.err');
        }

    }


    public scrollToTop() {
        /*     this.pss.forEach(ps => {
                 if (ps.elementRef.nativeElement.id == 'main' || ps.elementRef.nativeElement.id == 'main-content') {
                     ps.scrollToTop(0, 250);
                 }
             });*/
    }

// prepare all filters and search criteria
    prepareAllFilterCriteria(): boolean {
        this.filtersCriteriaArr = [];
        this.preparePermanentFilters();

        if (this.filterComponentForm.valid) {
            this.filterPropertiesArr.forEach((filterProperty) => {
                let propertyValue = this.filterComponentForm.controls[filterProperty.columnProp].value;

                // && filterProperty.operation == FilterOperationEnum.DAY_EQUAL
                if (propertyValue instanceof Date && filterProperty.columnType == ColumnTypEnum.DATE_GEO) {
                    // propertyValue = new DatePipe('en').transform(propertyValue, 'dd/MM/y');
                    propertyValue = propertyValue.getTime();
                }

                                if ( filterProperty.columnType == ColumnTypEnum.DATE_Hij) {
                                    propertyValue =  new HijriFormatFromNgStructPipe().transform(propertyValue);
                                }

                if (filterProperty.columnType == ColumnTypEnum.DROPDOWN_MULTI && propertyValue != null) {
                    let values: [] = propertyValue;
                    if (values.length == 0)
                        propertyValue = null;
                }

                this.filtersCriteriaArr.push(new FilterCriteria(filterProperty.columnProp, propertyValue, filterProperty.operation));
            });
        } else {
            return false;
        }
        return true;
    }

    clearValue(probName: string) {
        this.filterComponentForm.controls[probName].setValue(null);

    }


    ngOnDestroy(): void {
        console.log('destroyeeeed');
        if (this.dataSourceSub)
            this.dataSourceSub.unsubscribe();
    }


}


