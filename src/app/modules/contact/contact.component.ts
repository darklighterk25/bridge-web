import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  title = 'Contacto';
  form: FormGroup;
  disableBasicInfoBtn = true;
  submited = false;
  loading = false;
  aspectos = [
    {
      contenido: 'Te podemos brindar información del sitio con respecto a algúna duda con la que cuentes.'
    },
    {
      contenido: 'Si tienes dificultades con el uso del sitio web o no sabes como hacer algúna acción te podemos brindar soporte al respecto.'
    },
    {
      contenido: 'Si eres vendedor o comprador y tuviste alguna anomalía en alguna compra realizada comunicanoslo, es nuestro deber ayudarte.'
    },
    {
      contenido: 'Notificanos si el sitio no te ha dado problemas, cualquier inconveniente o mal funcionamiento que hayas presenciado durante el uso del sitio haznolo saber y trabajaremos para mejorar tu experiencia en el sitio.'
    },
    {
      contenido: 'Si existe otra razón por la que desees comunicarte con nosotros también lo puedes hacer, intentaremos ayudarte con lo que necesites.'
    }
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('[.a-zA-ZñÑáéíóúÁÉÍÓÚ\'\\t\\n\\v\\f\\r ' +
            '\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*')
        ]
      ),
      'phone': new FormControl(
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
      'mensaje': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
    this.form.valueChanges.subscribe(
      () => {
        this.disableBasicInfoBtn = !this.form.valid;
      }
    );
  }

  submit(): void {
    this.loading = true;
    this.disableBasicInfoBtn =  true;
    this.http.post('https://bridge-back-end.herokuapp.com/contacto', this.form.value).subscribe(
      data => {
        console.log(data);
        this.submited = true;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
        this.disableBasicInfoBtn =  false;
      }
    );
  }
}
