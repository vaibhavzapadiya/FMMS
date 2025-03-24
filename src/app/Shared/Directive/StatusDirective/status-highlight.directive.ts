import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class StatusHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  set appStatusHighlight(value: number) {

    const color = this.getButtonColor(value);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }



  private getButtonColor(index: number): string {
    const colors = [
      'rgba(255, 206, 86, 0.8)', // Blue for ID 1 (pending)
      'rgba(54, 162, 235, 0.8)', // Blue for ID 2 (assigned)
   
      'rgba(255, 99, 132, 0.8)'  // Red for ID 3 (rejected)
    ];

   
    if (index >= 1 && index <= 3) {
      return colors[index -1]; 
    } else {
      return 'transparent';
    }
  }

}
