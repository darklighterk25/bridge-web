import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ReportService} from '../../../../core/services/report.service';
import {formatCurrency} from '@angular/common';

@Component({
  selector: 'app-date-report',
  templateUrl: './date-report.component.html',
  styleUrls: []
})
export class DateReportComponent implements OnInit {

  title = 'Reporte por fecha';

  reportState: RequestState;
  dateReport = [];
  reportType: number;
  emptyReport: boolean;

  public barChartOptionsForEarnedCommisions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return formatCurrency(parseFloat(value.toString()),
              'es',
              '$',
              'MXN',
              '.2-2');
          }
        }
      }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value) {
          return formatCurrency(parseFloat(value.toString()),
            'es',
            '$',
            'MXN',
            '.2-2');
        },
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          return formatCurrency(parseFloat(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].toString()),
              'es',
              '$',
              'MXN',
              '.2-2');
        }
      }
    }
  };
  public barChartOptionsForSoldCars: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +
            (data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] === 1 ? ' auto' : ' autos');
        }
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total de autos vendidos' }
  ];
  form: FormGroup;

  constructor(private _reportService: ReportService) {
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

  getReport() {
    this.reportType = 1;
    this.reportState = RequestState.loading;
    this._reportService.getDateReport(
      this.form.get('day').value !== '' ? parseInt(this.form.get('day').value) : null,
      this.form.get('month').value !== '' ? parseInt(this.form.get('month').value) : null,
      this.form.get('year').value !== '' ? parseInt(this.form.get('year').value) : null).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.dateReport = response.ventasPorFecha;
              if (this.dateReport.length === 0) {
                this.emptyReport = true;
              } else {
                this.emptyReport = false;
                const data = [];
                this.barChartLabels = [];
                for (let i = 0; i < this.dateReport.length; i++) {
                  this.barChartLabels.push(this.dateFormat(this.dateReport[i]._id.dia, this.dateReport[i]._id.mes, this.dateReport[i]._id.anio));
                  data.push(this.dateReport[i].autosVendidos);
                }
                this.barChartData[0].data = [];
                this.barChartData[0].label = 'Total de autos vendidos';
                this.barChartData[0].data = data;
              }
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

  dateFormat(day: number, month: number, year: number) {
    let date = day !== undefined ? day + '' : '';
    if (date !== '' && (month !== undefined || year !== undefined)) {
      date += '/';
    }
    switch (month) {
      case 1: date += 'Enero';
        break;
      case 2: date += 'Febrero';
        break;
      case 3: date += 'Marzo';
        break;
      case 4: date += 'Abril';
        break;
      case 5: date += 'Mayo';
        break;
      case 6: date += 'Junio';
        break;
      case 7: date += 'Julio';
        break;
      case 8: date += 'Agosto';
        break;
      case 9: date += 'Septiembre';
        break;
      case 10: date += 'Octubre';
        break;
      case 11: date += 'Noviembre';
        break;
      case 12: date += 'Diciembre';
        break;
      default: date += '';
    }
    if (month !== undefined && year !== undefined) {
      date += '/';
    }
    date += year !== undefined ? year + '' : '';
    return date;
  }

  changeReportType() {
    this.barChartData[0].data = [];
    const data = [];
    if (this.reportType === 1) {
      for (let i = 0; i < this.dateReport.length; i++) {
        data.push(this.dateReport[i].gananciasPorComision);
      }
      this.barChartData[0].label = 'Total de comisiones obtenidas';
      this.reportType = 2;
    } else {
      for (let i = 0; i < this.dateReport.length; i++) {
        data.push(this.dateReport[i].autosVendidos);
      }
      this.barChartData[0].label = 'Total de autos vendidos';
      this.reportType = 1;
    }
    this.barChartData[0].data = data;
  }
}
