import {Injectable} from '@angular/core';
import {CardRegExp} from '../../shared/enums/card-reg-exp.enum';
import {CardType} from '../../shared/enums/card-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {
  }

  // Recibe el número de la tarjeta y retorna el tipo de esta.
  getCardType(cardNumber: string): number {
    if (cardNumber.match(CardRegExp.AmericanExpress)) {
      return CardType.AmericanExpress;
    }
    if (cardNumber.match(CardRegExp.DinersClub)) {
      return CardType.DinersClub;
    }
    if (cardNumber.match(CardRegExp.Discover)) {
      return CardType.Discover;
    }
    if (cardNumber.match(CardRegExp.JCB)) {
      return CardType.JCB;
    }
    if (cardNumber.match(CardRegExp.MasterCard)) {
      return CardType.MasterCard;
    }
    if (cardNumber.match(CardRegExp.Visa)) {
      return CardType.Visa;
    }
    return CardType.None;
  }

  // Separa el array de la fecha de expiración en mes y año.
  getExpiration(expiration: string): string[] {
    const EXPIRATION = expiration.split('/', 2);
    if (EXPIRATION[1].length === 4) {
      EXPIRATION[1] = EXPIRATION[1].substring(2, 4);
    }
    return EXPIRATION;
  }
}
