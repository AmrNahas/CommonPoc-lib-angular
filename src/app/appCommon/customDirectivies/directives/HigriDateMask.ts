import {Directive, ElementRef, HostListener, Injector, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
// import { ISubscription } from 'rxjs/Subscription';
import {AbstractControl, NgControl} from '@angular/forms';

@Directive({
    selector: '[higriMask]'
})
export class HigriDateMask implements OnInit, OnDestroy{

    private _higriControl:AbstractControl;
    private _preValue:string;

    @Input()
    set phoneControl(control:AbstractControl){
        this._higriControl = control;
    }
    @Input()
    set preValue(value:string){
        this._preValue = value;
    }



    constructor(private el: ElementRef,private renderer:Renderer2) {}

    ngOnInit(){
        this.higriDateValidate();
    }

    ngOnDestroy() {
        // this._higriControl.valueChanges.unsubscribe();
    }

    higriDateValidate(){

        this._higriControl.valueChanges.subscribe(data => {

            /**the most of code from @Günter Zöchbauer's answer.*/

            /**we remove from input but:
             @preInputValue still keep the previous value because of not setting.
             */
            let preInputValue:string = this._preValue;
            var lastChar:string = preInputValue.substr(preInputValue.length - 1);
            // remove all mask characters (keep only numeric)
            var newVal = data.replace(/\D/g, '');

            let start = this.renderer.selectRootElement('#higriDate').selectionStart;
            let end = this.renderer.selectRootElement('#higriDate').selectionEnd;


            //when removed value from input
            if (data.length < preInputValue.length) {
                // this.message = 'Removing...'; //Just console
                /**while removing if we encounter ) character,
                 then remove the last digit too.*/
                if(preInputValue.length < start){
                    if(lastChar == ')'){
                        newVal = newVal.substr(0,newVal.length-1);
                    }
                }
                //if no number then flush
                if (newVal.length == 0) {
                    newVal = '';
                }
                else if (newVal.length <= 3) {
                    /**when removing, we change pattern match.
                     "otherwise deleting of non-numeric characters is not recognized"*/
                    newVal = newVal.replace(/^(\d{0,3})/, '($1');
                } else if (newVal.length <= 6) {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                } else {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                }

                this._higriControl.setValue(newVal,{emitEvent: false});
                //keep cursor the normal position after setting the input above.
                this.renderer.selectRootElement('#higriDate').setSelectionRange(start,end);
                //when typed value in input
            } else{
                // this.message = 'Typing...'; //Just console
                var removedD = data.charAt(start);
                // don't show braces for empty value
                if (newVal.length == 0) {
                    newVal = '';
                }
                // don't show braces for empty groups at the end
                else if (newVal.length <= 3) {
                    newVal = newVal.replace(/^(\d{0,3})/, '($1)');
                } else if (newVal.length <= 6) {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
                } else {
                    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
                }
                //check typing whether in middle or not
                //in the following case, you are typing in the middle
                if(preInputValue.length >= start){
                    //change cursor according to special chars.
                    // console.log(start+removedD);
                    if(removedD == '('){
                        start = start +1;
                        end = end +1;
                    }
                    if(removedD == ')'){
                        start = start +2; // +2 so there is also space char after ')'.
                        end = end +2;
                    }
                    if(removedD == '-'){
                        start = start +1;
                        end = end +1;
                    }
                    if(removedD == " "){
                        start = start +1;
                        end = end +1;
                    }
                    this._higriControl.setValue(newVal,{emitEvent: false});
                    this.renderer.selectRootElement('#higriDate').setSelectionRange(start,end);
                } else{
                    this._higriControl.setValue(newVal,{emitEvent: false});
                    this.renderer.selectRootElement('#higriDate').setSelectionRange(start+2,end+2); // +2 because of wanting standard typing
                }
            }
        });
    }

    /*    constructor(private el: ElementRef) {
            // Element.nativeElement.mask = "blue ";
            console.log(this.el)
             this.el.nativeElement.inputmask=({"mask": "(999) 999-9999"}) ;
        }
        @Input() mask: string;
        @HostListener('keyup') onMouseEnter() {
          // console.log(this.el.nativeElement.value)
    }*/


}
