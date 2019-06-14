import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../../../shared/enums/request-state.enum';

@Component({
  selector: 'app-date-report',
  templateUrl: './date-report.component.html',
  styleUrls: []
})
export class DateReportComponent implements OnInit {

  title = 'Reporte por fecha';

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Vehículos vendidos' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: [{}]
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  form: FormGroup;
  reportState: RequestState;

  constructor() {
    this.form = new FormGroup({
      'year': new FormControl(
        {value: '', disabled: this.reportState === RequestState.loading}
      ),
      'month': new FormControl(
        {value: '', disabled: this.reportState === RequestState.loading}
      ),
      'day': new FormControl({value: '', disabled: this.reportState === RequestState.loading},
        [
          Validators.pattern('([3][01])?([21][0-9])?[1-9]?')
        ]
      )
    });
  }

  ngOnInit() {
  }

}
