import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../../AuthModule/AuthService";





@Directive({
    selector: '[hasPermission]'
})
export class HasPermDirective {

    @Input('hasPermission')
    permsCode: any;


    constructor(private el: ElementRef, private vcr: ViewContainerRef,
                private tpl: TemplateRef<any> ,public authService:AuthService) {
          }

    ngOnInit() {
        let perms  = this.authService.userPermissions();
        let length = perms.filter(item=> item==this.permsCode).length
        let hasPermission = length>0;
        this.vcr.clear();
        if (hasPermission) {
            this.vcr.createEmbeddedView(this.tpl);
        }

    }


}
