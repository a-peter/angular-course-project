import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        // console.log('DropDown clicked', event);
        // console.log(this.elementRef);
        // console.dir(this.elementRef.nativeElement);
        // console.log(this.elementRef.nativeElement.classList);

        // This code, to close the DropDown by clicking
        // the DropDown exactly
        // this.elementRef.nativeElement.classList.toggle('open');
        // this.isOpen = !this.isOpen;

        // This code, to close the DropDown on a click
        // anywhere on the page.
        console.log(this.elementRef.nativeElement);
        console.log(event.target);
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
}