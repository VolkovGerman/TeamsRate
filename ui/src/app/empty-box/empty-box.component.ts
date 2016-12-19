import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-box',
  templateUrl: './empty-box.component.html',
  styleUrls: ['./empty-box.component.less']
})
export class EmptyBoxComponent implements OnInit {
  @Input() onlyText: boolean;
  @Input() typeOfImage: string;
  @Input() text: string;

  constructor() {
    this.onlyText = this.onlyText || false;
    this.typeOfImage = this.typeOfImage || 'box';
    this.text = this.text || 'empty here';
  }

  ngOnInit() {
  }

}
