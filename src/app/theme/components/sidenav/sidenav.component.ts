import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MenuService} from '../menu/menu.service';
import {UsersService} from 'src/app/services/usersServices/users.service';
import {AuthUser} from '../../../AuthModule/AuthUser';
import {AuthService} from "../../../AuthModule/AuthService";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidenavComponent implements OnInit {
  public userImage= '../assets/img/users/user.jpg';
  public menuItems:Array<any>=[];
  public menu:Array<any>;
  public settings: Settings;
  imageBlobUrl:any;
  authUser: AuthUser;
  constructor(public appSettings:AppSettings, public menuService:MenuService,public authService:AuthService,public userService:UsersService){
      this.settings = this.appSettings.settings;
     this.authUser= authService.currentUserValue;



  }

  ngOnInit() {
     //todo menu as per perm
    this.menuItems=
        this.menuService.getVerticalMenuItems();
    // for (let i = 0; i < 10; i++) {
       
    //   this.menuItems.push(this.menu[i])
    // }


/*    this.userService.getUserPhoto(this.authUser.id).subscribe((data: UserPhotoDTORecv)=>  {
      // get base 64 from java
      this.imageBlobUrl=data.userPhotoBase64;

    }) ;*/
  }

  public closeSubMenus(){
    let menu = document.getElementById("vertical-menu");
    if(menu){
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if(child){
          if(child.children[0].classList.contains('expanded')){
              child.children[0].classList.remove('expanded');
              child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

}
