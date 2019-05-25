import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {TermsComponent} from '../terms/terms.component';
import {UserService} from '../../core/services/user.service';
import {Usuario} from '../../shared/models/usario.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  agreement = false;
  disableBasicInfoBtn = true;
  disableAddressBtn = true;
  state: number;
  address: FormGroup;
  basicInfo: FormGroup;
  title = 'Registro';

  constructor(public dialog: MatDialog,
              private router: Router,
              private _userService: UserService) {
    this.basicInfo = new FormGroup({
      'nombres': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'apellido1': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'apellido2': new FormControl(
        '',
        Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
          '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
      ),
      'telefono': new FormControl(
        '',
        [
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.required
        ]
      ),
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'contrasena': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ),
      'verificarContrasena': new FormControl()
    });
    this.address = new FormGroup({
      'calle': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[.a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'numeroExterior': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*')
        ]
      ),
      'numeroInterior': new FormControl(
        '',
        Validators.pattern('[a-zA-Z0-9]*')
      ),
      'colonia': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'codigoPostal': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(5)
        ]
      )
    });
    // Verificación de contraseña.
    this.basicInfo.controls['verificarContrasena'].setValidators([
      Validators.required,
      this.notEqual.bind(this.basicInfo)
    ]);
    // Habilita el botón cuando el formulario de dirección es válido.
    this.address.valueChanges.subscribe(
      () => {
        this.disableAddressBtn = !this.address.valid;
      }
    );
    // Habilita el botón cuando el formulario de información básica es válido.
    this.basicInfo.valueChanges.subscribe(
      () => {
        this.disableBasicInfoBtn = !this.basicInfo.valid;
      }
    );
  }

  ngOnInit(): void {
    this.state = State.initial;
  }

  notEqual(control: FormControl): { [str: string]: boolean } {
    const form: any = this; // Cambio de contexto.
    if (control.value !== form.controls['contrasena'].value) {
      return {
        notEqual: true
      };
    }
    return null;
  }

  signUp(): void {
    this.state = State.loading;
    const usuario: Usuario = {
      nombreCompleto: {
        nombres: this.basicInfo.controls['nombres'].value,
        apellido1: this.basicInfo.controls['apellido1'].value,
        apellido2: this.basicInfo.controls['apellido2'].value
      },
      direccion: this.address.value,
      email: this.basicInfo.controls['email'].value,
      telefono: this.basicInfo.controls['telefono'].value,
      contrasena: this.basicInfo.controls['contrasena'].value,
      tema: null
    };
    this._userService.registerUser(usuario).subscribe(
      () => {
        this.state = State.success;
        setTimeout(
          () => {
            this.state = State.success;
            this.router.navigate(['/inicio-de-sesion']);
          },
          5000
        );
      },
      error => {
        this.state = State.error;
        console.error(error);
        setTimeout(
          () => {
            this.state = State.initial;
          },
          5000
        );
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.agreement = result;
    });
  }
}

enum State {
  initial,
  loading,
  success,
  error
}
