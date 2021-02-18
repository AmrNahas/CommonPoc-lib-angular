import {Directive, ElementRef, HostListener, Injector, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
// import { ISubscription } from 'rxjs/Subscription';
import {AbstractControl, NgControl} from '@angular/forms';

@Directive({
    selector: '[testMask]'
})
export class TestDirective {




    constructor(private el: ElementRef,public renderer:Renderer2) {
        console.log(el.nativeElement)
        el.nativeElement.style.color="blue";
        let ele = this.el.nativeElement[1];
        console.log(ele);
/*         ele.removeClass('mat-input-element');
        let regex = /^b\d$/;*/
    // .split(' ').removeClass('mat-input-element');
/*        let classes = ele.getAttribute('class')
        console.log("classes list >> "+ classes )*/
    }

    ngAfterViewInit() {

      /*  let el = this.el.nativeElement;
        let regex = /^b\d$/;
        let classes = el.getAttribute('class').split(' ');   // get all classes
        classes.forEach((cl) => {
                this.renderer.removeClass(el, cl);

        });*/

      //  this.renderer.addClass(el, 'mat-input-element');
/*        console.log(el);*/
    }


    addClass(className: string, element: any) {
        this.renderer.addClass(element, className);
        // or use the host element directly
        // this.renderer.addClass(this.elementRef.nativeElement, className);
    }

    removeClass(className: string, element: any) {
        this.renderer.removeClass(element, className);
    }


}
