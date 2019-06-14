import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {ReportService} from '../../../../core/services/report.service';

@Component({
  selector: 'app-brand-report',
  templateUrl: './brand-report.component.html',
  styleUrls: []
})
export class BrandReportComponent implements OnInit {

  title = 'Reporte de marcas';
  reportState: RequestState;

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
