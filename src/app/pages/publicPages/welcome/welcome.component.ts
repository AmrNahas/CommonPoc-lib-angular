import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {AuthService} from "../../../AuthModule/AuthService";
import {Router} from "@angular/router";
import {UtilityController} from "../../../appCommon/controllers/UtilityController";
import {LocalSelectItem} from "../../../appCommon/models/dto/LocalSelectItem";
import {Observable} from "rxjs";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AkitaNgFormsManager} from "@datorama/akita-ng-forms-manager";
import {GenericFormValidators} from "../../../appCommon/customFormValidators/GenericFormValidators";
import {MaxSizeValidator} from "@angular-material-components/file-input";
import {matchingPasswords} from "../../../theme/utils/app-validators";


@Component({
  selector: 'app-dashboard',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class welcomeComponent extends UtilityController implements OnInit {
  imageBlobUrl: any;
  public settings: Settings;
  public cities =[]  ;
  public activities =[]  ;
  public isLoggedIn:boolean;
  public dest: any;
  public num: any;
  public type: any;
  public citiesDropDown: LocalSelectItem[];
  public types: LocalSelectItem[];
  public form:FormGroup;

  constructor(public appSettings:AppSettings ,private authService:AuthService ,public router :Router,public dropDownServices:DropDownService,
              public formsManager: AkitaNgFormsManager<any>,public fb: FormBuilder){
    super();
    this.settings = this.appSettings.settings;
    this.isLoggedIn=authService.validateToken();
    this.form = this.fb.group({
      'dest': [null],
      'num':[null],
      'type': [null],
    } );

    this.formsManager.upsert('fSearch', this.form);
  }

    loadSvTypes()  {
    this.dropDownServices.getAllSvTypesList().subscribe(data=>{
      this.types=data;
    })
  }

    loadCityList()  {
      this.dropDownServices.getAllCitiesForCountryDropDown(1).subscribe(data=>{
      this.citiesDropDown=data;
    })
  }

  ngOnInit() {
    this.loadCityList();
    this.loadSvTypes();
    this.cities = [
            { image: 'assets/img/landing/jeddah.jpg', nameAr: 'جدة',nameEn: 'Jeddah',subtitleAr: 'سحر البحر الاحمر ',subtitleEn: 'The magic of the Red Sea', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 10 },
            { image: 'assets/img/landing/dammam.jpg' ,nameAr: 'الدمام',nameEn: 'Dammam',subtitleAr: 'ساحل بحرالخليج العربى ',subtitleEn: 'The coast of the Arabian Gulf', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },

    ]

    this.activities = [
      { image: 'assets/img/landing/boats/b1.jpg', nameAr: 'مركبات بحرية ',nameEn: 'Boats',subtitleAr: 'مراكب , قوارب و الموتوسكلات الشاطئية ',subtitleEn: 'Boats', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 10 },
      { image: 'assets/img/landing/snorkel.jpg' ,nameAr: 'رحلات بحرية',nameEn: 'Cruises ',subtitleAr: 'الرحلات بحرية و الغطس',subtitleEn: 'Cruises and Snorkeling', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },
      { image: 'assets/img/landing/diving.jpg' ,nameAr: 'دورات بحرية',nameEn: 'Marine Courses',subtitleAr: 'الدورات بحرية ودورات الغوص',subtitleEn: 'Marine Courses', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },

    ]
  }
  search() {
    this.dest=this.form.controls['dest'].value;
    this.num=this.form.controls['num'].value;
    this.type=this.form.controls['type'].value;
     this.router.navigate(['/search'], { queryParams: { dest: this.dest ,num: this.num ,type: this.type  } });
  }




}

