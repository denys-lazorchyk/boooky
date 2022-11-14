import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('.input-container') sticks!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.sticks);
  }
}
