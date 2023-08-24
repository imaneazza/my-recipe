import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:"[placeholder-app]"
})
export class PlaceholderDirective {
  constructor(public viewContainerRef:ViewContainerRef) {

  }
}
