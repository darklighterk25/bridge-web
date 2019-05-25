import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit {
  @Input() califiacion: number = null;

  constructor() {
  }

  ngOnInit() {
  }

}
