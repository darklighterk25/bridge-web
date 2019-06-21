import { Component, OnInit } from '@angular/core';
import {RequestState} from '../../../../shared/enums/request-state.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProviderService} from '../../../../core/services/provider.service';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: []
})
export class NewProviderComponent implements OnInit {

  title = 'Nuevo proveedor';
  newState: RequestState;
  form: FormGroup;

  constructor(private _router: Router, private _providerService: ProviderService) {
    this.form = new FormGroup({
      'name': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'cost': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
      'deliverDays': new FormControl({value: '', disabled: this.newState === RequestState.loading},
        [
          Validators.pattern('[0-9]*')
        ]
      )
    });
  }

  ngOnInit() {
    this.newState = RequestState.initial;
  }

  new() {
    this.newState = RequestState.loading;
    const data = {
      nombre: this.form.get('name').value,
      costo: this.form.get('cost').value,
      diasDeEntrega: this.form.get('deliverDays').value
    };
    this._providerService.newProvider(data).subscribe(
      response => {
        setTimeout(
          () => {
            console.log(response);
            if (response.ok) {
              this.newState = RequestState.success;
            } else {
              this.newState = RequestState.error;
            }
          },
          2000
        );
      },
      error => {
        setTimeout(
          () => {
            this.newState = RequestState.error;
          },
          2000
        );
      });
  }

  returnToConfiguration() {
    this._router.navigate(['/administracion/proveedores']);
  }
}
