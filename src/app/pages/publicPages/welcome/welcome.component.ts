import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {Router} from "@angular/router";
import {DropDownService} from "../../../services/commonServices/drop-down-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AkitaNgFormsManager} from "@datorama/akita-ng-forms-manager";
import {AuthService} from "../../../AuthModule/AuthService";
import {LocalSelectItem, UtilityController} from "../../../../../dist/app-common";


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

  ngOnInit(): void {

    this.isLoggedIn = this.authService.validateToken();
  }




}

