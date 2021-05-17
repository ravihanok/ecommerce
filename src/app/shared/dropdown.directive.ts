import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
 selector:'[appDropdown]'
})
export class DropdownDirective implements OnInit
{
    @HostBinding('class.open') isOpen = false;
    @HostListener('mouseenter') toggleOpen(){
        this.isOpen = true;
    }
    @HostListener('mouseleave') toggleLeave(){
        this.isOpen = !this.isOpen;
    }
    constructor(){}
    ngOnInit(){

    }
}