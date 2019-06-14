import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ReportService} from '../../../../core/services/report.service';
import {ChartType, ChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-brand-report',
  templateUrl: './brand-report.component.html',
  styleUrls: []
})
export class BrandReportComponent implements OnInit {

  title = 'Reporte de marcas';
  reportState: RequestState;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private _reportService: ReportService) { }

  ngOnInit() {
    this.reportState = RequestState.loading;
    this._reportService.getBrandReport().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.reportState = RequestState.success;
            } else {
              console.log('error');
              this.reportState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.reportState = RequestState.error;
          },
          2000
        );
      });
  }

}
