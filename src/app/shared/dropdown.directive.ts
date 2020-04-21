import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    
    constructor(private elementRef: ElementRef) {}

    @HostListener('click') onClick(eventData: Event) {
        console.log('DropDown clicked', eventData);
        console.log(this.elementRef);
        console.dir(this.elementRef.nativeElement);
        console.log(this.elementRef.nativeElement.classList);
        this.elementRef.nativeElement.classList.toggle('open');
    }
}