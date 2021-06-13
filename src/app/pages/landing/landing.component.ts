import { Component } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericFormValidators} from "app-common";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public settings: Settings;
  public form: FormGroup;
  public projects =[]  ;
  constructor(public appSettings:AppSettings , public fb: FormBuilder) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required, GenericFormValidators.StartWithSpaceValidator])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      userName: [null, Validators.compose([Validators.required, Validators.minLength(5), GenericFormValidators.WithOutSpaceValidator])],
      phoneNumber: [null, Validators.compose([Validators.required, GenericFormValidators.KsaPhoneValidator])],
      // formArray: this.fb.array([]),
    });
  }

  ngOnInit(){
    this.settings.rtl = false;
    this.projects = [
      { image: 'assets/img/projects/1.jpg', name: 'Project Name 1', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 10 },
      { image: 'assets/img/projects/2.jpg', name: 'Project Name 2', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 28 },
      { image: 'assets/img/projects/3.jpg', name: 'Project Name 3', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 15 },
      { image: 'assets/img/projects/4.jpg', name: 'Project Name 4', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 43 },
      { image: 'assets/img/projects/4.jpg', name: 'Project Name 4', desc: "Some quick example text to build on the card title and make up the bulk of the card's content.", followers: 43 }

    ]
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }

  public scrollToDemos(){
    setTimeout(() => { window.scrollTo(0,520) });
  }

  public changeLayout(menu, menuType, isRtl){
    this.settings.menu = menu;
    this.settings.menuType = menuType;
    this.settings.rtl = isRtl;
    this.settings.theme = 'indigo-light';
  }

  public changeTheme(theme){
    this.settings.theme = theme;       
  }

}
