import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit {

  title = 'Preguntas frecuentes';

  faq = [
    {
      pregunta: '¿Existe un limite de vehículos para ponerse a la venta por usuario?',
      respuesta: 'No existe limite de vehículos, pero es importante a resaltar que por cada vahículo que se venda el sitio recibirá una comisión por haberlo promocionado.'
    },
    {
      pregunta: '¿Es necesario comprar y vender vehículos cuando me registro?',
      respuesta: 'No, cuando te vuelves un usuario del sitio puedes, tanto comprar como vender vehículos, pero no estas obligado a realizar ambas.'
    },
    {
      pregunta: '¿Existe un limite de tiempo para una publicación de una venta?',
      respuesta: 'No, una vez que se realiza una publicación esta persiste hasata que se lleva a cabo la compra del vehículo o el vendedor la desactiva.'
    },
    {
      pregunta: '¿Hay un precio máximo para poner a la venta un vehículo?',
      respuesta: 'Como tal no existe dicho limite, se deja a la libertad del vendedor el precio al cual quiera dar a la venta su vehículo, pero es importante que evalúe bien dicho precio, pues es claro que un precio exagerado no parecera atractivo para los interesados en el vehículo.'
    },
    {
      pregunta: '¿Existe otra opción de envío del vehículo que no sea por parte de los proveedores del sitio web?',
      respuesta: 'Si hay otra opción, la cual es, una vez realizada la compra, llegar a un acuerdo con el vendedor para poder determinar un punto de entrega del vehículo. En dicho caso, el sitio web se deslinda de cualquier situación relacionada con la entrega del vehículo.'
    },
    {
      pregunta: '¿Una vez hecha la compra de un vehículo cuanto tiempo tengo que esperar para su entrega?',
      respuesta: 'Si se eligió la opción para entregar el vehículo por parte de los proveedores del sitio, cada uno de ellos tiene presupuestada cierta cantidad de días hábiles para la entrega (entre más rápida sea la entrega mayor será el costo), pero si se eligió acordar la entrega con el vendedor entonces el tiempo si puede variar demasiado dependiendo del acuerdo al que se llegue'
    }
  ];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
