import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, formatCurrency} from '@angular/common';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ReportService} from '../../../../core/services/report.service';
import {ChartType, ChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-brand-report',
  templateUrl: './brand-report.component.html',
  styleUrls: []
})
export class BrandReportComponent implements OnInit {

  title = 'Reporte de marcas';
  reportState: RequestState;
  reportType: number;
  brandReport = [];
  totalOfEarnings: number;
  totalOfCars: number;

  public barChartOptionsForEarnedCommisions: ChartOptions = {
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
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          return data.labels[tooltipItems.index] + ': ' +
            formatCurrency(parseFloat(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].toString()),
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
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          return data.labels[tooltipItems.index] + ': ' +
            data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +
            (data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] === 1 ? ' auto' : ' autos');
        }
      }
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: []
    },
  ];

  constructor(private _reportService: ReportService) { }

  ngOnInit() {
    this.reportType = 1;
    this.reportState = RequestState.loading;
    this._reportService.getBrandReport().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.brandReport = response.ventasPorMarca;
              this.totalOfEarnings = response.totalGanancias;
              this.totalOfCars = response.totalAutos;
              for (let i = 0; i < this.brandReport.length; i++) {
                this.pieChartLabels.push(this.brandReport[i]._id);
                this.pieChartData.push(this.brandReport[i].autosVendidos);
                const rgbColor = 'rgba(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', 0.3)';
                this.pieChartColors[0].backgroundColor.push(rgbColor);
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

  changeReportType() {
    this.pieChartData = [];
    if (this.reportType === 1) {
      for (let i = 0; i < this.brandReport.length; i++) {
        this.pieChartData.push(this.brandReport[i].gananciasPorComision);
      }
      this.reportType = 2;
    } else {
      for (let i = 0; i < this.brandReport.length; i++) {
        this.pieChartData.push(this.brandReport[i].autosVendidos);
      }
      this.reportType = 1;
    }

  }
}
