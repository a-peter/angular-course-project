import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elementRef: ElementRef) {}

    @HostListener('click') toggleOpen() {
        // console.log('DropDown clicked', eventData);
        // console.log(this.elementRef);
        // console.dir(this.elementRef.nativeElement);
        // console.log(this.elementRef.nativeElement.classList);
        // this.elementRef.nativeElement.classList.toggle('open');
        this.isOpen = !this.isOpen;
    }
}