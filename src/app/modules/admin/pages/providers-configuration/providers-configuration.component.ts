import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProviderService} from '../../../../core/services/provider.service';

@Component({
  selector: 'app-providers-configuration',
  templateUrl: './providers-configuration.component.html',
  styleUrls: []
})
export class ProvidersConfigurationComponent implements OnInit {

  title = 'Configuración de proveedores';
  providersState: RequestState;
  providers = [];
  form: FormGroup;
  updateState: RequestState;
  deleteState: RequestState;
  deleteProvider: boolean;

  constructor(private _router: Router, private _providerService: ProviderService) {
    this.form = new FormGroup({
      'providerIndex': new FormControl(
        {value: '', disabled: this.updateState === RequestState.loading || this.deleteState === RequestState.loading}
      ),
      'name': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'cost': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
      'deliverDays': new FormControl({value: '', disabled: this.updateState === RequestState.loading},
        [
          Validators.pattern('[0-9]*')
        ]
      )
    });
  }

  ngOnInit() {
    this.providersState = RequestState.initial;
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.deleteProvider = false;
    this.getProviders();
  }

  getProviders() {
    this.providersState = RequestState.loading;
    this._providerService.getProviders().subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.providers = response.proveedoresDeEnvio;
              this.providersState = RequestState.success;
            } else {
              console.log('error');
              this.providersState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.providersState = RequestState.error;
          },
          2000
        );
      });
  }

  reset() {
    this.updateState = RequestState.initial;
    this.deleteState = RequestState.initial;
    this.resetFields();
  }

  resetFields() {
    this.form.get('name').setValue('');
    this.form.get('name').markAsPristine();
    this.form.get('name').markAsUntouched();
    this.form.get('cost').setValue('');
    this.form.get('cost').markAsPristine();
    this.form.get('cost').markAsUntouched();
    this.form.get('deliverDays').setValue('');
    this.form.get('deliverDays').markAsPristine();
    this.form.get('deliverDays').markAsUntouched();
  }

  update() {
    this.updateState = RequestState.loading;
    const data = {
      nombre: this.form.get('name').value,
      costo: this.form.get('cost').value,
      diasDeEntrega: this.form.get('deliverDays').value
    };
    console.log(data);
    this._providerService.updateProvider(this.providers[this.form.get('providerIndex').value]._id, data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.providers[this.form.get('providerIndex').value].nombre = this.form.get('name').value;
              this.providers[this.form.get('providerIndex').value].costo = this.form.get('cost').value;
              this.providers[this.form.get('providerIndex').value].diasDeEntrega = this.form.get('deliverDays').value;
              console.log(this.providers[this.form.get('providerIndex').value]);
              this.resetFields();
              this.form.get('providerIndex').setValue('');
              this.updateState = RequestState.success;
            } else {
              this.updateState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.updateState = RequestState.error;
          },
          2000
        );
      });
  }

  delete() {
    this.deleteProvider = true;
  }

  new() {
    this._router.navigate(['/administracion/nuevo-proveedor']);
  }

  deleteConfirmation() {
    this.deleteState = RequestState.loading;
    this._providerService.deleteProvider(this.providers[this.form.get('providerIndex').value]._id).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.resetFields();
              this.providers.splice(parseInt(this.form.get('providerIndex').value), 1);
              this.form.get('providerIndex').setValue('');
              this.deleteState = RequestState.success;
              this.deleteProvider = false;
            } else {
              this.deleteState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.deleteState = RequestState.error;
          },
          2000
        );
      });
  }

  deleteCancelation() {
    this.deleteProvider = false;
  }
}
